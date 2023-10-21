package controllers

import (
	"context"
	"crypto/ecdsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"log"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func EditUserProfileHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var user User
		cookie := c.Cookies("jwt")

		// Extract and verify the JWT token
		block, _ := pem.Decode([]byte(SecretKey))
		if block == nil {
			log.Fatalf("Failed to decode PEM block containing private key")
		}
		privateKey, err := x509.ParseECPrivateKey(block.Bytes)
		if err != nil {
			log.Fatalf("Failed to parse ECDSA private key: %v", err)
		}
		publicKey := privateKey.Public().(*ecdsa.PublicKey)
		token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodECDSA); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return publicKey, nil
		})

		if err != nil {
			fmt.Println(err)
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(fiber.Map{
				"success": false,
				"message": "unauthenticated",
			})
		}

		claims, ok := token.Claims.(*jwt.StandardClaims)
		if !ok {
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(fiber.Map{
				"success": false,
				"message": "invalid token claims",
			})
		}

		userID, err := primitive.ObjectIDFromHex(claims.Issuer)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"success": false,
				"message": "invalid user ID in token",
			})
		}

		filter := bson.M{"_id": bson.M{"$eq": userID}}
		database := client.Database(dbName)
		collection := database.Collection(collectionUser)
		err = collection.FindOne(context.TODO(), filter).Decode(&user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.Status(fiber.StatusNotFound)
				return c.JSON(fiber.Map{
					"success": false,
					"message": "User not found",
				})
			}
			return err
		}

		// Parse the updated user profile data from the request
		var updates User
		if err := c.BodyParser(&updates); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"message": "Error parsing user data",
			})
		}

		// Update the user's data with the data from the request
		if updates.Name != "" {
			user.Name = updates.Name
		}
		if updates.Image != "" {
			user.Image = updates.Image
		}
		if updates.Description != "" {
			user.Description = updates.Description
		}
		if updates.Links != (UserLinks{}) {
			user.Links = updates.Links
		}

		// Update the user's data in the database
		_, err = collection.UpdateOne(context.TODO(), filter, bson.M{"$set": user})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"success": false,
				"message": "Error updating user data",
			})
		}

		return c.JSON(fiber.Map{
			"success": true,
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
