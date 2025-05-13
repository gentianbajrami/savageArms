import React from 'react';
import {
  Banner,
  CreateReview,
} from '../components';
import customFetch, {
  formatPrice,
  renderStars,
} from '../utils';
import {
  Form,
  redirect,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { reviewQuery } from '../utils/allQueryForProject';

const singleProductQuery = id => {
  return {
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await customFetch.get(
        '/firearms/' + id
      );
      return data;
    },
  };
};
export const loader =
  queryClient =>
  async ({ params }) => {
    await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    await queryClient.ensureQueryData(
      reviewQuery(params.id)
    );

    return { id: params.id };
  };

export const action =
  queryClient =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      await customFetch.post(
        '/cart/add-product/' + params.id,
        data
      );
      queryClient.invalidateQueries(['cart']);
      toast.success('Product added successfully');
      return redirect('/products');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const SingleProductPage = () => {
  const { id } = useLoaderData();
  const { firearm } = useQuery(
    singleProductQuery(id)
  ).data;

  const { reviews } = useQuery(
    reviewQuery(id)
  ).data;

  const product = firearm || {};

  return (
    <Wrapper className="page">
      <Banner title={'Products'} />
      <div className="product">
        <img
          src={product?.photo}
          alt={product?.fullName}
          loading="lazy"
        />
        <div className="data">
          <div className="header">
            <p className="name">
              {product.fullName}
            </p>
            <p className="company">
              {product.manufacturer}
            </p>
            <p className="price">
              {formatPrice(product.price)}
            </p>
            <p className="desc">
              {product.description}
            </p>
            <p className="features">
              {product.features}
            </p>
            <p className="type">
              Type: {product.type}
            </p>
            <p className="type">
              {' '}
              Model: {product.model}
            </p>
            <p className="rating">
              {' '}
              Rating:{' '}
              {renderStars(product.averageRating)}
            </p>
          </div>
          <Form method="post">
            <div className="amount">
              <label htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="1"
                defaultValue={1}
                max={product?.stock}
              />
            </div>
            <button type="submit" className="btn">
              Add to cart
            </button>
          </Form>
        </div>
      </div>
      <CreateReview
        reviews={reviews}
        productId={product?._id}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 1rem auto;
  .product {
    display: grid;
    gap: 2rem;
  }
  img {
    width: 24rem;
    height: 24rem;
    border-radius: 1rem;
    object-fit: cover;
    margin: 0 auto;
  }
  .data {
    display: grid;
    gap: 1rem;
    justify-content: center;
  }

  .header {
    .name {
      font-size: 2rem;
      line-height: 1.8;
      text-transform: capitalize;
      font-weight: 700;
    }
    .company {
      font-size: 1.25rem;
      line-height: 1.2;
      color: var(--grey-600);
      font-weight: bold;
    }
    .price {
      font-size: 1.25rem;
      line-height: 1.2;
      margin-top: 0.5rem;
    }
    .desc,
    .features,
    .type {
      margin-top: 1rem;
      line-height: 2;
      color: var(--grey-600);
    }
    .type {
      margin-top: 0;
      text-transform: capitalize;
    }
  }

  form {
    .amount {
      margin-bottom: 1rem;
      display: grid;
      gap: 0.5rem;
      align-items: center;
      justify-content: start;
      input {
        width: 15rem;
        padding: 0.5rem;
        border: 1px solid var(--grey-300);
        border-radius: 0.5rem;
        font-size: 1rem;
      }
    }
  }

  @media (min-width: 650px) {
    .product {
      grid-template-columns: 1fr 1fr;
      justify-content: center;
    }
    .data {
      justify-content: start;
    }
  }
`;
export default SingleProductPage;
