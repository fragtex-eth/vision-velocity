package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func EditUserProfileHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		email, err := getUserEmailFromToken(c, client)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Error extracting user email",
			})
		}

		var updates User
		if err := c.BodyParser(&updates); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Error parsing user data",
			})
		}

		filter := bson.M{"email": email}
		update := bson.M{
			"$set": bson.M{
				"name":        updates.Name,
				"image":       updates.Image,
				"description": updates.Description,
				"links":       updates.Links,
			},
		}

		database := client.Database(dbName)
		collection := database.Collection(collectionUser)
		result, err := collection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error updating user data",
			})
		}

		if result.ModifiedCount == 0 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "No user data updated. Check if provided data is correct.",
			})
		}

		return c.JSON(fiber.Map{
			"message": "User data updated successfully",
		})
	}
}

func GetAllUsersHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		// Create a slice to hold all users fetched from the database
		var usersFromDB []User

		// Connect to the database
		database := client.Database(dbName)
		collection := database.Collection(collectionUser)

		// Find all users but exclude the Password and Email fields using a projection
		findOptions := options.Find().SetProjection(bson.M{
			"password": 0,
			"email":    0,
		})

		cur, err := collection.Find(context.TODO(), bson.M{}, findOptions)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching users from database",
			})
		}
		defer cur.Close(context.TODO())

		// Decode the cursor data into our slice of users
		if err := cur.All(context.TODO(), &usersFromDB); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error decoding user data",
			})
		}

		// Create the output in the desired format
		output := make(map[string]User)

		for _, user := range usersFromDB {
			// Convert the ObjectID to string
			userId := user.ID.Hex()
			output[userId] = user
		}

		return c.JSON(output)
	}
}
