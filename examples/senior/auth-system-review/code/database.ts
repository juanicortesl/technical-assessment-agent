export const db = {
  _users: [] as any[],

  query: async (sql: string, params?: any[]) => {
    if (sql.includes('SELECT') && sql.includes('users')) {
      const userId = params?.[0];
      const rows = db._users.filter((u: any) => u.id === userId);
      return { rows };
    }
    return { rows: [] };
  },

  reset: () => {
    db._users = [{
      id: 1,
      email: 'test@example.com',
      active: true,
    }];
  },
};

db.reset();
