# Evaluation Rubric

**⚠️ This file is for evaluators only. Do not share with candidates.**

---

## Priority Issues to Identify

- Hard-coded JWT secret (CRITICAL)
- No refresh token storage/rotation (CRITICAL)
- Non-functional logout
- No token revocation mechanism
- Missing rate limiting

---

## Strong Candidates

Strong candidates typically:

- Immediately flag the hard-coded JWT secret as critical
- Explain why refresh tokens need to be stored and rotated
- Recognize that logout is non-functional without token blacklisting
- Discuss tradeoffs between stateless JWT and revocation needs
- Suggest implementing refresh token families or rotation
- Mention rate limiting and brute force protection
- Understand the architecture issue of mixing concerns

---

## Average Candidates

Average candidates typically:

- Notice the hard-coded secret
- Point out that logout does nothing
- May not fully understand refresh token security
- Mention error handling

---

## Weak Candidates

Weak candidates typically:

- Miss the refresh token security issues
- Focus on code organization over security
- Cannot explain JWT security model
- Suggest adding comments instead of fixing issues

---

## Red Flags

Watch out for these concerning behaviors:

- Claims JWT is "stateless so it's fine"
- Does not recognize hard-coded secrets as critical
- Suggests storing passwords in JWT
- Cannot explain the difference between access and refresh tokens
- Dismisses logout functionality as "not needed"

---

## Embedded Issues

This assessment contains 9 intentional issues:

### security (critical)
Hard-coded JWT secret in source code
Lines: 5

### security (critical)
No refresh token rotation - once compromised, valid until expiry
Lines: 51

### security (critical)
No refresh token storage/tracking - cannot revoke tokens

### security (major)
Logout does nothing - tokens remain valid until expiry
Lines: 76

### security (major)
No rate limiting on token refresh - vulnerable to brute force

### error-handling (major)
Generic error messages leak no information but also make debugging hard
Lines: 46, 73

### security (minor)
No validation that email in token matches database

### architecture (major)
Mixing authentication concerns with database queries - should be separated

### testability (minor)
Global constants make testing difficult
