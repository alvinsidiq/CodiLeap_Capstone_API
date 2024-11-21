import { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '@/core/utils/utilis_jwt';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: 'No token provided'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    c.set('user', decoded);
    await next();
  } catch (error) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: 'Invalid or expired token'
    });
  }
};