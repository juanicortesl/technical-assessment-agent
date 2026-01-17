# Evaluation Rubric

**⚠️ This file is for evaluators only. Do not share with candidates.**

---

## Priority Issues to Identify

- Race condition in concurrent stock updates (CRITICAL)
- Missing transaction boundaries causing data inconsistency
- N+1 query performance problem
- File deleted before processing completes
- Memory issues with large files
- No idempotency - duplicate runs cause issues

---

## Strong Candidates

Strong candidates typically:

- Identify the race condition in stock updates and suggest SELECT FOR UPDATE or transactions
- Recognize the N+1 query problem and suggest bulk operations or batching
- Notice the lack of transaction boundaries causing data inconsistency
- Explain the memory issue with large CSV files and suggest streaming
- Discuss the file deletion timing bug
- Suggest implementing idempotency with job tracking
- Prioritize correctness issues over performance optimizations

---

## Average Candidates

Average candidates typically:

- Notice the performance issue but may not suggest specific solutions
- Point out error handling gaps
- Mention the lack of validation
- May miss the race condition

---

## Weak Candidates

Weak candidates typically:

- Focus on code style instead of concurrency issues
- Miss the race condition entirely
- Cannot explain why transactions are needed
- Suggest adding logging instead of fixing bugs

---

## Red Flags

Watch out for these concerning behaviors:

- Claims the code is "production ready"
- Cannot explain what a race condition is
- Suggests adding more console.logs for debugging
- Does not prioritize data consistency issues
- Focuses on renaming variables or adding comments

---

## Embedded Issues

This assessment contains 10 intentional issues:

### async-concurrency (critical)
Race condition: reading stock and updating in separate queries allows concurrent updates to overwrite each other
Lines: 45, 51

### performance (critical)
N+1 query problem: each product requires 2-3 database queries
Lines: 29

### error-handling (major)
No transaction: partial failures leave database in inconsistent state

### error-handling (major)
Silent failures: invalid products are skipped without tracking
Lines: 41

### async-concurrency (major)
File deletion happens immediately after processing starts, not after success
Lines: 77

### performance (major)
Loading entire CSV into memory before processing - will fail on large files
Lines: 16

### error-handling (major)
No retry mechanism for failed database operations

### testability (minor)
Synchronous file system operations block event loop
Lines: 73, 77

### architecture (major)
No idempotency: running import twice causes duplicate inventory history entries

### readability (minor)
No validation for required fields (sku, name)
