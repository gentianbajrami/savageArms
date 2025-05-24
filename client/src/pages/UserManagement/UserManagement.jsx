import customFetch from '../../utils/index';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
export const loader = async () => {
  try {
    const response = await customFetch.get('/users');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const UserManagement = () => {
  const data = useLoaderData();

  const [users, setUsers] = useState(data.users || []);
  console.log('Loaded Users:', users);
  console.log(users.map((u) => u._id));

  const handleToggleLock = async (user) => {
    try {
      const res = await customFetch.patch(`/users/lock/${user._id}`);
      const updatedUser = res.data.user;

      toast.success(res.data.msg);

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to toggle lock status');
    }
  };

  const handleChangeRole = (user, newRole) => {
    console.log(`Changing role for ${user.email} to ${newRole}`);
    // Implement API call here if needed
    toast.success(`Role updated to ${newRole}`);
  };

  return (
    <UsersTable>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>
              <RoleBadge role={user.role}>{user.role}</RoleBadge>
            </td>
            <td>
              <StatusBadge status={user.locked ? 'Locked' : 'Active'}>
                {user.locked ? 'Locked' : 'Active'}
              </StatusBadge>
            </td>
            <td>
              <ActionContainer>
                <Link
                  to={`/dashboard/admin-edit-user/${user._id}`}
                  className="btn edit-btn"
                >
                  Edit
                </Link>
                <ActionBtn onClick={() => handleToggleLock(user)}>
                  {user.locked ? 'Unlock' : 'Lock'}
                </ActionBtn>
                <SelectRole
                  onChange={(e) => handleChangeRole(user, e.target.value)}
                  value={user.role}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="company">Company</option>
                </SelectRole>
              </ActionContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </UsersTable>
  );
};

export default UserManagement;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem auto;
  font-family: sans-serif;

  thead {
    background-color: #f4f6f8;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
    color: #333;
  }

  tbody tr:hover {
    background-color: #f9fbfc;
  }
`;

const RoleBadge = styled.span`
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${({ role }) =>
    role === 'admin' ? '#ffd700' : role === 'moderator' ? '#87cefa' : '#d3d3d3'};
  color: #333;
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${({ status }) =>
    status === 'Active' ? '#4caf50' : status === 'Locked' ? '#f44336' : '#ccc'};
  color: white;
`;

const ActionBtn = styled.button`
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #125ea8;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SelectRole = styled.select`
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  cursor: pointer;

  &:hover {
    border-color: #888;
  }
`;
