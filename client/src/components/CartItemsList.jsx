import React from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';

const CartItemsList = ({ cart }) => {
  const items = cart?.cartItems;
  return (
    <Wrapper>
      {items.map((item, index) => {
        return <CartItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2rem;
`;

export const Item = styled.div``;

export default CartItemsList;
