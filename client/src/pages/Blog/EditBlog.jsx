import React from 'react';
import customFetch from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  Form,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  FormRow,
  SubmitButton,
} from '../../components';

const singleBlogQuery = id => {
  return {
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await customFetch.get(
        `/blogs/${id}`
      );
      console.log(response.data);
      return response.data;
    },
  };
};

export const loader =
  queryClient =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(
        singleBlogQuery(params.id)
      );
      return { id: params.id };
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.msg ||
          'something went wrong'
      );
      return redirect('/dashboard');
    }
  };
export const action =
  queryClient =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const file = formData.get('image');
    if (file && file.size > 500000) {
      toast.error('Image size to large');
      return null;
    }

    try {
      await customFetch.patch(
        '/blogs/' + params.id,
        formData
      );
      queryClient.invalidateQueries(['blogs']);
      toast.success('Blog updated successfully');
      return redirect('/dashboard/blog');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const EditBlog = () => {
  const { id } = useLoaderData();
  const { blog } = useQuery(
    singleBlogQuery(id)
  ).data;
  console.log(blog);
  return (
    <Wrapper>
      <Form
        className="form"
        method="post"
        encType="multipart/form-data"
      >
        <h4 className="form-title">Edit blog</h4>
        <div className="form-center">
          <FormRow
            type={'text'}
            name={'title'}
            defaultValue={blog?.title}
          />
          <div className="form-row">
            <label
              htmlFor="image"
              className="form-label"
            >
              Select an image(max 0.5mb)
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-input"
              accept="image/*"
            />
          </div>
          <div className="form-row">
            <label className="form-label">
              Content
            </label>
            <textarea
              name="content"
              className="form-input"
              defaultValue={blog?.content}
            ></textarea>
          </div>
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background-color: var(
    --background-secondary-color
  );
  padding: 3rem 2rem 4rem;
  .form-title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      align-items: center;
    }
  }
`;
export default EditBlog;
