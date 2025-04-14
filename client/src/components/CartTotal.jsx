import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatPrice } from '../utils';
const CartTotal = ({
  cartTotal,
  tax,
  shipping,
  orderTotal,
  showBtn = true,
}) => {
  return (
    <Wrapper>
      <div className="data">
        <p className="row">
          <span>Subtotal</span>{' '}
          <span>{formatPrice(cartTotal)}</span>
        </p>
        <p className="row">
          <span>Shipping</span>{' '}
          <span>{formatPrice(shipping)}</span>
        </p>
        <p className="row">
          <span>Tax</span>{' '}
          <span>{formatPrice(tax)}</span>
        </p>
        <p className="row">
          <span>Order Total</span>{' '}
          <span>{formatPrice(orderTotal)}</span>
        </p>
      </div>
      {showBtn && (
        <Link to={'../checkout'} className="btn">
          proceed to Checkout
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .btn {
    text-align: center;
    padding: 1rem 2rem;
    border-radius: 10px;
  }
  .data {
    width: 100%;
    padding: 2rem 3rem;
    background-color: var(--grey-200);
    border-radius: 20px;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--grey-300);
      margin-bottom: 1.4rem;
      padding-bottom: 0.5rem;
      color: var(--grey-600);
      &:last-child {
        border-bottom: 0;
        font-size: 1.2rem;
      }
    }
  }
`;

export default CartTotal;
