import db from "@/core/db/index_db";
import { eq } from "drizzle-orm";
import { Auth } from "@/core/db/schema/index_schema";
import {
  RegisterUserRequestType,
  LoginRequestType,
  RegisterResponseType,
  LoginResponseType,
  JwtPayload,LogoutResponseType
} from "@/core/models/auth_model";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { signToken, verifyToken,decodeToken } from "@/core/utils/utilis_jwt";
import * as bcrypt from 'bcrypt';
import { RefreshTokenResponseType } from "@/core/models/auth_model"; 

export const RegisterAuth = async (
  data: RegisterUserRequestType
): Promise<{ accessToken: string; refreshToken: string; user: RegisterResponseType }> => {
  // Check if email is already registered
  const emailExists = await db.query.Auth.findFirst({
    where: (user) => eq(user.email, data.email),
  });

  if (emailExists) {
    throw new HTTPException(StatusCodes.CONFLICT, {
      message: "Email already exists",
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create a new user
  const newUser = await db
    .insert(Auth)
    .values({
      email: data.email,
      hashedPassword: hashedPassword,
    })
    .returning({
      id: Auth.id,
      email: Auth.email,
      createdAt: Auth.createdAt,
      updatedAt: Auth.updatedAt,
    });

  // Generate JWT tokens
  const jwtPayload: JwtPayload = { 
    id: newUser[0].id, 
    email: newUser[0].email 
  };

  const accessToken = signToken(jwtPayload);
  const refreshToken = signToken(jwtPayload, { expiresIn: "7d" });

  // Return the response with tokens and user data
  return {
    accessToken,
    refreshToken,
    user: newUser[0],
  };
};

export const LoginAuth = async (
  data: LoginRequestType
): Promise<LoginResponseType> => {
  // Check if the user exists
  const user = await db.query.Auth.findFirst({
    where: (auth) => eq(auth.email, data.email),
  });

  if (!user) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: "Invalid credentials",
    });
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(
    data.password, 
    user.hashedPassword
  );

  if (!isPasswordValid) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: "Invalid credentials",
    });
  }

  // Generate JWT tokens
  const jwtPayload: JwtPayload = { 
    id: user.id, 
    email: user.email 
  };

  const accessToken = signToken(jwtPayload);
  const refreshToken = signToken(jwtPayload, { expiresIn: "7d" });

  // Return the response with tokens and user data
  return {
    accessToken,
    refreshToken,
    tokenType: 'Bearer',
    expiresIn: 3600, // 1 hour
    refreshTokenExpiresIn: 604800, // 7 days
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

export const RefreshTokenService = {
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseType> {
    try {
      // Verify the refresh token
      const decoded = verifyToken(refreshToken);

      // Check if user exists
      const user = await db.query.Auth.findFirst({
        where: (auth) => eq(auth.id, decoded.id)
      });

      if (!user) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {
          message: "User not found"
        });
      }

      // Generate new tokens
      const newAccessToken = signToken({ 
        id: user.id, 
        email: user.email 
      });
      
      const newRefreshToken = signToken(
        { id: user.id, email: user.email }, 
        { expiresIn: "7d" }
      );

      // Decode tokens to get expiration
      const accessTokenDecoded = decodeToken(newAccessToken);
      const refreshTokenDecoded = decodeToken(newRefreshToken);

      return {
        message: "Token refreshed successfully",
        status: "Created",
        access_token: newAccessToken,
        token_type: "Bearer",
        expires_in: accessTokenDecoded.exp! - Math.floor(Date.now() / 1000),
        refresh_token: newRefreshToken,
        refresh_token_expires_in: refreshTokenDecoded.exp! - Math.floor(Date.now() / 1000)
      };
    } catch (error) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: "Invalid refresh token"
      });
    }
  }
};



//logout
export const LogoutService = {
  async logout(userId: number): Promise<LogoutResponseType> {
    try {
      // Verify the refresh token
      const decoded = verifyToken(refreshToken);

      // Check if user exists
      const user = await db.query.Auth.findFirst({
        where: (auth) => eq(auth.id, decoded.id)
      });

      if (!user) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {
          message: "User not found"
        });
      }
          } catch (error) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: "Invalid token"
      });
    }
  }
};