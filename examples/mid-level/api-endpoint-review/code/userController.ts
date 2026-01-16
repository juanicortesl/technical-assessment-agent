import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from './database';

export async function registerUser(req: Request, res: Response) {
  const { email, password, username } = req.body;

  // Check if user exists
  const existingUser = await db.query(
    'SELECT * FROM users WHERE email = ' + email
  );

  if (existingUser.rows.length > 0) {
    return res.status(400).send('User already exists');
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create user
  const result = await db.query(
    `INSERT INTO users (email, password, username, created_at)
     VALUES ('${email}', '${hashedPassword}', '${username}', NOW())
     RETURNING id`
  );

  const userId = result.rows[0].id;

  res.status(201).json({
    message: 'User created successfully',
    userId: userId,
  });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await db.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );

  if (user.rows.length === 0) {
    return res.status(404).send('User not found');
  }

  const validPassword = bcrypt.compareSync(password, user.rows[0].password);

  if (!validPassword) {
    res.status(401).send('Invalid password');
  }

  res.json({
    message: 'Login successful',
    user: user.rows[0],
  });
}
