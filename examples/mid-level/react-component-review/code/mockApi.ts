// Mock API server for development
// This simulates the https://api.example.com/products endpoint

export const mockProducts = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'electronics' },
  { id: 2, name: 'Wireless Mouse', price: 29, category: 'electronics' },
  { id: 3, name: 'Mechanical Keyboard', price: 149, category: 'electronics' },
  { id: 4, name: 'Cotton T-Shirt', price: 25, category: 'clothing' },
  { id: 5, name: 'Denim Jeans', price: 79, category: 'clothing' },
  { id: 6, name: 'Running Shoes', price: 120, category: 'clothing' },
  { id: 7, name: 'JavaScript: The Good Parts', price: 35, category: 'books' },
  { id: 8, name: 'Clean Code', price: 42, category: 'books' },
  { id: 9, name: 'Design Patterns', price: 55, category: 'books' },
  { id: 10, name: '4K Monitor', price: 499, category: 'electronics' },
];

// Setup mock fetch for the component
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;

  window.fetch = ((url: string, options?: any) => {
    if (url === 'https://api.example.com/products') {
      return Promise.resolve({
        json: () => Promise.resolve(mockProducts),
        ok: true,
        status: 200,
      } as Response);
    }
    return originalFetch(url, options);
  }) as typeof fetch;
}
