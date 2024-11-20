# Analytics API Spec

## Get All User Analytics

Endpoint : GET /api/analytics/user/{userId}

Description : This endpoint is used to get all user analytics.

- Authorization: Bearer {access_token}

Response Body (Success) :

```json
{
  "message": "User analytics retrieved successfully",
  "status": "OK",
  "data": {
    "dailyStats": {
      "timeSpent": "integer",
      "lessonsCompleted": "integer",
      "quizzesTaken": "integer"
    },
    "weeklyTrend": [
      {
        "date": "string",
        "timeSpent": "integer",
        "progress": "float"
      }
    ],
    "learningPatterns": {
      "mostProductiveHours": ["integer"],
      "averageSessionDuration": "integer",
      "chronotype": "string"
    }
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
  "error": "user not found",
  "errors": null
}
```
