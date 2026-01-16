import { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUserRole } from "../api/userApi";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  const handleDelete = (userId: number) => {
    deleteUser(userId);
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    updateUserRole(userId, newRole);
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.role = newRole;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const activeUserCount = users.filter((u) => u.isActive).length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list-container">
      <div className="header">
        <h1>User Management Dashboard</h1>
        <div className="stats">
          <span>Total Users: {users.length}</span>
          <span>Active: {activeUserCount}</span>
          <span>Admins: {adminCount}</span>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="role-filter"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>

        <button onClick={loadUsers} className="refresh-btn">
          Refresh
        </button>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={user.isActive ? "active" : "inactive"}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      user.isActive ? "active" : "inactive"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-results">
            No users found matching your criteria.
          </div>
        )}
      </div>

      <div className="footer">
        <p>
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>
    </div>
  );
}
