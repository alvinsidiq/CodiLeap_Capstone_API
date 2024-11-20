import * as jwt from "jsonwebtoken";

// Obtain the secret key from environment variables
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Define a type for payload
interface TokenPayload {
  id: string;
}

// Function to sign a new access token
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// Function to verify the access token
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Access token expired");
    }
    throw new Error("Invalid token");
  }
};

// Function to refresh an access token using a refresh token
export const refreshToken = (refreshToken: string): string => {
  try {
    const decoded = jwt.verify(refreshToken, secret) as TokenPayload;
    return signToken({ id: decoded.id }); // Generate a new access token
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Refresh token expired");
    }
    throw new Error("Invalid refresh token");
  }
};
