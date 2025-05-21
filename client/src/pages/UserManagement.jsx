import customFetch from '../utils/index';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const data = await customFetch.get('/users');
    return data;
  } catch (error) {
    console.log(error);
  }
};

const UserManagement = () => {
  const data = useLoaderData();

  if (data === undefined) {
    return <p style={{ textAlign: 'center' }}>Loading user management data...</p>;
  }

  if (!data) {
    return <p style={{ textAlign: 'center' }}>No data available</p>;
  }

  const { users = [] } = data || {};

  return (
    <Wrapper>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default UserManagement;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 0.5rem;
      background-color: #fff;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`;
