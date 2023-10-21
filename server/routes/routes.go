package routes

import (
	"visionvelocity/controllers"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func Setup(app *fiber.App, client *mongo.Client) {

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	// Auth
	app.Post("/api/register", controllers.RegisterHandler(client))
	app.Post("/api/login", controllers.LoginHandler(client))
	app.Get("/api/user", controllers.UserHandler(client))
	app.Post("api/logout", controllers.LogoutHandler)

	app.Put("/api/user", controllers.EditUserProfileHandler(client))

	// Projects
	app.Get("/api/projects", controllers.GetProjectsHandler(client))
	app.Post("/api/projects", func(c *fiber.Ctx) error {
		return controllers.PostProjectHandler(client)(c)
	})

	//Users
	app.Get("/api/users", controllers.GetAllUsersHandler(client))
}
