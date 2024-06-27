package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

func getCategoryNames(c echo.Context) error {
	// Get MongoDB collection
	dbName := os.Getenv("MONGO_DBNAME")
	collection := client.Database(dbName).Collection("category")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Query to get all categories
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Printf("Failed to find categories: %v\n", err)
		return c.String(http.StatusInternalServerError, "Failed to fetch categories")
	}
	defer cursor.Close(ctx)

	var categories []Category

	// Iterate through the cursor and decode documents
	for cursor.Next(ctx) {
		var category Category
		if err := cursor.Decode(&category); err != nil {
			log.Printf("Failed to decode category: %v\n", err)
			continue
		}
		categories = append(categories, category)
	}

	// Check for cursor errors
	if err := cursor.Err(); err != nil {
		log.Printf("Cursor error: %v\n", err)
		return c.String(http.StatusInternalServerError, "Failed to iterate categories")
	}

	// Return JSON response
	return c.JSON(http.StatusOK, categories)
}
