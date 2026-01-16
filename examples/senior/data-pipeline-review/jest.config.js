module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/code'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'code/**/*.ts',
    '!code/**/*.test.ts',
    '!code/server.ts',
  ],
};
