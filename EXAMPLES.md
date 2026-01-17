# Example Assessments

All examples are **complete, runnable Node.js projects**. Candidates can install dependencies, run the code, and test their changes.

## Quick Start

Each example includes:
- `package.json` - Dependencies and scripts
- `code/` - Source code to review
- `code/__tests__/` - Test suite
- `README.md` - Setup instructions and context

Evaluation rubrics are stored separately in `rubrics/[level]/[assessment-name].md` (keep private)

### Running an Example

```bash
cd examples/[level]/[example-name]
npm install
npm start        # Run the application
npm test         # Run tests
```

---

## Mid-Level Examples

### 1. API Endpoint Review
**Path:** `examples/mid-level/api-endpoint-review/`
**Focus:** User registration with security vulnerabilities

**Issues Embedded (8 total):**
- SQL injection (CRITICAL)
- Missing return statement bug
- Exposed password data
- Synchronous bcrypt blocking event loop
- No input validation
- Inconsistent error responses

**How to Run:**
```bash
cd examples/mid-level/api-endpoint-review
npm install
npm start
# Test: curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test123","username":"testuser"}'
```

---

### 2. React Component Review
**Path:** `examples/mid-level/react-component-review/`
**Focus:** Product list component with React bugs

**Issues Embedded (7 total):**
- Array mutation in sorting
- Missing useEffect dependencies
- No error handling for API
- No loading states
- Performance issues from re-computation

**How to Run:**
```bash
cd examples/mid-level/react-component-review
npm install
npm run dev
# Open browser: http://localhost:5173
```

---

## Senior-Level Examples

### 3. Data Pipeline Review
**Path:** `examples/senior/data-pipeline-review/`
**Focus:** Batch CSV processing with concurrency issues

**Issues Embedded (10 total):**
- Race conditions in stock updates (CRITICAL)
- N+1 query problem
- Missing transactions
- File deletion before processing completes
- Memory issues with large files
- No idempotency

**How to Run:**
```bash
cd examples/senior/data-pipeline-review
npm install
npm start create-sample
npm start import imports/sample-products.csv
```

---

### 4. Auth System Review
**Path:** `examples/senior/auth-system-review/`
**Focus:** JWT authentication with security gaps

**Issues Embedded (9 total):**
- Hard-coded JWT secret (CRITICAL)
- No refresh token rotation
- Non-functional logout
- No token revocation
- Missing rate limiting

**How to Run:**
```bash
cd examples/senior/auth-system-review
npm install
npm start
# Test: curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"userId":1,"email":"test@example.com"}'
```

---

## Staff-Level Example

### 5. Microservice Review
**Path:** `examples/staff/microservice-review/`
**Focus:** Order processing with distributed systems issues

**Issues Embedded (11 total):**
- Client can set arbitrary prices (CRITICAL SECURITY)
- Fire-and-forget loses failures
- No saga pattern for distributed transactions
- No idempotency keys
- In-memory state breaks in multi-instance deployment
- No retry/dead letter queue

**How to Run:**
```bash
cd examples/staff/microservice-review
npm install
npm start
# Test: curl -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -d '{"customerId":123,"items":[{"productId":1,"quantity":2,"price":29.99}],"paymentMethodId":"pm_123"}'
```

---

## Project Structure (Each Example)

```
examples/[level]/example-name/
├── package.json              # Dependencies and npm scripts
├── tsconfig.json             # TypeScript configuration
├── jest.config.js (or vite.config.ts)  # Test configuration
├── README.md                 # Candidate instructions
└── code/
    ├── [main-file].ts(x)     # Code to review
    ├── server.ts             # Server/app entry point
    ├── database.ts           # Mock database
    └── __tests__/
        └── *.test.ts(x)      # Test suite

rubrics/[level]/example-name.md  # Evaluation guide (private, separate folder)
```

---

## Testing Examples

### Verify Installation
```bash
# Test all examples can install
for dir in examples/*/*/; do
  echo "Testing: $dir"
  (cd "$dir" && npm install > /dev/null 2>&1 && echo "✓ Installed") || echo "✗ Failed"
done
```

### Run Specific Example
```bash
cd examples/mid-level/api-endpoint-review
npm test  # Run test suite
npm start # Start server
```

---

## Evaluation Tips

1. **Give candidates time to explore**
   - Let them run the code
   - Let them read tests
   - Let them make small changes to verify understanding

2. **Focus on reasoning**
   - How do they prioritize issues?
   - Do they explain tradeoffs?
   - Do they ask clarifying questions?

3. **Look for what they leave unchanged**
   - Staff-level candidates know what NOT to fix
   - Over-engineering is a red flag

4. **Use the rubric**
   - Located in `rubrics/[level]/[assessment-name].md`
   - See what strong candidates typically notice
   - Identify red flags in reasoning

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Run the application |
| `npm run dev` | Run with hot reload (if available) |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |

---

## Notes

- All examples use **mock databases** - no external DB setup required
- Examples are **intentionally flawed** - that's the point!
- Code **runs successfully** despite the bugs (most bugs are logical/architectural)
- READMEs include **curl commands** for testing
- Tests may **pass or fail** depending on the bugs embedded
