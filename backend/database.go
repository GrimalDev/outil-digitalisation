package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func initMongo() {
	// Read environment variables
	mongoURI := os.Getenv("MONGO_URI")
	mongoUser := os.Getenv("MONGO_USER")
	mongoPass := os.Getenv("MONGO_PASS")

	if mongoURI == "" || mongoUser == "" || mongoPass == "" {
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

func testSeeder() {
	// TODO: Implement test seeder
}
