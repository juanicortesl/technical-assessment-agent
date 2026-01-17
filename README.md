# Technical Assessment Agent

Practice software engineering code review assessments. Designed to simulate real hiring take-home evaluations used by top-tier startups and talent agencies.

## Overview

This project provides **5 complete, runnable code review assessments** to help candidates practice:
- Code comprehension
- Engineering judgment
- Communication clarity
- Ability to reason about tradeoffs

**All assessments are complete Node.js projects.** Candidates can install dependencies, run the code, modify it, and test their changes - just like a real code review.

Assessments are designed for 30-minute recorded code reviews where candidates walk through code, identify issues, and explain their reasoning.

## Quick Start

```bash
# Pick an assessment
cd examples/mid-level/api-endpoint-review

# Install and run
npm install
npm start  # Starts the server
npm test   # Runs test suite
```

## Available Assessments

### Mid-level (2 assessments)
- **`examples/mid-level/api-endpoint-review/`** - User registration API with security issues (SQL injection, missing validation, etc.)
- **`examples/mid-level/react-component-review/`** - Product list component with React bugs (mutation, hooks issues, etc.)

### Senior (2 assessments)
- **`examples/senior/data-pipeline-review/`** - Batch processing with concurrency issues (race conditions, N+1 queries, etc.)
- **`examples/senior/auth-system-review/`** - JWT auth system with security gaps (hard-coded secrets, no token rotation, etc.)

### Staff (1 assessment)
- **`examples/staff/microservice-review/`** - Order processing service with architectural issues (distributed transactions, price manipulation, etc.)

## How to Use

### For Candidates (Practice)

1. Choose an assessment matching your level
2. Install dependencies: `npm install`
3. Run the code: `npm start`
4. Review the code for 30 minutes
5. Record yourself explaining:
   - What the code does
   - Issues you identify (prioritized by severity)
   - Suggested improvements and tradeoffs
   - Questions for the author
   - What you'd leave unchanged and why

### For Evaluators (Hiring)

1. Share an assessment directory with the candidate
2. Ask them to record their review (screen + face)
3. Use the rubric in `rubrics/[level]/[assessment-name].md` to evaluate their response
4. Look for:
   - Issue prioritization (critical vs minor)
   - Clear explanations of tradeoffs
   - What they intentionally leave unchanged
   - Red flags (missing security issues, nitpicking style)

See [EXAMPLES.md](./EXAMPLES.md) for detailed setup instructions for each assessment.

## Assessment Structure

Each assessment includes:

```
examples/[level]/assessment-name/
├── package.json              # Dependencies and npm scripts
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Test configuration
├── README.md                 # Candidate instructions
└── code/
    ├── [main-file].ts(x)     # Code to review
    ├── server.ts             # Runnable server/app
    ├── database.ts           # Mock database
    └── __tests__/
        └── *.test.ts(x)      # Test suite

rubrics/[level]/assessment-name.md  # Evaluation guide (keep private)
```

### For Candidates (README.md)
- Context about the code
- Setup instructions (npm install, npm start)
- curl/browser test commands
- 30-minute time estimate
- Guidance on what to discuss

### For Evaluators (Rubric)
- Priority issues to identify
- What strong/average/weak candidates notice
- Red flags in reasoning
- Complete list of embedded issues (8-12 per assessment)
- Located in `rubrics/[level]/[assessment-name].md`

## Difficulty Levels

### Mid-level SWE
Focus on:
- Obvious bugs and security issues
- Basic architectural problems
- Error handling gaps
- Performance issues

**Example issues:** SQL injection, missing validation, synchronous I/O blocking

### Senior SWE
Focus on:
- Concurrency and race conditions
- Data consistency
- Security vulnerabilities
- Scalability concerns
- Tradeoff discussions

**Example issues:** Race conditions, N+1 queries, missing transactions, hard-coded secrets

### Staff-level SWE
Focus on:
- Distributed systems problems
- Architectural decisions
- Operational concerns
- What NOT to change (prioritization)
- System design tradeoffs

**Example issues:** Saga patterns, idempotency, price manipulation, fire-and-forget failures

## Design Principles

1. **Realism**: Code feels like real production code, not toy examples
2. **Multiple Issues**: 8-12 issues across different dimensions
3. **No Solutions**: Rubrics guide evaluation but never provide fixes
4. **Time-boxed**: All assessments reviewable in ~30 minutes
5. **Runnable**: All projects install and run successfully (despite bugs!)
6. **Prioritization**: Strong candidates identify critical vs minor issues

## Issue Categories

Assessments embed issues across these dimensions:
- Architecture & Abstraction
- Coupling & Cohesion
- Async Logic & Concurrency
- Error Handling
- Security & Data Validation
- Performance & Scalability
- Naming & Readability
- Testability
- Domain Modeling
- Over/Under Engineering

## Tips for Success

### For Candidates
- **Run the code** - Don't just read it
- **Prioritize ruthlessly** - Focus on critical issues first
- **Explain tradeoffs** - "This approach is simpler but less secure because..."
- **Ask questions** - "What's the expected scale?" "Is this customer-facing?"
- **Know what to leave** - Over-engineering is a red flag

### For Evaluators
- **Focus on reasoning** - How they think matters more than what they find
- **Watch for prioritization** - Do they tackle critical issues first?
- **Listen for tradeoffs** - Do they explain pros/cons of solutions?
- **Note what they skip** - Staff engineers know what NOT to fix
- **Use the rubric** - Calibrate against strong/weak candidate patterns

---

## Creating New Assessments

Want to generate a custom assessment? Use Claude Code to create one for you!

### Quick Start

In Claude Code, just say:

```
Generate a new senior-level assessment for a REST API with authentication issues
```

or

```
Create a mid-level React assessment focused on state management bugs
```

### What You'll Get

Claude will create a complete, runnable assessment with:
- ✅ All necessary files (package.json, tests, etc.)
- ✅ Working code with intentional bugs
- ✅ README with setup instructions
- ✅ Rubric with evaluation criteria (in separate `rubrics/` folder)
- ✅ 8-12 embedded issues across multiple categories

### Customization Options

Be specific about what you want:

**Difficulty Level:**
- "Mid-level" - Basic bugs, security issues, error handling
- "Senior" - Concurrency, race conditions, scalability
- "Staff" - Distributed systems, architectural decisions

**Tech Stack:**
- Node.js API (Express, REST, GraphQL)
- React Frontend (hooks, state, performance)
- Data Processing (CSV, batch jobs, streams)
- Auth Systems (JWT, OAuth, sessions)
- Microservices (distributed transactions, messaging)

**Focus Areas:**
- Security (injection, validation, secrets)
- Performance (N+1, caching, memory)
- Concurrency (race conditions, deadlocks)
- Architecture (coupling, abstractions, patterns)

### Example Prompts

```
"Create a staff-level assessment about payment processing with focus on
distributed transactions and idempotency"
```

```
"Generate a mid-level Next.js assessment with server-side rendering bugs"
```

```
"Make a senior assessment for a data pipeline with concurrency and
error handling issues"
```

### After Generation

Claude will:
1. Create all files in `examples/[level]/[name]/`
2. Create the rubric in `rubrics/[level]/[name].md`
3. Test that `npm install` and `npm start` work
4. Verify tests run (some passing, some failing)
5. Provide you with the assessment location

Then you can:
```bash
cd examples/[level]/[assessment-name]
npm install
npm start
```

See [CLAUDE.md](./CLAUDE.md) for detailed generation guidelines.

## License

MIT
