import { z } from "zod";

export const RegisterRequest = z
  .object({
    email: z.string().email({ message: "Email should be a valid email" }),
    password: z.string().min(8, { message: "Password should be at least 8 characters" }),
  })
  .strict();

export const LoginRequest = z
  .object({
    email: z.string().email({ message: "Email should be a valid email" }),
    password: z.string().min(8, { message: "Password is required" }),
  })
  .strict();

  
  export const RefreshTokenResponse = z.object({
    access_token: z.string(),
    token_type: z.literal("Bearer"),
    expires_in: z.number(),
    refresh_token: z.string(),
    refresh_token_expires_in: z.number()
  });

  export const LogoutResponse = z.object({
    message: z.string(),
    status: z.literal("OK"),
    data: z.null()
  });
  
  export type RefreshTokenResponseType = z.infer<typeof RefreshTokenResponse> & {
    message: string;
    status: string;
  };

export type RegisterResponseType = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
  user: {
    id: number;
    email: string;
  };
};

export type JwtPayload = {
  id: number;
  email: string;
  exp?: number;
  iat?: number;
};


export type RegisterUserRequestType = z.infer<typeof RegisterRequest>;
export type LoginRequestType = z.infer<typeof LoginRequest>;
export type LogoutResponseType = z.infer<typeof LogoutResponse>;