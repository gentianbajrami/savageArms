import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/index';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { StatItem } from '../components';
import HourlyLoginChart from '../components/HourlyLoginChart';
import LoginGraph from '../components/LoginGraph';

export const loader1 = async () => {
  try {
    const data = await customFetch.get('/users/app-stats');
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

  const { users = 0, firearms = 0, recentLogins = 0, hourlyLogins = [] } = data.data;

  const chartData = Array.from({ length: 24 }, (_, hour) => {
    const found = hourlyLogins.find((item) => item.hour === hour);
    return {
      hour: `${hour}:00`,
      logins: found ? found.count : 0,
    };
  });

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
      <StatItem
        title="logins last 24h"
        count={recentLogins}
        color="#2cb1bc"
        bcg="#d3f6f8"
        icon={<FaCalendarCheck />}
      />

      <LoginGraph data={chartData} />
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
