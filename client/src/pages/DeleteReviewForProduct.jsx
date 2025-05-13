import { toast } from 'react-toastify';
import customFetch from '../utils';
import { redirect } from 'react-router-dom';

export const action =
  queryClient =>
  async ({ params }) => {
    const { id, productId } = params;
    try {
      await customFetch.delete(`/reviews/${id}`);
      queryClient.invalidateQueries(['reviews']);
      toast.success(
        'Product deleted successfully'
      );
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/products/' + productId);
  };
