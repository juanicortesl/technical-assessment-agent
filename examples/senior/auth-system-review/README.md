# JWT Authentication System

**Difficulty Level:** Senior SWE
**Tech Stack:** Node.js Backend API
**Time Estimate:** 30 minutes

## Context

A teammate has implemented a JWT-based authentication system for our API. It includes token generation, validation middleware, and refresh token functionality.

## Setup

Before starting the review, get the code running:

```bash
npm install
npm start
```

The server will start on http://localhost:3000

### Test the endpoints

```bash
# Get tokens
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"email":"test@example.com"}'

# Use access token (replace TOKEN with actual token from above)
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer TOKEN"
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

Pay special attention to: security, token lifecycle, error handling, and scalability.

## Files to Review

- `authService.ts`

---

**Note:** Please record your screen and face during the review. Talk through your thought process as you would in a real code review session.
