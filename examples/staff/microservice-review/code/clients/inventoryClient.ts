export class InventoryClient {
  constructor(private config: { baseUrl: string; timeout: number }) {}

  async reserve(params: { productId: number; quantity: number; orderId: number }) {
    // Mock implementation
    return {
      success: true,
      reservationId: Math.random().toString(36).substr(2, 9),
    };
  }

  async release(params: { reservationId: string }) {
    return { success: true };
  }
}
