import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductList } from '../ProductList';
import '../mockApi';

describe('ProductList', () => {
  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('should render products from API', async () => {
    render(<ProductList onAddToCart={mockOnAddToCart} />);

    await waitFor(() => {
      expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    });

    expect(screen.getByText(/\$1299/)).toBeInTheDocument();
  });

  it('should filter products by category', async () => {
    render(<ProductList onAddToCart={mockOnAddToCart} />);

    await waitFor(() => {
      expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    });

    const categorySelect = screen.getByDisplayValue('All Categories');
    await userEvent.selectOptions(categorySelect, 'books');

    await waitFor(() => {
      expect(screen.getByText('Clean Code')).toBeInTheDocument();
      expect(screen.queryByText('Laptop Pro')).not.toBeInTheDocument();
    });
  });

  it('should call onAddToCart when button clicked', async () => {
    render(<ProductList onAddToCart={mockOnAddToCart} />);

    await waitFor(() => {
      expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    });

    const addButtons = screen.getAllByText('Add to Cart');
    await userEvent.click(addButtons[0]);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it('should sort products by price', async () => {
    render(<ProductList onAddToCart={mockOnAddToCart} />);

    await waitFor(() => {
      expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    });

    const sortSelect = screen.getByDisplayValue('Sort by Name');
    await userEvent.selectOptions(sortSelect, 'price');

    // After sorting by price, lowest price items should appear first
    const products = screen.getAllByRole('heading', { level: 3 });
    expect(products[0]).toHaveTextContent('Wireless Mouse'); // $29
  });
});
