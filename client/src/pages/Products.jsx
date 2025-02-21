import React from 'react';
import { Banner } from '../components';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils';
import Filters from '../components/ProductFilters';
import ProductsContainer from '../components/ProductsContainer';

const allProductsQuery = queryParams => {
  const {
    search,
    caliber,
    model,
    order,
    price,
    shipping,
    page,
    type,
  } = queryParams;

  return {
    queryKey: [
      'firearms',
      search ?? '',
      caliber ?? 'all',
      model ?? 'all',
      type ?? 'all',
      order ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch('/firearms', {
        params: queryParams,
      }),
  };
};

export const loader =
  queryClient =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(
        request.url
      ).searchParams.entries(),
    ]);

    const response =
      await queryClient.ensureQueryData(
        allProductsQuery(params)
      );
    console.log(response.data);
    const products = response.data?.products;
    const meta = response.data?.meta;
    return { products, meta, params };
  };

const Products = () => {
  return (
    <div
      className="page"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Banner title={'products'} />
      <Filters />
      <ProductsContainer />
    </div>
  );
};

export default Products;
