import express from 'express';
import { registerUser, loginUser } from './userController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  POST /api/register');
    console.log('  POST /api/login');
  });
}

export default app;
