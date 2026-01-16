import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { db } from './database';

const JWT_SECRET = 'super-secret-key-12345';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

interface TokenPayload {
  userId: number;
  email: string;
}

export function generateTokens(userId: number, email: string) {
  const accessToken = jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export async function refreshAccessToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as TokenPayload;

    const user = await db.query(
      'SELECT id, email, active FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (user.rows.length === 0 || !user.rows[0].active) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    const newTokens = generateTokens(decoded.userId, decoded.email);

    res.json(newTokens);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export async function logout(req: Request, res: Response) {
  res.json({ message: 'Logged out successfully' });
}
