export const db = {
  _orders: [] as any[],
  _orderItems: [] as any[],
  _nextOrderId: 1,

  query: async (sql: string, params?: any[]) => {
    if (sql.includes('INSERT') && sql.includes('orders')) {
      const [customerId, status, total] = params || [];
      const newOrder = {
        id: db._nextOrderId++,
        customer_id: customerId,
        status,
        total,
        created_at: new Date(),
      };
      db._orders.push(newOrder);
      return { rows: [newOrder] };
    }

    if (sql.includes('INSERT') && sql.includes('order_items')) {
      const [orderId, productId, quantity, price] = params || [];
      db._orderItems.push({ order_id: orderId, product_id: productId, quantity, price });
      return { rows: [] };
    }

    if (sql.includes('UPDATE') && sql.includes('orders')) {
      const [status, orderId] = params || [];
      const order = db._orders.find((o: any) => o.id === orderId);
      if (order) {
        order.status = status;
        order.updated_at = new Date();
      }
      return { rows: [] };
    }

    if (sql.includes('SELECT') && sql.includes('orders')) {
      const orderId = params?.[0];
      const order = db._orders.find((o: any) => o.id === orderId);
      if (!order) return { rows: [] };

      const items = db._orderItems.filter((i: any) => i.order_id === orderId);
      return {
        rows: [{
          ...order,
          items: items.map((i: any) => ({
            productId: i.product_id,
            quantity: i.quantity,
            price: i.price,
          })),
        }],
      };
    }

    return { rows: [] };
  },

  reset: () => {
    db._orders = [];
    db._orderItems = [];
    db._nextOrderId = 1;
  },
};
