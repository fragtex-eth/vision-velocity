package controllers

import (
	"context"
	"crypto/ecdsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Project struct {
	ID             primitive.ObjectID `json:"id" bson:"_id"`
	UserID         string             `json:"userId"`
	Name           string             `json:"name"`
	Description    string             `json:"description"`
	CreationDate   time.Time          `json:"creationDate"`
	Image          string             `json:"image"`
	Preview        []PreviewImage     `json:"preview"`
	Links          ProjectLinks       `json:"links"`
	Funds          ProjectFunds       `json:"funds"`
	SellPercentage int                `json:"sellPercentage"`
	Updates        []ProjectUpdate    `json:"updates"`
}

type PreviewImage struct {
	Img string `json:"img"`
}

type ProjectLinks struct {
	Github        string `json:"github"`
	X             string `json:"x"`
	Linkedin      string `json:"linkedin"`
	WalletAddress string `json:"walletAddress"`
}

type ProjectFunds struct {
	Required  int `json:"required"`
	Collected int `json:"collected"`
}

type ProjectUpdate struct {
	Category    string `json:"category"`
	Name        string `json:"name"`
	Status      string `json:"status"`
	Focus       string `json:"focus"`
	Description string `json:"description"`
}

var projectCollectionName = "projects"

func GetProjectsHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		// Connect to the MongoDB Atlas database
		database := client.Database(dbName)
		collection := database.Collection(projectCollectionName)

		filter := bson.M{}
		cursor, err := collection.Find(context.TODO(), filter)
		if err != nil {
			return err
		}

		var projects []Project
		for cursor.Next(context.Background()) {
			var project Project
			err := cursor.Decode(&project)
			if err != nil {
				return err
			}
			projects = append(projects, project)
		}

		cursor.Close(context.Background())
		return c.JSON(projects)
	}
}
func PostProjectHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		// Extract the user's email from the JWT token
		email, err := getUserEmailFromToken(c, client)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Error extracting user email",
			})
		}

		// Parse the project from the request body
		project := &Project{}
		if err := c.BodyParser(project); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Error parsing project data",
			})
		}

		// Set project's fields
		project.ID = primitive.NewObjectID()
		project.UserID = email
		project.CreationDate = time.Now()

		// Connect to the MongoDB Atlas database and insert the project
		database := client.Database(dbName)
		collection := database.Collection(projectCollectionName)
		_, err = collection.InsertOne(context.TODO(), project)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error inserting project into database",
			})
		}

		// Add the project ID to the user's projects slice
		userCollection := database.Collection(collectionUser)     // Assuming collectionUser is a global variable or constant with the name of your user collection
		filter := bson.M{"email": email}                          // Filter to find the user by their email
		update := bson.M{"$push": bson.M{"projects": project.ID}} // Command to append the project's ID to the projects field
		_, err = userCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error updating user's projects",
			})
		}

		return c.JSON(project)
	}
}

func getUserEmailFromToken(c *fiber.Ctx, client *mongo.Client) (string, error) {
	cookie := c.Cookies("jwt")
	block, _ := pem.Decode([]byte(SecretKey))
	if block == nil {
		return "", errors.New("failed to decode PEM block")
	}

	privateKey, err := x509.ParseECPrivateKey(block.Bytes)
	if err != nil {
		return "", err
	}

	publicKey := privateKey.Public().(*ecdsa.PublicKey)
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodECDSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return publicKey, nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	userID, err := primitive.ObjectIDFromHex(claims.Issuer)
	if err != nil {
		return "", err
	}

	var user User
	filter := bson.M{"_id": bson.M{"$eq": userID}}
	database := client.Database(dbName)
	collection := database.Collection(collectionUser)
	err = collection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		return "", err
	}

	return user.Email, nil // Assuming there's an Email field in your User struct
}
