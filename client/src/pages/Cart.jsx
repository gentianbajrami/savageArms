import React from 'react';
import customFetch from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Banner,
  CartItemsList,
  CartTotal,
} from '../components';

const cartQuery = {
  queryKey: ['cart'],
  queryFn: async () => {
    const { data } = await customFetch.get(
      '/cart'
    );
    return data;
  },
};

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(cartQuery);
  return null;
};

const Cart = () => {
  const { data } = useQuery(cartQuery);
  const cart = data?.cart || [];
  console.log(data);

  // if (cart.length == 0) {
  //   return (
  //     <NotLoggedInWrapper className="page">
  //       <p>
  //         {' '}
  //         Please login/register to see your cart
  //       </p>
  //       <Link to="/login" className="btn">
  //         Login
  //       </Link>
  //     </NotLoggedInWrapper>
  //   );
  // }

  if (
    !data.cart ||
    cart?.cartItems?.length === 0
  ) {
    return (
      <NotLoggedInWrapper className="page">
        <p> Please add some products in cart</p>
        <Link to="/products" className="btn">
          Products
        </Link>
      </NotLoggedInWrapper>
    );
  }

  // return <div>Hello</div>;

  return (
    <Wrapper className="page">
      <Banner title={'cart'} />
      <div className="cart-container">
        <CartItemsList cart={cart} />
        <CartTotal {...cart} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .cart-container {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 1000px) {
    .cart-container {
      grid-template-columns: 2fr 1fr;
    }
  }
`;

const NotLoggedInWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 5rem;
  gap: 1rem;
  p {
    color: var(--grey-800);
    font-size: 1.2rem;
  }
`;
export default Cart;
