# Quick Start Guide

## Pick an Assessment

Choose based on your level:

- **Mid-level:** `examples/mid-level/api-endpoint-review/` or `react-component-review/`
- **Senior:** `examples/senior/data-pipeline-review/` or `auth-system-review/`
- **Staff:** `examples/staff/microservice-review/`

## Run It

```bash
cd examples/mid-level/api-endpoint-review
npm install
npm start  # Starts the server
npm test   # Runs tests
```

## Review It (30 minutes)

Record yourself (screen + face) explaining:

1. **What the code does** - Walk through the logic
2. **Issues you identify** - Prioritize critical → minor
3. **Suggested improvements** - With tradeoffs explained
4. **Questions for the author** - What's unclear?
5. **What you'd leave unchanged** - Why?

## Assessment Cheat Sheet

### Mid-level: API Endpoint Review
```bash
cd examples/mid-level/api-endpoint-review
npm install && npm start
# Test: curl -X POST http://localhost:3000/api/register -d '{"email":"test@test.com","password":"test123","username":"testuser"}' -H "Content-Type: application/json"
```
**Look for:** SQL injection, validation, error handling

---

### Mid-level: React Component Review
```bash
cd examples/mid-level/react-component-review
npm install && npm run dev
# Open: http://localhost:5173
```
**Look for:** Hooks issues, mutations, performance

---

### Senior: Data Pipeline Review
```bash
cd examples/senior/data-pipeline-review
npm install
npm start create-sample
npm start import imports/sample-products.csv
```
**Look for:** Race conditions, N+1 queries, transactions

---

### Senior: Auth System Review
```bash
cd examples/senior/auth-system-review
npm install && npm start
# Test: curl -X POST http://localhost:3000/api/auth/login -d '{"userId":1,"email":"test@example.com"}' -H "Content-Type: application/json"
```
**Look for:** Hard-coded secrets, token rotation, logout

---

### Staff: Microservice Review
```bash
cd examples/staff/microservice-review
npm install && npm start
# Test: curl -X POST http://localhost:3000/api/orders -d '{"customerId":123,"items":[{"productId":1,"quantity":2,"price":29.99}],"paymentMethodId":"pm_123"}' -H "Content-Type: application/json"
```
**Look for:** Price manipulation, distributed transactions, idempotency

---

## Tips

### For Candidates
- **Run the code first** - Understanding beats guessing
- **Prioritize ruthlessly** - Critical bugs before style
- **Explain tradeoffs** - Every decision has pros/cons
- **Ask questions** - "What's the scale?" "Is this public-facing?"

### For Evaluators
- **Focus on reasoning** - How they think > what they find
- **Watch prioritization** - Do they tackle critical issues first?
- **Listen for tradeoffs** - Do they explain pros/cons?
- **Check the rubric** - RUBRIC.md shows strong/weak patterns

---

## What's in Each Assessment?

```
assessment/
├── README.md          # Candidate instructions
├── RUBRIC.md          # Evaluation guide (keep private)
├── package.json       # npm install, npm start, npm test
└── code/
    ├── [file].ts      # Code to review
    ├── server.ts      # Runnable server
    ├── database.ts    # Mock DB (no setup needed)
    └── __tests__/     # Test suite
```

All assessments:
- ✅ Run successfully (`npm start`)
- ✅ Have tests (`npm test`)
- ✅ Include 8-12 intentional issues
- ✅ Feel like real production code
- ✅ Take ~30 minutes to review

---

## Next Steps

1. **Try one yourself** - Start with mid-level
2. **Record your review** - Practice explaining your reasoning
3. **Check the rubric** - See what strong candidates notice
4. **Level up** - Try senior or staff assessments

See [README.md](./README.md) for full documentation.
