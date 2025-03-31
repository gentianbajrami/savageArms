import { toast } from 'react-toastify';
import customFetch from '../../utils';
import { redirect } from 'react-router-dom';
import Firearm from '../../components/Firearm';

export const action1 = async ({ params }) => {
  try {
    await customFetch.delete(`/firearms/${params.id}`);
    toast.success('Firearm deleted successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard/all-firearms');
};
