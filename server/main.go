package main

import (
	"context"
	"log"
	"time"
	"visionvelocity/database"
	"visionvelocity/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Timestamps struct {
	CreatedAt time.Time `json:"create_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func main() {
	client, err := database.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v\n", err)
	}
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := client.Disconnect(ctx); err != nil {
			log.Fatalf("Failed to disconnect from database: %v\n", err)
		}
	}()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://10.0.0.244:5173,http://localhost:5173",
		AllowMethods:     "GET,POST,PUT,PATCH,DELETE,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization,Cookie",
		ExposeHeaders:    "Content-Length,Set-Cookie",
	}))

	routes.Setup(app, client)

	app.Listen(":7777")

}
