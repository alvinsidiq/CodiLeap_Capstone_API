# Progress API Spec

## Update Lesson Progress

Endpoint : PATCH /api/progress/lesson/{lessonId}

Description : This endpoint is used to update lesson progress.

- Authorization: Bearer {access_token}

Request Body :

```json
{
  "userId": "integer",
  "status": "COMPLETED",
  "timeSpent": "integer" // in seconds
// lisen id 
}
```

Response Body (Success) :

```json
{
  "message": "Update lesson progress successfully",
  "status": "OK",
  "data": {
    "lessonId": "integer",
    "completionStatus": "string",
    "moduleProgress": "float"
    // "earnedBadges": ["string"]
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
  "error": "lesson not found",
  "errors": null
}
```

## Get all user progress

Endpoint : GET /api/progress/user/{userId}

- Authorization: Bearer {access_token}

description : This endpoint is used to get all user progress.

Response Body (Success) :

```json
{
  "message": "Screening learning path successfully",
  "status": "Created",
  "data": {
    "overallProgress": {
      "completedModules": "integer",
      "totalModules": "integer",
      "completedLessons": "integer",
      "totalLessons": "integer"
    },
    "currentStreak": "integer",
    "longestStreak": "integer",
    "averageDailyTime": "integer",
    "learningPathProgress": [
      {
        "pathId": "integer",
        "pathName": "string",
        "progress": "float"
      }
    ]
  }
}
```
