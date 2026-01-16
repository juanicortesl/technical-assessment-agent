# Order Processing Microservice

**Difficulty Level:** Staff-level SWE
**Tech Stack:** Node.js Backend API
**Time Estimate:** 30 minutes

## Context

A teammate has designed a new order processing service that handles order creation, inventory reservation, payment processing, and notification. This service is part of a larger microservices architecture and will handle thousands of orders per hour.

## Setup

Before starting the review, get the code running:

```bash
npm install
npm start
```

The server will start on http://localhost:3000

### Test the service

```bash
# Create an order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 123,
    "items": [
      {"productId": 1, "quantity": 2, "price": 29.99},
      {"productId": 2, "quantity": 1, "price": 49.99}
    ],
    "paymentMethodId": "pm_12345"
  }'

# Get order status
curl http://localhost:3000/api/orders/1
```

### Run tests

```bash
npm test
```

## Instructions

You have 30 minutes to review this code.

Imagine this is a pull request from a senior engineer. Talk through:

- What the code does and the architectural decisions made
- Major concerns or issues you identify
- Suggested improvements and the tradeoffs involved
- Questions you would ask the author
- What you would intentionally LEAVE UNCHANGED and why

This is staff-level: prioritize ruthlessly, consider operational concerns, and think about what NOT to change.

## Files to Review

- `orderService.ts`

---

**Note:** Please record your screen and face during the review. Talk through your thought process as you would in a real code review session.
