# Evaluation Rubric

**⚠️ This file is for evaluators only. Do not share with candidates.**

---

## Priority Issues to Identify

- SQL injection in all queries (CRITICAL)
- Missing return statement causing double response
- Exposed password hash in login response
- Synchronous bcrypt blocking event loop
- No input validation

---

## Strong Candidates

Strong candidates typically:

- Immediately identify the SQL injection vulnerabilities as critical
- Explain the difference between bcrypt.hash (async) vs bcrypt.hashSync
- Notice the missing return statement bug that causes double responses
- Discuss the security implications of exposing user data in responses
- Suggest using parameterized queries or an ORM
- Prioritize security issues over style issues

---

## Average Candidates

Average candidates typically:

- Notice some security issues but miss SQL injection
- Point out error handling gaps
- Mention inconsistent response formats
- May focus too much on minor style issues

---

## Weak Candidates

Weak candidates typically:

- Miss the SQL injection vulnerability entirely
- Focus only on formatting or naming
- Fail to recognize the missing return statement bug
- Do not prioritize issues by severity

---

## Red Flags

Watch out for these concerning behaviors:

- Suggests adding comments instead of fixing security issues
- Claims code is "mostly fine" despite critical vulnerabilities
- Cannot explain why SQL injection is dangerous
- Proposes refactoring before fixing bugs

---

## Embedded Issues

This assessment contains 8 intentional issues:

### security (critical)
SQL injection vulnerability in all database queries
Lines: 8, 18, 35

### error-handling (major)
No try-catch blocks for async operations

### security (critical)
Password sent in plain text response and exposed in user object
Lines: 48

### readability (minor)
Inconsistent error response formats (some send strings, some JSON)
Lines: 12, 38, 43, 46

### async-concurrency (major)
Using synchronous bcrypt methods blocks event loop
Lines: 16, 41

### security (major)
No input validation for email format, password strength, or required fields

### error-handling (major)
Missing return statement in loginUser error case allows execution to continue
Lines: 43

### security (major)
Information disclosure - different error messages reveal whether email exists
Lines: 38, 43
