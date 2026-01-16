export class PaymentClient {
  constructor(private config: { baseUrl: string; timeout: number }) {}

  async charge(params: { amount: number; paymentMethodId: string; orderId: number }) {
    // Mock implementation
    return {
      success: true,
      transactionId: Math.random().toString(36).substr(2, 9),
    };
  }
}
