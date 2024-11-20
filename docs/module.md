# Module & Lesson Path API Spec

## Get Modules by Learning Path ID

Endpoint : GET /api/modules/{learningPathId}

- Authorization: Bearer {access_token}

Description : This endpoint is used to get all modules by learning path ID.

Response Body (Success) :

```json
{
  "message": "Modules retrieved successfully",
  "status": "OK",
  "data": [
    {
      "id": "integer",
      "name": "string",
      "description": "string",
      "totalLessons": "integer",
      "progress": {
        "completed": "integer",
        "total": "integer",
        "percentage": "float"
      }
    },
    ...
  ]
}
```

Response Body (Not Found) :

```json
{
  "status": "Not Found",
  "error": "learning path not found",
  "errors": null
}
```

## Get Lesson by Module ID

Endpoint : POST /api/modules/{moduleId}/lessons

- Authorization: Bearer {access_token}

Description : This endpoint is used to get all lessons by module ID.

Response Body (Success) :

```json
{
  "message": "Lessons retrieved successfully",
  "status": "OK",
  "data": [
    {
      "id": "integer",
      "name": "string",
      "status": "NOT_STARTED|IN_PROGRESS|COMPLETED",
      "units": [
        {
          "id": "integer",
          "order": "integer",
          "content": "string",
          "type": "HTML|INTERACTIVE"
        }
      ]
    },
    ...
  ]
}
```

Response Body (Not Found) :

```json
{
  "status": "Not Found",
  "error": "module not found",
  "errors": null
}
```
