import { toast } from 'react-toastify';
import customFetch from '../utils';
import { redirect } from 'react-router-dom';

export const action =
  queryClient =>
  async ({ params, request }) => {
    const { id } = params;
    console.log(id);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      await customFetch.patch(
        `/cart/update-product/${id}`,
        data
      );
      queryClient.invalidateQueries(['cart']);
      toast.success(
        'Product updated successfully'
      );
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/cart');
  };
