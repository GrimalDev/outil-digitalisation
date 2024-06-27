package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Middleware to add Access-Control-Allow-Origin header
func corsMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Set("Access-Control-Allow-Origin", "*")
		return next(c)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(corsMiddleware)

	initMongo()
	seed()

	// Routes
	e.GET("/questionnaire", getCategoryNames)
	e.POST("/questionnaire", saveCompany)
	e.GET("/entreprises", getAllCompany)

	// e.GET("/", func(c echo.Context) error {
	// 	return c.String(http.StatusOK, "Hello, World!")
	// })

	// Start server
	if err := e.Start(":8000"); err != nil && err != http.ErrServerClosed {
		log.Fatal("Shutting down the server")
	}
}
