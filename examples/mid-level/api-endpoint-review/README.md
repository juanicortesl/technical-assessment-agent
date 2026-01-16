# User Registration API Endpoint

**Difficulty Level:** Mid-level SWE
**Tech Stack:** Node.js Backend API
**Time Estimate:** 30 minutes

## Context

A teammate has implemented a new user registration endpoint for our application. This endpoint handles user sign-ups, validates input, and creates new user accounts in the database.

## Setup

Before starting the review, get the code running:

```bash
npm install
npm start
```

The server will start on http://localhost:3000

### Test the endpoints

```bash
# Register a user
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Run tests

```bash
npm test
```

## Instructions

You have 30 minutes to review this code.

Imagine this is a pull request from a teammate. Talk through:

- What the code does and how it works
- Major concerns or issues you identify
- Suggested improvements and tradeoffs
- Questions you would ask the author
- What you would leave unchanged and why

Remember: Prioritize issues by impact. Not everything needs to be fixed.

## Files to Review

Primary focus:
- `code/userController.ts` - Main registration and login logic

Supporting files (already provided):
- `code/server.ts` - Express server setup
- `code/database.ts` - Database mock
- `code/__tests__/userController.test.ts` - Test suite

---

**Note:** Please record your screen and face during the review. Talk through your thought process as you would in a real code review session.
