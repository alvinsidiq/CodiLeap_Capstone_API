import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { 
  LoginRequest, 
  RegisterRequest, 
  RegisterResponseType, 
  LoginResponseType,
  RefreshTokenResponseType,
} from "@/core/models/auth_model";
import { RegisterAuth, LoginAuth, RefreshTokenService,LogoutService } from "@/service/auth_service";
import { ApiResponse } from "@/core/models/api_model";
import { errorValidationParser as validateErrorHandler } from "@/middleware/errorValidationParser";
//import { authMiddleware } from "@/middleware/auth_verifikasion"; 

const auth = new Hono();

// Register route
auth.post(
  "/register",
  zValidator("json", RegisterRequest, validateErrorHandler),
  async (c) => {
    const data = c.req.valid("json");
    const { accessToken, refreshToken, user } = await RegisterAuth(data); 

    return c.json(
      {
        message: "Account created successfully",
        status: "CREATED",
        data: {
          accessToken,
          refreshToken,
          user
        }, 
      } satisfies ApiResponse<{
        accessToken: string;
        refreshToken: string;
        user: RegisterResponseType;
      }>, 
      StatusCodes.CREATED 
    );
  }
);

// Login route
auth.post(
  "/login",
  zValidator("json", LoginRequest, validateErrorHandler), 
  async (c) => {
    const data = c.req.valid("json"); 
    const loginResponse = await LoginAuth(data); 
    
    return c.json(
      {
        message: "Logged in successfully",
        status: "OK", 
        data: loginResponse,
      } satisfies ApiResponse<LoginResponseType>, 
      StatusCodes.OK 
    );
  }
);

auth.post("/refresh", async (c) => {
  // Get Authorization header
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader) {
    return c.json(
      {
        message: "No refresh token provided",
        status: "Unauthorized"
      },
      StatusCodes.UNAUTHORIZED
    );
  }

  // Extract token (assuming "Bearer {token}" format)
  const refreshToken = authHeader.split(' ')[1];

  try {
    const refreshResponse = await RefreshTokenService.refreshToken(refreshToken);

    return c.json(
      {
        message: refreshResponse.message,
        status: refreshResponse.status,
        data: {
          access_token: refreshResponse.access_token,
          token_type: refreshResponse.token_type,
          expires_in: refreshResponse.expires_in,
          refresh_token: refreshResponse.refresh_token,
          refresh_token_expires_in: refreshResponse.refresh_token_expires_in
        }
      } satisfies ApiResponse<RefreshTokenResponseType>,
      StatusCodes.CREATED
    );
  } catch (error) {
    // Error handling is done in the main error middleware
    throw error;
  }
});


auth.delete("/logout", async (c) => {
  // Get Authorization header
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader) {
    return c.json(
      {
        message: "No token provided",
        status: "Unauthorized"
      },
      StatusCodes.UNAUTHORIZED
    );
  }
  const refreshToken = authHeader.split(' ')[1];
  try {
    await LogoutService.logout(refreshToken);

    return c.json(
      {
        message: "Logged out successfully",
        status: "OK",
        data: null
      } satisfies ApiResponse<null>,
      StatusCodes.OK
    );
  } catch (error) {
    
    throw error;
  }
});


export default auth;