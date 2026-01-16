import fs from 'fs';
import csv from 'csv-parser';
import { db } from './database';

interface ProductRow {
  sku: string;
  name: string;
  price: string;
  stock: string;
}

export async function importProducts(filePath: string): Promise<void> {
  console.log(`Starting import from ${filePath}`);

  const products: ProductRow[] = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: ProductRow) => {
        products.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Loaded ${products.length} products from CSV`);

  for (const product of products) {
    await processProduct(product);
  }

  console.log('Import completed successfully');
}

async function processProduct(product: ProductRow): Promise<void> {
  const price = parseFloat(product.price);
  const stock = parseInt(product.stock);

  if (isNaN(price) || isNaN(stock)) {
    console.log(`Skipping invalid product: ${product.sku}`);
    return;
  }

  const existingProduct = await db.query(
    'SELECT id, stock FROM products WHERE sku = $1',
    [product.sku]
  );

  if (existingProduct.rows.length > 0) {
    await db.query(
      `UPDATE products
       SET name = $1, price = $2, stock = $3, updated_at = NOW()
       WHERE sku = $4`,
      [product.name, price, stock, product.sku]
    );

    await db.query(
      `INSERT INTO inventory_history (product_id, old_stock, new_stock, changed_at)
       VALUES ($1, $2, $3, NOW())`,
      [existingProduct.rows[0].id, existingProduct.rows[0].stock, stock]
    );
  } else {
    await db.query(
      `INSERT INTO products (sku, name, price, stock, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [product.sku, product.name, price, stock]
    );
  }
}

export async function runScheduledImport(): Promise<void> {
  const importDir = './imports';
  const files = fs.readdirSync(importDir);

  for (const file of files) {
    if (file.endsWith('.csv')) {
      await importProducts(`${importDir}/${file}`);
      fs.unlinkSync(`${importDir}/${file}`);
    }
  }
}
