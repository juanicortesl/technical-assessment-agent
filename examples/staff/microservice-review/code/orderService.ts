import { EventEmitter } from 'events';
import { db } from './database';
import { InventoryClient } from './clients/inventoryClient';
import { PaymentClient } from './clients/paymentClient';
import { NotificationClient } from './clients/notificationClient';

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface CreateOrderRequest {
  customerId: number;
  items: OrderItem[];
  paymentMethodId: string;
}

interface Order {
  id: number;
  customerId: number;
  status: 'pending' | 'confirmed' | 'failed';
  total: number;
  items: OrderItem[];
  paymentMethodId?: string;
}

export class OrderService extends EventEmitter {
  private inventoryClient: InventoryClient;
  private paymentClient: PaymentClient;
  private notificationClient: NotificationClient;
  private processingOrders: Map<number, Promise<void>>;

  constructor() {
    super();
    this.inventoryClient = new InventoryClient({
      baseUrl: process.env.INVENTORY_SERVICE_URL!,
      timeout: 5000,
    });
    this.paymentClient = new PaymentClient({
      baseUrl: process.env.PAYMENT_SERVICE_URL!,
      timeout: 10000,
    });
    this.notificationClient = new NotificationClient({
      baseUrl: process.env.NOTIFICATION_SERVICE_URL!,
      timeout: 3000,
    });
    this.processingOrders = new Map();
  }

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    // Validate request
    if (!request.items || request.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // Calculate total
    const total = request.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order in database
    const orderResult = await db.query(
      `INSERT INTO orders (customer_id, status, total, created_at)
       VALUES ($1, 'pending', $2, NOW())
       RETURNING id`,
      [request.customerId, total]
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of request.items) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    const order: Order = {
      id: orderId,
      customerId: request.customerId,
      status: 'pending',
      total,
      items: request.items,
      paymentMethodId: request.paymentMethodId,
    };

    // Process order asynchronously
    this.processOrder(order).catch((error) => {
      console.error(`Failed to process order ${orderId}:`, error);
    });

    return order;
  }

  private async processOrder(order: Order): Promise<void> {
    // Check if already processing
    if (this.processingOrders.has(order.id)) {
      return;
    }

    const processingPromise = this._processOrder(order);
    this.processingOrders.set(order.id, processingPromise);

    try {
      await processingPromise;
    } finally {
      this.processingOrders.delete(order.id);
    }
  }

  private async _processOrder(order: Order): Promise<void> {
    try {
      // Step 1: Reserve inventory
      const reservationPromises = order.items.map((item) =>
        this.inventoryClient.reserve({
          productId: item.productId,
          quantity: item.quantity,
          orderId: order.id,
        })
      );

      const reservations = await Promise.all(reservationPromises);

      const allReserved = reservations.every((r) => r.success);
      if (!allReserved) {
        await this.updateOrderStatus(order.id, 'failed');
        this.emit('order:failed', { orderId: order.id, reason: 'inventory' });
        return;
      }

      // Step 2: Process payment
      const paymentResult = await this.paymentClient.charge({
        amount: order.total,
        paymentMethodId: order.paymentMethodId!,
        orderId: order.id,
      });

      if (!paymentResult.success) {
        // Release inventory
        await Promise.all(
          reservations.map((r) =>
            this.inventoryClient.release({ reservationId: r.reservationId })
          )
        );
        await this.updateOrderStatus(order.id, 'failed');
        this.emit('order:failed', { orderId: order.id, reason: 'payment' });
        return;
      }

      // Step 3: Confirm order
      await this.updateOrderStatus(order.id, 'confirmed');

      // Step 4: Send notification
      this.notificationClient
        .sendOrderConfirmation({
          customerId: order.customerId,
          orderId: order.id,
        })
        .catch((error) => {
          console.error('Failed to send notification:', error);
        });

      this.emit('order:confirmed', { orderId: order.id });
    } catch (error) {
      console.error(`Error processing order ${order.id}:`, error);
      await this.updateOrderStatus(order.id, 'failed');
      this.emit('order:failed', { orderId: order.id, reason: 'unknown' });
    }
  }

  private async updateOrderStatus(
    orderId: number,
    status: 'pending' | 'confirmed' | 'failed'
  ): Promise<void> {
    await db.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
      [status, orderId]
    );
  }

  async getOrder(orderId: number): Promise<Order | null> {
    const result = await db.query(
      `SELECT o.id, o.customer_id, o.status, o.total,
              json_agg(json_build_object(
                'productId', oi.product_id,
                'quantity', oi.quantity,
                'price', oi.price
              )) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [orderId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}
