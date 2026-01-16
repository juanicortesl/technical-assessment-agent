# Batch Data Processing Pipeline

**Difficulty Level:** Senior SWE
**Tech Stack:** Node.js Backend API
**Time Estimate:** 30 minutes

## Context

## Setup

Before starting the review, get the code running:

```bash
npm install

# Create a sample CSV file
npm start create-sample

# Import the sample
npm start import imports/sample-products.csv
```

### Run tests

```bash
npm test
```


A teammate has implemented a batch processing system that imports product data from external CSV files, validates the data, and updates our database. This runs as a scheduled job every hour to sync product inventory.

## Instructions

You have 30 minutes to review this code.

Imagine this is a pull request from a teammate. Talk through:

- What the code does and how it works
- Major concerns or issues you identify
- Suggested improvements and tradeoffs
- Questions you would ask the author
- What you would leave unchanged and why

Pay special attention to: concurrency, error handling, data consistency, and scalability.

## Files to Review

- `productImporter.ts`

---

**Note:** Please record your screen and face during the review. Talk through your thought process as you would in a real code review session.
