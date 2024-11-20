# Learning Path API Spec

## Get All Learning Paths

Endpoint : GET /api/learning-paths

- Authorization: Bearer {access_token}

Response Body (Success) :

```json
{
  "message": "Learning paths retrieved successfully",
  "status": "OK",
  "data": [
    {
      "id": 1,
      "name": "Learning Path 1",
      "description": "Learning Path 1 Description",
      "level": "BEGINNER|INTERMEDIATE|ADVANCED",
      "totalModules": "4",
      "estimatedDuration": "4 hours",
      "createdAt": "2021-01-01T00:00:00.000Z",
      "updatedAt": "2021-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Learning Path 2",
      "description": "Learning Path 2 Description",
      "level": "BEGINNER|INTERMEDIATE|ADVANCED",
      "totalModules": "4",
      "estimatedDuration": "4 hours",
      "createdAt": "2021-01-01T00:00:00.000Z",
      "updatedAt": "2021-01-01T00:00:00.000Z"
    }
  ]
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

## Learning Path Screening

Endpoint : POST /api/learning-paths/screening

- Authorization: Bearer {access_token}

description : This endpoint is used to screening a learning path for a user.

Request Body :

```json
{
"answers" : [
    {
        "questionId": 1,
        "selectedAnswerId": 1
    },
    {
        "questionId": 2,
        "selectedAnswerId": 2
    },
  ...
 ]
}
```

Response Body (Success) :

```json
{
  "message": "Screening learning path successfully",
  "status": "Created",
  "data": {
    "recommendedPath": {
      "pathId": "integer",
      "pathName": "string",
      "level": "string",
      "reason": "string"
    },
    "screeningResults": {
      "score": "integer",
      "strengths": ["string"],
      "areasForImprovement": ["string"]
    }
  }
}
```

Response Body (Bad Request) :

```json
{
  "status": "Bad Request",
  "error": "Validation Error",
  "errors": {
    "answers": "answers should be array of objects with questionId and selectedAnswerId"
  }
}
```