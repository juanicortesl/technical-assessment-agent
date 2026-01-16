import { importProducts, runScheduledImport } from './productImporter';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Product Import Service\n');

  const command = process.argv[2];

  if (command === 'import') {
    const filePath = process.argv[3];
    if (!filePath) {
      console.error('Usage: npm start import <file.csv>');
      process.exit(1);
    }
    await importProducts(filePath);
  } else if (command === 'scheduled') {
    console.log('Running scheduled import...');
    await runScheduledImport();
  } else if (command === 'create-sample') {
    // Create sample CSV for testing
    const sampleCsv = `sku,name,price,stock
LAPTOP-001,Laptop Pro 15,1299.99,50
MOUSE-002,Wireless Mouse,29.99,200
KEYBOARD-003,Mechanical Keyboard,149.99,75
MONITOR-004,4K Monitor 27,499.99,30`;

    const importDir = path.join(__dirname, '..', 'imports');
    if (!fs.existsSync(importDir)) {
      fs.mkdirSync(importDir, { recursive: true });
    }

    const samplePath = path.join(importDir, 'sample-products.csv');
    fs.writeFileSync(samplePath, sampleCsv);
    console.log(`Sample CSV created at: ${samplePath}`);
    console.log('\nRun with: npm start import imports/sample-products.csv');
  } else {
    console.log('Commands:');
    console.log('  npm start create-sample  - Create a sample CSV file');
    console.log('  npm start import <file>  - Import a specific CSV file');
    console.log('  npm start scheduled      - Run scheduled import (processes all files in imports/)');
  }
}

main().catch(console.error);
