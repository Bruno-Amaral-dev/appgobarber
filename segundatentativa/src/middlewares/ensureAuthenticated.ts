import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string; // User ID
}

// Extend the global Express Request interface
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export default function ensureAuthenticated(
  request: Request, // Use the standard Request type
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Check if header starts with 'Bearer '
  if (!authHeader.startsWith('Bearer ')) {
    response.status(401).json({ error: 'Invalid token format' });
    return;
  }

  // Extract token (everything after 'Bearer ')
  const token = authHeader.substring(7);

  console.log('Extracted token:', token);

  try {
    const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;
    
    console.log('Decoded token:', decoded);
    
    // Add user info to request object
    request.user = {
      id: decoded.sub
    };

    // Continue to next middleware/route handler
    next();
    
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
