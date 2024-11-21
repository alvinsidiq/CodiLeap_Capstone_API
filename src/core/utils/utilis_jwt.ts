
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

interface TokenOptions {
  expiresIn?: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export const signToken = (
  payload: { id: number }, 
  options: TokenOptions = {}
): string => {
  const defaultOptions = { 
    expiresIn: '1h' 
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET!, 
    mergedOptions
  );
};

export const verifyToken = (token: string): CustomJwtPayload => {
  try {
    return jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token: string): CustomJwtPayload => {
  return jwt.decode(token) as CustomJwtPayload;
};