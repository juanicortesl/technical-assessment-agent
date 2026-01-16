# Evaluation Rubric

**⚠️ This file is for evaluators only. Do not share with candidates.**

---

## Priority Issues to Identify

- Array mutation bug in sorting
- Missing products dependency in filter/sort useEffect
- No error handling for API call
- Performance issues from unnecessary re-computation

---

## Strong Candidates

Strong candidates typically:

- Identify the array mutation bug causing incorrect behavior
- Notice the missing products dependency in the second useEffect
- Suggest using useMemo for filter/sort operations
- Recommend proper error handling and loading states
- Explain the re-render implications of state updates

---

## Average Candidates

Average candidates typically:

- Notice the missing error handling
- Point out the alert() usage
- Mention the hard-coded URL
- May miss the mutation bug

---

## Weak Candidates

Weak candidates typically:

- Focus only on styling or component organization
- Miss the useEffect dependency issue
- Do not recognize the performance implications
- Suggest adding TypeScript when it already exists

---

## Red Flags

Watch out for these concerning behaviors:

- Claims component is well-structured without identifying bugs
- Cannot explain useEffect dependency arrays
- Suggests premature optimization without fixing bugs first
- Focuses on renaming variables instead of logic issues

---

## Embedded Issues

This assessment contains 7 intentional issues:

### error-handling (major)
No error handling for fetch request
Lines: 17

### performance (major)
Array.sort mutates the original array, causing unnecessary re-renders
Lines: 33, 35

### async-concurrency (major)
Missing dependency array in useEffect causes filtering to not re-run when products change
Lines: 25

### performance (minor)
No loading state shown while fetching products

### error-handling (minor)
Using alert() for user feedback is poor UX
Lines: 42

### testability (minor)
Hard-coded API URL makes testing difficult
Lines: 17

### performance (major)
Filter and sort operations run on every render instead of being memoized
