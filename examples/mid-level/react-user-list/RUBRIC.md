# Evaluation Rubric - User Management Dashboard

**⚠️ This file is for evaluators only. Do not share with candidates.**

---

## Priority Issues to Identify

### Critical Issues

1. **Missing error handling** (Critical)
   - `loadUsers()`, `handleDelete()`, and `handleRoleChange()` don't handle API failures
   - No user feedback when operations fail
   - Application could be in inconsistent state

2. **Race condition in async operations** (Critical)
   - `handleDelete()` and `handleRoleChange()` update local state immediately without waiting for API success
   - If API call fails, UI shows incorrect state
   - Could lead to data inconsistencies

3. **State mutation instead of immutability** (Major)
   - Line 37-42: `handleRoleChange` directly mutates user object: `user.role = newRole`
   - Violates React's immutability principle
   - Can cause rendering bugs and unpredictable behavior

### Major Issues

4. **Missing loading states for mutations** (Major)
   - Delete and role change operations have no loading feedback
   - Users might click multiple times, causing duplicate requests
   - Poor UX during slow network conditions

5. **No optimistic updates with rollback** (Major)
   - Component updates UI immediately but doesn't rollback on failure
   - Better pattern: optimistic update + rollback on error

6. **Stale closure in effect dependency** (Major)
   - `useEffect` on line 18 has empty dependency array but `loadUsers` isn't memoized
   - Violates React Hook rules
   - Could cause issues if `loadUsers` dependencies change

7. **Inefficient re-filtering on every render** (Minor-Major)
   - `filteredUsers` recalculates on every render
   - Should use `useMemo` for performance
   - Not critical for small lists but bad practice

8. **Missing confirmation for destructive actions** (Major)
   - Delete button has no confirmation dialog
   - Easy to accidentally delete users
   - Critical for production applications

### Minor Issues

9. **Missing accessibility attributes** (Minor)
   - No ARIA labels for interactive elements
   - Search input and filters lack proper accessibility
   - Table lacks proper semantic structure

10. **Hardcoded strings instead of constants** (Minor)
    - Role values ('admin', 'user', 'guest') are hardcoded throughout
    - Should be defined as constants or enums
    - Makes maintenance harder

11. **No debouncing on search input** (Minor)
    - Search filter runs on every keystroke
    - Could cause performance issues with larger datasets
    - Should debounce the search term

12. **Missing TypeScript type safety** (Minor)
    - `newRole` parameter in `handleRoleChange` is `string`, not a union type
    - Could allow invalid roles
    - Better: `type Role = 'admin' | 'user' | 'guest'`

---

## Strong Candidates

Strong candidates typically:

- **Identify the race condition** and explain why updating state before API completion is problematic
- **Recognize the state mutation** issue and explain React's immutability requirements
- **Prioritize error handling** as critical for production code
- **Discuss tradeoffs** between optimistic updates and waiting for API confirmation
- **Mention user experience** improvements (loading states, confirmation dialogs)
- **Explain the "why"** behind their suggestions, not just "what" to change
- **Acknowledge what's done well** (clear component structure, reasonable separation of concerns)
- **Don't nitpick** minor style issues when critical bugs exist
- **Ask clarifying questions** like "What's the expected behavior if the API fails?"
- **Consider scalability** (what happens with 10,000 users?)

Strong candidates might say:
- "The biggest issue I see is the race condition in handleDelete..."
- "I'd prioritize error handling first because..."
- "This mutation on line 39 violates React's core principle..."
- "I like that the API is properly abstracted, but..."

---

## Average Candidates

Average candidates typically:

- **Identify some issues** but miss the state mutation or race condition
- **Focus on minor issues** like missing debouncing before critical bugs
- **Suggest solutions** without explaining tradeoffs
- **List problems** without prioritizing by impact
- **Don't acknowledge** what's working well
- **Over-focus on style** (naming, formatting) instead of logic errors
- **Suggest adding dependencies** without understanding why they're needed

Average candidates might say:
- "We should add error handling" (without explaining the race condition)
- "The search should be debounced" (focusing on optimization before correctness)
- "We need better variable names" (missing critical bugs)
- "Add TypeScript types" (valid but lower priority)

---

## Weak Candidates

Weak candidates typically:

- **Miss critical issues** entirely (race conditions, state mutation, error handling)
- **Only identify surface-level problems** (CSS, naming, formatting)
- **Suggest complete rewrites** without understanding current code
- **Can't explain tradeoffs** of their suggestions
- **Don't understand React fundamentals** (why immutability matters, how effects work)
- **Provide vague feedback** like "this looks bad" without specifics
- **Get lost in the code** without identifying key problems
- **Focus on preferences** ("I would have done it differently") over objective issues

Weak candidates might say:
- "The CSS should be in a separate file"
- "I would rewrite this using Redux"
- "This code is messy" (without specifics)
- "We should use a UI library instead"

---

## Red Flags

Watch out for these concerning behaviors:

- **Doesn't understand React basics** (props, state, effects, immutability)
- **Can't identify the state mutation bug** - this is fundamental React knowledge
- **Focuses entirely on TypeScript types** while missing logic errors
- **Suggests premature optimization** (useMemo for small lists) before fixing bugs
- **Extremely nitpicky** about formatting while missing critical issues
- **Doesn't ask any clarifying questions** about requirements or context
- **Claims code is "perfect" or "terrible"** - lacks nuance
- **Can't articulate tradeoffs** between different approaches
- **Defensive or dismissive** of existing code without understanding it first
- **Rambles without structure** - can't prioritize or organize thoughts

---

## Embedded Issues

This assessment contains **12 intentional issues** across multiple categories:

### 1. Missing Error Handling (Critical)
**Category:** Reliability / Error Handling
**Lines:** 23-27, 30-32, 34-43
**Description:** All async operations (`loadUsers`, `handleDelete`, `handleRoleChange`) lack try-catch blocks or error handling. No user feedback when operations fail.
**Impact:** Application could crash or show incorrect data. Users have no idea when operations fail.

### 2. Race Condition in State Updates (Critical)
**Category:** Concurrency / Async Logic
**Lines:** 30-32, 34-43
**Description:** Component updates local state immediately before API call completes. If API fails, UI shows incorrect state that doesn't match backend.
**Impact:** Data inconsistency between frontend and backend. User thinks action succeeded when it failed.

### 3. Direct State Mutation (Major)
**Category:** React Fundamentals / Immutability
**Lines:** 37-42
**Description:** `user.role = newRole` directly mutates the user object instead of creating a new object. Violates React's immutability principle.
**Impact:** Can cause rendering bugs, unexpected behavior, and breaks React's optimization assumptions.

### 4. Missing Loading States for Mutations (Major)
**Category:** User Experience
**Lines:** 30-32, 34-43
**Description:** Delete and role change operations have no loading indicators. Users don't know if action is in progress.
**Impact:** Users might click multiple times causing duplicate requests. Poor UX during slow networks.

### 5. No Rollback Mechanism (Major)
**Category:** Error Handling / State Management
**Lines:** 30-32, 34-43
**Description:** Optimistic UI updates have no rollback when API fails.
**Impact:** UI shows incorrect state permanently after failures.

### 6. Effect Dependency Issue (Major)
**Category:** React Hooks
**Lines:** 18-20
**Description:** `useEffect` has empty dependency array but calls `loadUsers` which isn't stable. Violates exhaustive-deps ESLint rule.
**Impact:** Potential stale closures and unexpected behavior if loadUsers dependencies change.

### 7. Inefficient Filtering (Minor-Major)
**Category:** Performance
**Lines:** 45-50
**Description:** `filteredUsers` recalculates on every render instead of using `useMemo`.
**Impact:** Unnecessary computation on every render. Not critical for small lists but bad practice.

### 8. No Delete Confirmation (Major)
**Category:** User Experience / Safety
**Lines:** 30-32, 119-123
**Description:** Delete action has no confirmation dialog.
**Impact:** Users can accidentally delete data permanently.

### 9. Missing Accessibility (Minor)
**Category:** Accessibility
**Lines:** Throughout component
**Description:** No ARIA labels, keyboard navigation support, or screen reader hints.
**Impact:** Unusable for users with disabilities.

### 10. Hardcoded Magic Strings (Minor)
**Category:** Maintainability
**Lines:** 44, 49, 52-53, 81-86, 111-114
**Description:** Role values ('admin', 'user', 'guest') repeated throughout without constants.
**Impact:** Error-prone maintenance, easy to introduce typos.

### 11. No Search Debouncing (Minor)
**Category:** Performance / UX
**Lines:** 73-77
**Description:** Search input triggers filter on every keystroke.
**Impact:** Excessive re-renders with larger datasets. Should debounce search term.

### 12. Weak Type Safety (Minor)
**Category:** Type Safety
**Lines:** 34, 111
**Description:** `newRole` parameter is `string` instead of union type, allowing invalid values.
**Impact:** Could allow invalid roles, TypeScript doesn't catch errors at compile time.

---

## Evaluation Guidelines

**Scoring:**
- **Strong Pass:** Identifies 8+ issues including at least 2 critical ones, explains tradeoffs, prioritizes effectively
- **Pass:** Identifies 5+ issues including at least 1 critical, shows basic understanding of React
- **Weak Pass:** Identifies 3+ issues but misses all critical ones, focuses on minor issues
- **Fail:** Identifies fewer than 3 issues, doesn't understand React fundamentals, or shows concerning red flags

**Key Success Indicators:**
1. Identifies the state mutation bug (line 39)
2. Recognizes the race condition in async operations
3. Prioritizes error handling as critical
4. Explains the "why" behind suggestions
5. Asks clarifying questions about requirements
6. Acknowledges what's done well
7. Demonstrates React fundamentals understanding

**Time Management:**
- First 5 minutes: Understanding what the code does
- Next 15 minutes: Identifying issues
- Last 10 minutes: Prioritizing and explaining solutions

Good candidates spend more time on critical issues and less on minor styling concerns.
