import React from 'react';
import customFetch from '../utils';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { MdAttachMoney } from 'react-icons/md';
import styled from 'styled-components';

export const loader =
  queryClient =>
  async ({ request }) => {
    const url = new URL(request.url);
    const data = {
      sessionId:
        url.searchParams.get('sessionId'),
      name: url.searchParams.get('name'),
      address: url.searchParams.get('address'),
    };

    try {
      console.log(data);
      await customFetch.post(
        '/orders/confirm-order',
        data
      );
      queryClient.invalidateQueries(['orders']);
      toast.success('Order Confirmed');
      return redirect('/orders');
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.msg ||
          'Something went wrong'
      );
      return redirect('/cart');
    }
  };

const ConfirmOrder = () => {
  return (
    <Wrapper className="page">
      <div className="success-center">
        <MdAttachMoney />
        <h3>Payment Successfully</h3>
        <p>
          Thank you for payment,hopefully you'll
          have fun
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 5rem);
  display: grid;
  place-items: center;
  background-color: var(--grey-50);
  .success-center {
    text-align: center;
    max-width: 500px;
    padding: 2rem 4rem;
    background-color: white;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-3);
    letter-spacing: 2.4px;
    svg {
      color: green;
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
  }
`;
export default ConfirmOrder;
