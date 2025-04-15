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
