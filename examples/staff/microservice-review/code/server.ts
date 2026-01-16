import express from 'express';
import { OrderService } from './orderService';

const app = express();
app.use(express.json());

const orderService = new OrderService();

app.post('/api/orders', async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  const order = await orderService.getOrder(parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Order service running on http://localhost:3000');
    console.log('\nEndpoints:');
    console.log('  POST /api/orders - Create order');
    console.log('  GET /api/orders/:id - Get order');
  });
}

export default app;
