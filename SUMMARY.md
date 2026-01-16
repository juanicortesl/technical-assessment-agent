# ✅ Project Complete!

## What This Is

A collection of **5 complete, runnable code review assessments** for practicing software engineering interviews.

Each assessment:
- ✅ Installs and runs (`npm install && npm start`)
- ✅ Contains 8-12 intentional bugs
- ✅ Feels like real production code
- ✅ Takes ~30 minutes to review
- ✅ Includes tests, README, and evaluation rubric

## What's Included

```
examples/
├── mid-level/
│   ├── api-endpoint-review/        ✅ Tested & working
│   └── react-component-review/     ✅ Tested & working
├── senior/
│   ├── data-pipeline-review/       ✅ Tested & working
│   └── auth-system-review/         ✅ Tested & working
└── staff/
    └── microservice-review/        ✅ Tested & working
```

## Quick Start

```bash
# Pick one
cd examples/mid-level/api-endpoint-review

# Run it
npm install
npm start
npm test
```

## Documentation

- **README.md** - Main documentation for users
- **QUICKSTART.md** - Fast-start guide
- **EXAMPLES.md** - Detailed guide for all 5 assessments
- **CLAUDE.md** - Instructions for AI to generate new assessments

## For Users

**To use existing assessments:**
1. Navigate to any example directory
2. Run `npm install && npm start`
3. Review the code for 30 minutes
4. Check RUBRIC.md to see what you missed

**To generate new assessments:**
In Claude Code, say:
```
Generate a senior-level assessment for a REST API with race conditions
```

## For AI Agents (Claude Code)

When asked to generate new assessments, follow the guidelines in **CLAUDE.md**:
1. Create complete, runnable project
2. Include 8-12 intentional bugs
3. Make code feel realistic
4. Test that it runs
5. Provide README + RUBRIC

## All Tests Passed ✅

- Mid-level API: Server works, tests show bugs ✅
- Mid-level React: Vite server works, tests show bugs ✅
- Senior Pipeline: CSV import works ✅
- Senior Auth: JWT tokens work ✅
- Staff Microservice: Order creation works ✅
