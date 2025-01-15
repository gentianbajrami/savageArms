import React from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import customFetch from '../../utils';

export const action =
  queryClient =>
  async ({ params }) => {
    try {
      await customFetch.delete(
        '/blogs/' + params.id
      );
      queryClient.invalidateQueries(['blogs']);
      toast.success('Blog deleted successfully');
    } catch (error) {
      toast.error(err?.response?.data?.msg);
    }
    return redirect('../blog');
  };
