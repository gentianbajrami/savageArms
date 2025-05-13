import React from 'react';
import { ordersQuery } from '../utils/allQueryForProject';
import { useQuery } from '@tanstack/react-query';
import { Banner } from '../components';
import dayjs from 'dayjs';
import styled from 'styled-components';
export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(ordersQuery);
  return '';
};

const Orders = () => {
  const { data, isLoading, isError, error } =
    useQuery(ordersQuery);

  if (isLoading) return <p>Loading orders…</p>;
  if (isError)
    return (
      <p>Error loading orders: {error.message}</p>
    );

  const orders = data?.orders || [];

  if (orders?.length === 0) {
    return (
      <div className="page">
        <Banner title="Orders" />
        <h3 className="mt-8 text-center text-gray-600">
          No orders found.
        </h3>
      </div>
    );
  }

  return (
    <Wrapper className="page ">
      <Banner title="Orders" />

      <div>
        <table className="reviews-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Address</th>
              <th># Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr key={o._id}>
                <td>{idx + 1}</td>
                <td>{o.name}</td>
                <td>{o.address}</td>
                <td>{o.numItemsInCart}</td>
                <td>{o.orderTotal}</td>
                <td>{o.status}</td>

                <td>
                  {dayjs(o.createdAt).format(
                    'MMM D, YYYY'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  .reviews-table {
    margin-top: 1rem;

    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }

  .reviews-table th,
  .reviews-table td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }

  .reviews-table th {
    background-color: #f4f4f4;
    color: #333;
  }

  .reviews-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (min-width: 600px) {
    grid-template-columns: 1fr 2fr;
    .reviews-table {
      grid-column: span 2;
    }
  }
`;

export default Orders;
