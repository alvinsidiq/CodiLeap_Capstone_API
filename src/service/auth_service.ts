import db from "@/core/db/index_db";
import { eq } from "drizzle-orm";
import { Auth } from "@/core/db/schema/index_schema";
import {
  RegisterUserRequestType,
  LoginRequestType,
  RegisterResponseType,
  LoginResponseType
} from "@/core/models/auth_model";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { signToken } from "@/core/utils/utilis_jwt";  // JWT utility functions (signing tokens)

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

  // Create a new user
  const newUser = await db
    .insert(Auth)
    .values({
      email: data.email,
      hashedPassword: data.password,
    })
    .returning({
      id: Auth.id,
      email: Auth.email,
      createdAt: Auth.createdAt,
      updatedAt: Auth.updatedAt,
    });

  // Generate access and refresh tokens
  const accessToken = signToken({ id: newUser[0].id });
  const refreshToken = signToken({ id: newUser[0].id }, { expiresIn: "7d" });

  // Return the response with tokens and user data
  return {
    accessToken,
    refreshToken,
    user: newUser[0],
  };
};

export const LoginAuth = async (
  data: LoginRequestType
): Promise<{ accessToken: string; refreshToken: string; user: LoginResponseType }> => {
  // Check if the user exists
  const user = await db.query.Auth.findFirst({
    where: (auth) => eq(auth.email, data.email),
  });

  if (!user) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: "Invalid credentials",
    });
  }

  // Verify the password (you can replace this with password hashing comparison)
  if (data.password !== user.hashedPassword) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: "Invalid credentials",
    });
  }

  // Generate access and refresh tokens
  const accessToken = signToken({ id: user.id });
  const refreshToken = signToken({ id: user.id }, { expiresIn: "7d" });

  // Return the response with tokens and user data
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};
