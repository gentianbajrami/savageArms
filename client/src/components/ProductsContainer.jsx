import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { formatPrice } from '../utils';

const ProductsContainer = () => {
  const { products } = useLoaderData();

  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>no products to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {products?.length} product
        {products?.length > 1 && 's'} found
      </h5>
      <div className="firearms">
        {products.map(
          ({ fullName, photo, price, model }) => {
            return (
              <ProductWrapper className="firearm-card">
                <div className="firearm-banner">
                  {model}
                </div>

                <div className="firearm-image">
                  <img
                    src={photo}
                    alt={fullName}
                    loading="lazy"
                  />
                </div>

                <div className="firearms-details">
                  <p>{fullName}</p>
                  <p>{formatPrice(price)}</p>
                </div>
              </ProductWrapper>
            );
          }
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  .firearms {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    gap: 1rem;
  }
  @media (min-width: 900px) {
    .firearms {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1200px) {
    .firearms {
      grid-template-columns: 350px 350px 350px;
    }
  }
`;

const ProductWrapper = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  transition: transform 0.2s ease-in-out;
  width: 350px;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.4s ease-in-out;
  }

  .firearm-banner {
    background: #c32026;
    color: white;
    font-weight: bold;
    text-align: left;
    padding: 10px;
    text-transform: uppercase;
  }

  .firearm-image {
    display: flex;
    justify-content: center;
    padding: 15px;
    background: white;
    border-top-left-radius: 8px;
  }

  .firearm-image img {
    width: 100%;
    max-height: 230px;
    border-radius: 12px;
  }

  .firearms-details {
    padding: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    p:last-child {
      color: var(--primary-500);
    }
    p:first-child {
      margin-bottom: 0.6rem;
      font-weight: 500;
      font-size: 1.3rem;
      letter-spacing: 2px;
      text-transform: capitalize;
      color: var(--grey-800);
    }
  }
`;

export default ProductsContainer;
