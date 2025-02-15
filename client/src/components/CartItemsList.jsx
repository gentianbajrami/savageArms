import React from 'react';
import styled from 'styled-components';

const CartItemsList = ({ cart }) => {
  const items = cart?.cartItems;
  console.log(cart);
  return (
    <Wrapper>
      {items.map((item, index) => (
        <Item key={index}>item</Item>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Item = styled.div``;

export default CartItemsList;
