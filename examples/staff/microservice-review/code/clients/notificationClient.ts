export class NotificationClient {
  constructor(private config: { baseUrl: string; timeout: number }) {}

  async sendOrderConfirmation(params: { customerId: number; orderId: number }) {
    return { success: true };
  }
}
