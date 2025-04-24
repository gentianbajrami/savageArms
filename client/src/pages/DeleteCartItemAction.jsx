import { toast } from 'react-toastify';
import customFetch from '../utils';
import { redirect } from 'react-router-dom';

export const action =
  queryClient =>
  async ({ params }) => {
    const { id } = params;
    try {
      await customFetch.delete(
        `/cart/remove-product/${id}`
      );
      queryClient.invalidateQueries(['cart']);
      toast.success(
        'Product deleted successfully'
      );
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/cart');
  };
