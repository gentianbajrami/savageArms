import React from 'react';
import { ordersQuery } from '../utils/allQueryForProject';
import { useQuery } from '@tanstack/react-query';

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(ordersQuery);
  return '';
};

const Orders = () => {
  const data = useQuery(ordersQuery).data;
  console.log(data);
  return <div className="page">Orders</div>;
};

export default Orders;
