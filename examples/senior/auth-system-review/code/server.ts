import express from 'express';
import { authMiddleware, generateTokens, refreshAccessToken, logout } from './authService';
import './types';

const app = express();
app.use(express.json());

// Public routes
app.post('/api/auth/login', (req, res) => {
  const { userId, email } = req.body;
  const tokens = generateTokens(userId || 1, email || 'test@example.com');
  res.json(tokens);
});

app.post('/api/auth/refresh', refreshAccessToken);
app.post('/api/auth/logout', logout);

// Protected route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Auth service running on http://localhost:3000');
    console.log('\nEndpoints:');
    console.log('  POST /api/auth/login - Get tokens');
    console.log('  POST /api/auth/refresh - Refresh access token');
    console.log('  POST /api/auth/logout - Logout');
    console.log('  GET /api/profile - Protected route');
  });
}

export default app;
