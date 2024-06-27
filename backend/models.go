package main

import "time"

// Company represents the structure of a company.
type Company struct {
	ID                string             `json:"_id" bson:"_id"`
	Name              string             `json:"name" bson:"name"`
	Sector            string             `json:"sector" bson:"sector"`
	NumberOfEmployees int                `json:"number_of_employees" bson:"number_of_employees"`
	Location          string             `json:"location" bson:"location"`
	Governance        string             `json:"governance" bson:"governance"`
	Centralized       string             `json:"centralized" bson:"centralized"`
	Clientele         string             `json:"clientele" bson:"clientele"`
	Project           string             `json:"project" bson:"project"`
	Responses         []CategoryResponse `json:"responses" bson:"responses"`
}

// CategoryResponse represents the response for a category.
type CategoryResponse struct {
	CategoryID string         `json:"category_id" bson:"category_id"`
	Questions  []QuestionInfo `json:"questions" bson:"questions"`
}

// QuestionInfo represents information about a question in a category response.
type QuestionInfo struct {
	QuestionID   string    `json:"question_id" bson:"question_id"`
	Score        int       `json:"score" bson:"score"`
	ResponseDate time.Time `json:"response_date" bson:"response_date"`
}

// Category represents the structure of a category.
type Category struct {
	ID          string     `json:"_id" bson:"_id"`
	Name        string     `json:"name" bson:"name"`
	Description string     `json:"description" bson:"description"`
	Questions   []Question `json:"questions" bson:"questions"`
}

// Question represents the structure of a question.
type Question struct {
	Statement string   `json:"statement" bson:"statement"`
	Choices   []Choice `json:"possible_choices" bson:"possible_choices"`
}

// Choice represents the possible choices for a question.
type Choice struct {
	Text  string `json:"text" bson:"text"`
	Value int    `json:"value" bson:"values"`
}
