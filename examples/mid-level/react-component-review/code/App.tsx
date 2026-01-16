import React, { useState } from 'react';
import { ProductList } from './ProductList';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

function App() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Product Store</h1>

      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
        <h3>Shopping Cart ({cart.length} items)</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>

      <ProductList onAddToCart={handleAddToCart} />
    </div>
  );
}

export default App;
