package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func initMongo() {
	// Read environment variables
	mongoURI := os.Getenv("MONGO_URI")
	mongoUser := os.Getenv("MONGO_USER")
	mongoPass := os.Getenv("MONGO_PASS")
	mongoDBName := os.Getenv("MONGO_DBNAME")

	if mongoURI == "" || mongoUser == "" || mongoPass == "" || mongoDBName == "" {
		log.Fatal("Missing MongoDB environment variables")
	}

	// Construct the MongoDB URI with authentication
	authURI := fmt.Sprintf("mongodb://%s:%s@%s", mongoUser, mongoPass, mongoURI)

	// Set the client options
	clientOptions := options.Client().ApplyURI(authURI)

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Ping the database to verify connection
	if err = client.Ping(ctx, nil); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB")
}

func seed() {
	// Seed company collection
	seedCompany()

	// Seed category collection
	seedCategory()

	log.Println("Seeding completed")
}

func seedCompany() {
	// Check if documents already exist in the collection
	dbName := os.Getenv("MONGO_DBNAME")
	companyCollection := client.Database(dbName).Collection("company")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	count, err := companyCollection.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Fatalf("Failed to count documents in company collection: %v", err)
	}

	if count > 0 {
		log.Println("Company collection already contains documents. Skipping seeding.")
		return
	}

	// Read JSON file
	file, err := os.ReadFile("./seeds/seedCompany.json")
	if err != nil {
		log.Fatalf("Failed to read seedCompany.json: %v", err)
	}

	// Parse JSON
	var companies []bson.M
	if err := json.Unmarshal(file, &companies); err != nil {
		log.Fatalf("Failed to unmarshal seedCompany.json: %v", err)
	}

	// Convert []bson.M to []interface{}
	var interfaceSlice []interface{}
	for _, company := range companies {
		interfaceSlice = append(interfaceSlice, company)
	}

	// Insert documents
	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = companyCollection.InsertMany(ctx, interfaceSlice)
	if err != nil {
		log.Fatalf("Failed to insert documents into company collection: %v", err)
	}

	log.Println("Inserted documents into company collection")
}

func seedCategory() {
	// Check if documents already exist in the collection
	dbName := os.Getenv("MONGO_DBNAME")
	categoryCollection := client.Database(dbName).Collection("category")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	count, err := categoryCollection.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Fatalf("Failed to count documents in company collection: %v", err)
	}

	if count > 0 {
		log.Println("Company collection already contains documents. Skipping seeding.")
		return
	}

	// Read JSON file
	file, err := os.ReadFile("./seeds/seedCategory.json")
	if err != nil {
		log.Fatalf("Failed to read seedCategory.json: %v", err)
	}

	// Parse JSON
	var categories []bson.M
	if err := json.Unmarshal(file, &categories); err != nil {
		log.Fatalf("Failed to unmarshal seedCategory.json: %v", err)
	}

	// Convert []bson.M to []interface{}
	var interfaceSlice []interface{}
	for _, category := range categories {
		interfaceSlice = append(interfaceSlice, category)
	}

	// Insert documents
	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = categoryCollection.InsertMany(ctx, interfaceSlice)
	if err != nil {
		log.Fatalf("Failed to insert documents into category collection: %v", err)
	}

	log.Println("Inserted documents into category collection")
}
