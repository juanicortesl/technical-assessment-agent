import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserList } from '../components/UserList';
import * as userApi from '../api/userApi';

describe('UserList Component', () => {
  beforeEach(() => {
    userApi.resetMockData();
  });

  it('renders the component and loads users', async () => {
    render(<UserList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('User Management Dashboard')).toBeInTheDocument();
    });

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('displays correct user statistics', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/Total Users: 8/)).toBeInTheDocument();
    });

    expect(screen.getByText(/Active: 6/)).toBeInTheDocument();
    expect(screen.getByText(/Admins: 2/)).toBeInTheDocument();
  });

  it('filters users by search term', async () => {
    const user = userEvent.setup();
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    await user.type(searchInput, 'alice');

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });

  it('filters users by role', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const roleFilter = screen.getByDisplayValue('All Roles');
    fireEvent.change(roleFilter, { target: { value: 'admin' } });

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Eve Davis')).toBeInTheDocument();
    });

    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });

  it('deletes a user when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    // Note: This test will fail because the component doesn't wait for the API call
    await waitFor(() => {
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    });
  });

  it('updates user role when role is changed', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });

    // Find Bob's row and change his role
    const bobRow = screen.getByText('Bob Smith').closest('tr');
    const roleSelect = bobRow?.querySelector('select');

    expect(roleSelect).toBeTruthy();

    if (roleSelect) {
      fireEvent.change(roleSelect, { target: { value: 'admin' } });

      // Note: This assertion may be flaky due to async timing
      await waitFor(() => {
        expect(roleSelect.value).toBe('admin');
      });
    }
  });

  it('shows no results message when filters match no users', async () => {
    const user = userEvent.setup();
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    await user.type(searchInput, 'nonexistentuser12345');

    expect(screen.getByText('No users found matching your criteria.')).toBeInTheDocument();
  });

  // This test SHOULD FAIL - exposes the race condition bug
  it('handles API errors gracefully when deleting fails', async () => {
    const user = userEvent.setup();

    // Mock deleteUser to reject
    vi.spyOn(userApi, 'deleteUser').mockRejectedValueOnce(new Error('Network error'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    // This will FAIL because the component doesn't handle errors
    // The user should still see Alice Johnson because the API failed
    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });
  });

  // This test SHOULD FAIL - exposes the missing error boundary
  it('shows error message when initial load fails', async () => {
    vi.spyOn(userApi, 'fetchUsers').mockRejectedValueOnce(new Error('Failed to load'));

    render(<UserList />);

    // This will FAIL because the component doesn't show error state
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  // This test SHOULD FAIL - exposes state mutation bug
  it('does not mutate user objects directly', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });

    // Get original user object reference
    const originalUsers = await userApi.fetchUsers();
    const bobBefore = originalUsers.find(u => u.name === 'Bob Smith');
    const originalRole = bobBefore?.role;

    // Find Bob's row and change his role
    const bobRow = screen.getByText('Bob Smith').closest('tr');
    const roleSelect = bobRow?.querySelector('select');

    if (roleSelect) {
      fireEvent.change(roleSelect, { target: { value: 'admin' } });

      await waitFor(() => {
        expect(roleSelect.value).toBe('admin');
      });

      // This will FAIL because the component mutates the object directly
      // The original object reference should be unchanged
      const usersAfter = await userApi.fetchUsers();
      const bobAfter = usersAfter.find(u => u.name === 'Bob Smith');

      // This assertion will fail due to mutation
      expect(bobBefore).toBe(bobAfter); // Same reference
      expect(bobAfter?.role).toBe('admin'); // But role changed
      expect(originalRole).toBe('user'); // Original was 'user'
    }
  });
});
