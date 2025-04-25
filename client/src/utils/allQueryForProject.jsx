import customFetch from '.';

export const cartQuery = {
  queryKey: ['cart'],
  queryFn: async () => {
    const { data } = await customFetch.get(
      '/cart'
    );
    return data;
  },
};
export const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get(
      '/users/current-user'
    );
    return data;
  },
};

export const ordersQuery = {
  queryKey: ['orders'],
  queryFn: async () => {
    const { data } = await customFetch.get(
      '/orders'
    );
    return data;
  },
};

export const allProductsQuery = queryParams => {
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

export const reviewQuery = id => {
  return {
    queryKey: ['review', id],
    queryFn: async () => {
      const { data } = await customFetch.get(
        '/reviews/products/' + id
      );
      return data;
    },
  };
};
