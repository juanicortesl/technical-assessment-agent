// Mock API for user management
// In a real app, these would be actual API calls

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

let mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', isActive: true },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user', isActive: true },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user', isActive: false },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'guest', isActive: true },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'admin', isActive: true },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'user', isActive: true },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'user', isActive: false },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'guest', isActive: true },
];

export async function fetchUsers(): Promise<User[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockUsers];
}

export async function deleteUser(userId: number): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  mockUsers = mockUsers.filter(u => u.id !== userId);
}

export async function updateUserRole(userId: number, newRole: string): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
  }
}

export function resetMockData(): void {
  mockUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', isActive: true },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user', isActive: true },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user', isActive: false },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'guest', isActive: true },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'admin', isActive: true },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'user', isActive: true },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'user', isActive: false },
    { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'guest', isActive: true },
  ];
}
