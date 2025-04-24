import React from 'react';
import styled from 'styled-components';
import {
  formatPrice,
  generateAmountOptions,
} from '../utils';
import {
  Form,
  useSubmit,
} from 'react-router-dom';

const CartItem = ({
  product,
  price,
  quantity,
}) => {
  const submit = useSubmit();
  return (
    <Wrapper>
      {' '}
      <div className="info">
        <img
          src={product?.photo}
          alt={product?.fullName}
        />
        <div className="name">
          <h5>{product?.fullName}</h5>
          <p>{product?.manufacturer}</p>
        </div>
      </div>
      <div className="amount">
        {/* AMOUNT */}
        <Form
          method="POST"
          action={`/cart/update/${product?._id}`}
          className="input"
        >
          <label
            htmlFor="quantity"
            className="label p-0"
          >
            Amount
          </label>
          <select
            name="quantity"
            id="quantity"
            className="input"
            value={quantity}
            onChange={e =>
              submit(e.currentTarget.form)
            }
          >
            {generateAmountOptions(
              product?.stock
            )}
          </select>
        </Form>
        {/* REMOVE */}
        <Form
          method="POST"
          action={`/cart/remove/${product?._id}`}
        >
          <button>remove</button>
        </Form>
      </div>
      <div className="price">
        <p>{formatPrice(price)}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: grid;
  place-items: space-between;
  padding: 0.5rem;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--grey-300);
  padding-bottom: 1.5rem;
  img {
    width: 6rem;
    border-radius: 5px;
    height: 6rem;
    object-fit: cover;
  }
  .info {
    display: flex;
    gap: 2rem;
    justify-self: start;
    .name {
      margin-top: 1rem;
      h5 {
        color: var(--grey-800);
        font-weight: 600;
      }
      p {
        color: var(--grey-500);
        margin-top: 1rem;
      }
    }
  }
  .input {
    display: grid;
    gap: 0.1rem;
    label {
      color: var(--grey-700);
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    select {
      border: 1px solid var(--grey-300);
      border-radius: 9px;
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
    }
  }

  .amount {
    justify-self: center;
    display: grid;
    place-items: start;
    button {
      color: #5858ff;
      border: none;
      background: none;
      font-size: 0.96rem;
    }
  }
  .price {
    justify-self: center;
    p {
      color: var(--grey-800);
      font-weight: 600;
    }
  }

  @media (max-width: 550px) {
    .amount,
    .price {
      margin-top: 1rem;
    }
  }
  @media (min-width: 550px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

export default CartItem;
