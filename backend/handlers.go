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

func getAllCompany(c echo.Context) error {
	// Get MongoDB collection
	dbName := os.Getenv("MONGO_DBNAME")
	collection := client.Database(dbName).Collection("company")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	// Query to get all companies
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Printf("Failed to find companies: %v\n", err)
		return c.String(http.StatusInternalServerError, "Failed to fetch companies")
	}
	defer cursor.Close(ctx)
	var companies []Company
	// Iterate through the cursor and decode documents
	for cursor.Next(ctx) {
		var company Company
		if err := cursor.Decode(&company); err != nil {
			log.Printf("Failed to decode company: %v\n", err)
			continue
		}
		companies = append(companies, company)
	}
	// Check for cursor errors
	if err := cursor.Err(); err != nil {
		log.Printf("Cursor error: %v\n", err)
		return c.String(http.StatusInternalServerError, "Failed to iterate companies")
	}
	// Return JSON response
	return c.JSON(http.StatusOK, companies)
}

func saveCompany(c echo.Context) error {
	// Get MongoDB collection
	dbName := os.Getenv("MONGO_DBNAME")
	collection := client.Database(dbName).Collection("company")

	var company Company

	// Bind the request body to the company struct
	if err := c.Bind(&company); err != nil {
		log.Printf("Failed to bind company data: %v\n", err)
		return c.String(http.StatusBadRequest, "Invalid company data")
	}

	// Insert the company into the MongoDB collection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, company)
	if err != nil {
		log.Printf("Failed to insert company: %v\n", err)
		return c.String(http.StatusInternalServerError, "Failed to save company")
	}

	return c.NoContent(http.StatusCreated)
}

func getCompany(c echo.Context) error {
	// Get MongoDB collection
	dbName := os.Getenv("MONGO_DBNAME")
	collection := client.Database(dbName).Collection("company")
	companyID := c.Param("id")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	// Query to find the company by ID
	var company Company
	err := collection.FindOne(ctx, bson.D{{Key: "_id", Value: companyID}}).Decode(&company)
	if err != nil {
		log.Printf("Failed to find company: %v\n", err)
		return c.String(http.StatusNotFound, "Company not found")
	}
	return c.JSON(http.StatusOK, company)
}
