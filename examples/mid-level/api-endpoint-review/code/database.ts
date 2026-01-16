import { Pool } from 'pg';

// Simple in-memory database mock for the exercise
// In production, this would connect to a real PostgreSQL database
export const db = {
  _users: [] as any[],
  _nextId: 1,

  query: async (sql: string, params?: any[]) => {
    // Mock implementation for demonstration
    // This simulates a database but keeps the SQL injection vulnerability visible

    if (sql.includes('SELECT') && sql.includes('users')) {
      // Simulate user lookup
      const rows = db._users.filter((u: any) => {
        // This mock doesn't actually execute the SQL, but allows the code to run
        return true;
      });
      return { rows };
    }

    if (sql.includes('INSERT') && sql.includes('users')) {
      // Simulate user creation
      const newUser = {
        id: db._nextId++,
        email: params?.[0] || 'unknown',
        password: params?.[1] || '',
        username: params?.[2] || 'user',
        created_at: new Date(),
      };
      db._users.push(newUser);
      return { rows: [newUser] };
    }

    return { rows: [] };
  },

  // Helper to reset database for testing
  reset: () => {
    db._users = [];
    db._nextId = 1;
  },
};
