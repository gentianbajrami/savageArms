import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/index';
import StatItem from '../components/StatItem.jsx';
import LoginGraph from '../components/LoginGraph.jsx';
import styled from 'styled-components';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

export const loader = async () => {
  try {
    const data = await customFetch('/firearms/stats');
    return data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const data = useLoaderData();
  const { firearmsInCart, firearmsPurchased, hourlyLogins, recentLogins } =
    data.data;

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
        title="firearms purchased"
        count={firearmsPurchased}
        color="#2cb1bc"
        bcg="#d3f6f8"
        icon={<FaCalendarCheck />}
      />
      <StatItem
        title="firearms in cart"
        count={firearmsInCart}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
      <StatItem
        title="Your logins last 24h"
        count={recentLogins}
        color="#2cb1bc"
        bcg="#d3f6f8"
        icon={<FaCalendarCheck />}
      />

      <LoginGraph data={chartData} />
    </Wrapper>
  );
};

export default Stats;

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
