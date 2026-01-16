# User Management Dashboard - Code Review Assessment

**Difficulty Level:** Mid-level SWE
**Tech Stack:** React, TypeScript, Vite
**Time Estimate:** 30 minutes

## Context

This is a user management dashboard component that allows administrators to view, filter, and manage users in the system. The component displays a list of users with their details, provides search and role filtering capabilities, and allows administrators to delete users or change their roles.

The code was written by a teammate who has moderate React experience but is still learning best practices around state management, async operations, and component design.

## Setup

Before starting the review, get the code running:

```bash
cd examples/mid-level/react-user-list
npm install
npm run dev
```

The application will be available at http://localhost:3000

You should see a user management dashboard with a table of users. Try:
- Searching for users by name or email
- Filtering by role using the dropdown
- Changing a user's role
- Deleting a user
- Clicking the "Refresh" button

### Run tests

```bash
npm test
```

You may notice some tests pass while others fail or are flaky. This is intentional.

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
- `code/components/UserList.tsx` - Main component with user management logic

Supporting files (already provided, light review):
- `code/api/userApi.ts` - Mock API for user operations
- `code/__tests__/UserList.test.tsx` - Test suite
- `code/App.tsx` - Application entry point
- `code/App.css` - Styles

---

**Note:** Please record your screen and face during the review. Talk through your thought process as you would in a real code review session.
