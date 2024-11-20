import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { LoginRequest,RegisterRequest,RegisterResponseType,LoginResponseType } from "@/core/models/auth_model";
import { RegisterAuth,LoginAuth } from "@/service/auth_service";
import { ApiResponse } from "@/core/models/api_model";
import { errorValidationParser as validateErrorHandler } from "@/middleware/errorValidationParser";

const auth = new Hono();

// Register route
auth.post(
  "/register",
  zValidator("json", RegisterRequest,validateErrorHandler),
  async (c) => {
    
      const data = c.req.valid("json");
      await RegisterAuth(data);

      return c.json(
        {
          message: "Account created successfully",
          status: "CREATED",
          data: null,
        } satisfies ApiResponse<null>,
        StatusCodes.CREATED
      );
    } 

);
      
      

// Login route

auth.post(
  "/login",
  zValidator("json", LoginRequest),
  async (c) => {
    
      const data = c.req.valid("json");
       await LoginAuth(data);

      return c.json(
        {
          message: "Logged in successfully",
          data: null,
        } satisfies ApiResponse<null>,
        StatusCodes.OK
      );
    } 
      );
   

export default auth;
