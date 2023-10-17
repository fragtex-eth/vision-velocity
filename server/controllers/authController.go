package controllers

import (
	"context"
	"crypto/ecdsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = `
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINLJGdZujo2KPNGdfgJ5YobZdOZaZu5Yvka3x1Zp1f6FoAoGCCqGSM49
AwEHoUQDQgAE3L4ipbHD1vMuZi1BJ6MNzyAql8Z5G3FIL7ZduTJwBAUQj+Ki593n
f12xC0t5QVEOviS65EtZ+q0yTmu3NgGyEw==
-----END EC PRIVATE KEY-----
`

type UserLinks struct {
	Github        string `json:"github,omitempty" bson:"github,omitempty"`
	X             string `json:"x,omitempty" bson:"x,omitempty"`
	Linkedin      string `json:"linkedin,omitempty" bson:"linkedin,omitempty"`
	WalletAddress string `json:"walletAddress,omitempty" bson:"walletAddress,omitempty"`
}

type User struct {
	ID          primitive.ObjectID   `json:"id" bson:"_id,omitempty"`
	Name        string               `json:"name,omitempty" bson:"name,omitempty"`
	Email       string               `json:"email,omitempty" bson:"email,omitempty" gorm:"unique"`
	Password    []byte               `bson:"password,omitempty"`
	Image       string               `json:"image,omitempty" bson:"image,omitempty"`
	Description string               `json:"description,omitempty" bson:"description,omitempty"`
	Links       UserLinks            `json:"links,omitempty" bson:"links,omitempty"`
	Projects    []primitive.ObjectID `json:"projects,omitempty" bson:"projects,omitempty"`
	Investments []primitive.ObjectID `json:"investments,omitempty" bson:"investments,omitempty"`
}

var (
	collectionUser = "users"
	dbName         = "VisionVelocity"
)

func RegisterHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return err
		}

		password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
		user := User{Name: data["name"], Email: data["email"], Password: password}

		database := client.Database(dbName)
		collection := database.Collection(collectionUser)

		_, err := collection.InsertOne(context.TODO(), user)
		if err != nil {
			return err
		}

		return c.JSON(user)
	}
}

func LoginHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return err
		}

		var user User
		filter := bson.M{"email": data["email"]}

		database := client.Database(dbName)
		collection := database.Collection(collectionUser)

		err := collection.FindOne(context.TODO(), filter).Decode(&user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return c.Status(fiber.StatusNotFound).SendString("User not found")
			}
			return err
		}

		if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
			c.Status(fiber.StatusBadRequest)
			return c.JSON(fiber.Map{
				"message": "incorrect password",
			})
		}

		claims := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.StandardClaims{
			Issuer:    user.ID.Hex(),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})

		ecdsaKey := LoadECDSAPrivateKey([]byte(SecretKey))
		token, err := claims.SignedString(ecdsaKey)

		if err != nil {
			fmt.Println("Token Generation Error:", err)
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "could not log in",
			})
		}

		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
			HTTPOnly: true,
		}

		c.Cookie(&cookie)

		return c.JSON(fiber.Map{
			"message": "success",
		})
	}
}

func LoadECDSAPrivateKey(pemKey []byte) *ecdsa.PrivateKey {
	block, _ := pem.Decode(pemKey)
	if block == nil {
		log.Fatalf("Failed to decode PEM block containing private key")
	}

	key, err := x509.ParseECPrivateKey(block.Bytes)
	if err != nil {
		log.Fatalf("Failed to parse ECDSA private key: %v", err)
	}
	return key
}

func UserHandler(client *mongo.Client) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var user User
		cookie := c.Cookies("jwt")
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
				"message": "unauthenticated",
			})
		}

		claims, ok := token.Claims.(*jwt.StandardClaims)
		if !ok {
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(fiber.Map{
				"message": "invalid token claims",
			})
		}

		userID, err := primitive.ObjectIDFromHex(claims.Issuer)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
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
					"message": "User not found",
				})
			}
			return err
		}

		return c.JSON(user)
	}
}

func LogoutHandler(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "logged out successfully",
	})
}
