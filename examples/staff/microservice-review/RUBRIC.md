# Evaluation Rubric

**⚠️ This file is for evaluators only. Do not share with candidates.**

---

## Priority Issues to Identify

- Client can set arbitrary prices (CRITICAL SECURITY)
- Fire-and-forget loses order processing failures
- No distributed transaction handling (saga pattern needed)
- No idempotency - duplicate requests create duplicate charges
- In-memory state breaks in multi-instance deployment
- No retry or dead letter queue for failed orders

---

## Strong Candidates

Strong candidates typically:

- Identify this as a distributed transaction problem and suggest saga pattern
- Recognize the fire-and-forget pattern loses critical failures
- Notice the client can manipulate prices (severe security flaw)
- Explain why in-memory deduplication breaks in multi-instance deployment
- Discuss the need for idempotency keys
- Suggest message queue or event sourcing for reliability
- Recognize that EventEmitter is reasonable for this use case (what NOT to change)
- Prioritize the payment/rollback issue as highest severity
- Ask about operational concerns: monitoring, retries, alerting

---

## Average Candidates

Average candidates typically:

- Notice error handling gaps
- Point out the price manipulation issue
- Mention the lack of retries
- May miss the distributed transaction problem
- Focus on tactical issues over strategic architecture

---

## Weak Candidates

Weak candidates typically:

- Focus on code style or naming
- Miss the price manipulation vulnerability
- Cannot explain distributed transactions
- Suggest rewriting everything without clear reasoning
- Focus on micro-optimizations like batching inserts

---

## Red Flags

Watch out for these concerning behaviors:

- Suggests adding transactions without understanding distributed systems
- Claims "just use a database transaction" for cross-service calls
- Wants to refactor to classes/interfaces without addressing bugs
- Cannot articulate the tradeoffs of async processing
- Focuses on TypeScript strictness over architectural issues
- Suggests complete rewrite without incremental improvement path

---

## Embedded Issues

This assessment contains 11 intentional issues:

### architecture (critical)
Fire-and-forget async processing loses failures - no retry or dead letter queue
Lines: 90

### async-concurrency (critical)
Race condition: order can be returned as "pending" but fail milliseconds later with no way to notify client
Lines: 91

### error-handling (critical)
Payment charged but if notification fails, no compensation/rollback mechanism
Lines: 164

### architecture (major)
Distributed transaction without saga pattern - partial failures leave system in inconsistent state

### security (major)
Price comes from client request - client can set arbitrary prices
Lines: 56

### performance (major)
In-memory processing map not shared across instances - load balancer breaks duplicate detection
Lines: 32

### over-engineering (minor)
EventEmitter pattern adds complexity without clear benefit - could use simple callbacks
Lines: 27

### architecture (major)
No idempotency key - duplicate requests create duplicate orders

### error-handling (major)
Generic catch swallows all errors including network timeouts - should differentiate retriable vs non-retriable errors
Lines: 173

### testability (minor)
Clients instantiated in constructor make unit testing difficult
Lines: 34

### performance (minor)
Sequential order item inserts could be batched
Lines: 72
