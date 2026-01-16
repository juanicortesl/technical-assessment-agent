// Mock database for the exercise
export const db = {
  _products: [] as any[],
  _inventoryHistory: [] as any[],
  _nextId: 1,

  query: async (sql: string, params?: any[]) => {
    // Simulate SELECT queries
    if (sql.includes('SELECT') && sql.includes('products')) {
      const sku = params?.[0];
      const rows = db._products.filter((p: any) => p.sku === sku);
      return { rows };
    }

    // Simulate UPDATE
    if (sql.includes('UPDATE') && sql.includes('products')) {
      const [name, price, stock, sku] = params || [];
      const product = db._products.find((p: any) => p.sku === sku);
      if (product) {
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.updated_at = new Date();
      }
      return { rows: [] };
    }

    // Simulate INSERT into products
    if (sql.includes('INSERT') && sql.includes('products') && !sql.includes('inventory_history')) {
      const [sku, name, price, stock] = params || [];
      const newProduct = {
        id: db._nextId++,
        sku,
        name,
        price,
        stock,
        created_at: new Date(),
      };
      db._products.push(newProduct);
      return { rows: [newProduct] };
    }

    // Simulate INSERT into inventory_history
    if (sql.includes('INSERT') && sql.includes('inventory_history')) {
      const [productId, oldStock, newStock] = params || [];
      const historyEntry = {
        id: db._inventoryHistory.length + 1,
        product_id: productId,
        old_stock: oldStock,
        new_stock: newStock,
        changed_at: new Date(),
      };
      db._inventoryHistory.push(historyEntry);
      return { rows: [historyEntry] };
    }

    return { rows: [] };
  },

  reset: () => {
    db._products = [];
    db._inventoryHistory = [];
    db._nextId = 1;
  },
};
