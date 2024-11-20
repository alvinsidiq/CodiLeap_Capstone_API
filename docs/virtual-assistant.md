# Virtual Assistant API Spec

## Chat with Virtual Assistant

Endpoint : POST /api/assistant/chat

Description : This endpoint is used to chat with virtual assistant.

- Authorization: Bearer {access_token}

Request Body :

```json
{
  "userId": "integer",
  "message": "string",
  "context": {
    "currentModule": "string",
    "currentLesson": "string"
  }
}
```

Response Body (Success) :

```json
{
  "message": "Chat with virtual assistant successfully",
  "status": "Created",
  "data": {
    "response": "string",
    "suggestions": ["string"],
    "relatedResources": [
      {
        "type": "LESSON|MODULE|EXTERNAL",
        "title": "string",
        "link": "string"
      }
    ]
  }
}
```

Response Body (Bad Request) :

```json
{
  "status": "Bad Request",
  "error": "Validation Error",
  "errors": {
    "message": "message should be a valid string, at least 3 characters"
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

## Get All Chat Messages

Endpoint : GET /api/assistant/chat/{userId}

- Authorization: Bearer {access_token}

description : This endpoint is used to get all chat messages.

Response Body (Success) :

```json
{
  "message": "Virtual assistant messages retrieved successfully",
  "status": "Ok",
  "data": {
    // not ready yet
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
