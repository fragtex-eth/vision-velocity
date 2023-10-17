package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
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
