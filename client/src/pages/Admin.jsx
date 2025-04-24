import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/index';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { StatItem } from '../components';

export const loader1 = async () => {
  try {
    const data = await customFetch.get('/users/admin/app-stats');
    console.log('API Response:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Loader Error:', error.response?.data || error.message);
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const data = useLoaderData();

  if (data === undefined) {
    return <p style={{ textAlign: 'center' }}>Loading admin data...</p>;
  }

  if (!data) {
    return <p style={{ textAlign: 'center' }}>No data available</p>;
  }

  const { users = 0, firearms = 0 } = data.data;

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total firearms"
        count={firearms}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;

export const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  h2 {
    text-align: center;
    margin-top: 2rem;
  }
`;
