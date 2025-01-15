import React from 'react';
import customFetch from '../../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { SingleBlog } from '../../components';
import { useQuery } from '@tanstack/react-query';

const blogsQuery = {
  queryKey: ['blogs'],
  queryFn: async () => {
    const response = await customFetch.get(
      '/blogs'
    );
    return response.data;
  },
};

export const loader = queryClient => async () => {
  try {
    await queryClient.ensureQueryData(blogsQuery);
    return '';
  } catch (error) {
    toast.error(
      error?.response?.data?.msg ||
        'something went wrong'
    );
    return redirect('/dashboard');
  }
};
const BlogDashboard = () => {
  const {
    data: { blogs },
  } = useQuery(blogsQuery);

  return (
    <Wrapper>
      {blogs.map(blog => {
        return (
          <SingleBlog key={blog?._id} {...blog} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(
    auto-fill,
    minmax(400px, 1fr)
  );
  gap: 1rem;
`;

export const BlogPost = styled.div``;
export default BlogDashboard;
