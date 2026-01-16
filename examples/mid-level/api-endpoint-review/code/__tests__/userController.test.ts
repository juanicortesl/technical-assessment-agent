import request from 'supertest';
import app from '../server';
import { db } from '../database';

describe('User Registration API', () => {
  beforeEach(() => {
    db.reset();
  });

  describe('POST /api/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('userId');
    });

    it('should reject duplicate email', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
        });

      const response = await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'different',
          username: 'different',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
        });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Login successful');
    });

    it('should reject invalid password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });

    it('should reject non-existent user', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(404);
    });
  });
});
