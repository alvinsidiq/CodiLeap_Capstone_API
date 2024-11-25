# Auth API Spec

## Register

Endpoint : POST /api/auth/register

Request Body :

```json
{
  "email": "johndoe@example.com", // email
  "password": "secret1234" // min 8 characters
}
```

Response Body (Success) :

```json
{
  "message": "Account created successfully",
  "status": "Created",
  "data": null
}
```

Response Body (Bad Request) 409 :

```json
{
  "status": "Bad Request",
  "error": "Validation Error",
  "errors": {
    "email": "email should be a valid email",
    "password": "password should be at least 6 characters"
  }
}
```

Response Body (Conflict) email yang sama :

```json
{
  "status": "Conflict",
  "error": "email already exists",
  "errors": null
}
```

## Login

Endpoint : POST /api/auth/login

description : Login request will return access token and refresh token that will be used for authentication.

Request Body :

```json
{
  "email": "johndoe@example.com", // email
  "password": "secret"
}
```

Response Body (Success) :

```json
{
  "message": "Logged in successfully",
  "status": "Created",
  "data": {
    "access_token": "{access_token}",
    "token_type": "{jwt_token}",
    "expires_in": 1234567890,
    "refresh_token": "{refresh_token}",
    "refresh_token_expires_in": 1234567890
  }
}
```

Response Body (Unauthorized) :

```json
{
  "status": "Unauthorized",
  "error": "invalid credentials",
  "errors": null
}
```

<!-- ## Logout -->
// opsional 

Endpoint : DELETE /api/auth/logout

Headers :

- Authorization: Bearer {refresh_token}

Response Body (Success) :

```json
{
  "message": "Logged out successfully"
  "status": "OK",
  "data": null
}
```

## Refresh Token

Endpoint : POST /api/auth/refresh

Headers :

- Authorization: Bearer {refresh_token}

Response Body (Success) :

```json
{
  "message": "Token refreshed successfully",
  "status": "Created",
  "data": {
    "access_token": "{access_token}",
    "token_type": "Bearer",
    "expires_in": 1234567890,
    "refresh_token": "{refresh_token}",
    "refresh_token_expires_in": 1234567890
  }
}
```

Response Body (Unauthorized) :

```json
{
  "status": "Unauthorized",
  "error": "token expired",
  "errors": null
}
```
