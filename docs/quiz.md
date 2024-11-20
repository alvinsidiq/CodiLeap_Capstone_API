# Quiz API Spec

## Get daily quiz

Endpoint : GET /api/quiz/daily

Description : This endpoint is used to get daily quiz.

- Authorization: Bearer {access_token}

Response Body (Success) :

```json
{
  "message": "Update lesson progress successfully",
  "status": "OK",
  "data": {
    "quizId": "integer",
    "title": "string",
    "questions": [
      {
        "id": "integer",
        "question": "string",
        "choices": [
          {
            "id": "integer",
            "content": "string"
          }
        ]
      }
    ],
    "timeLimit": "integer" // in seconds
  }
}
```

Response Body (Unauthorized) :

```json
{
  "status": "Bad Request",
  "error": "invalid token",
  "errors": null
}
```

## Submit Quiz

Endpoint : POST /api/quiz/submit

- Authorization: Bearer {access_token}

description : This endpoint is used to submit quiz.

Request Body :

```json
{
  "quizId": "integer",
  "userId": "integer",
  "answers": [
    {
      "questionId": "integer",
      "selectedAnswerId": "integer"
    }
  ],
  "timeSpent": "integer"
}
```

Response Body (Success) :

```json
{
  "message": "Screening learning path successfully",
  "status": "Created",
  "data": {
    "score": "integer",
    "correctAnswers": "integer",
    "totalQuestions": "integer",
    "feedback": [
      {
        "questionId": "integer",
        "isCorrect": "boolean",
        "explanation": "string"
      }
    ],
    "earnedBadges": ["string"]
  }
}
```

Response Body (Bad Request) :

```json
{
  "status": "Bad Request",
  "error": "Validation Error",
  "errors": {
    "quizId": "quizId should be a valid integer",
    "timeSpent": "timeSpent should be a valid integer"
  }
}
```

Response Body (Unauthorized) :

```json
{
  "status": "Bad Request",
  "error": "invalid token",
  "errors": null
}
```

Response Body (Not Found) :

```json
{
  "status": "Not Found",
  "error": "quiz not found",
  "errors": null
}
```
