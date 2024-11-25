# Badge API Spec

## Get user badges

Endpoint : GET /api/badges/user/{userId}

Description : This endpoint is used to get all user badges.

Response Body (Success) :

```json
{
  "message": "User badges retrieved successfully",
  "status": "OK",
  "data": {
    "earnedBadges": [
      {
        "id": "integer",
        "title": "string", 
        "description": "string",
        "imageUrl": "string",
        "earnedAt": "timestamp"
      }
    ],
    "availableBadges": [
      {
        "id": "integer",
        "title": "string",
        "description": "string",
        "requirements": ["string"]
      },
      ...
    ]
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
