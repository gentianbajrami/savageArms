import React from 'react';
import { Form, redirect } from 'react-router-dom';
import {
  FormRow,
  SubmitButton,
} from '../../components';
import styled from 'styled-components';
import customFetch from '../../utils';
import { toast } from 'react-toastify';

export const action =
  queryClient =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('image');
    if (file && file.size > 500000) {
      toast.error('Image size to large');
      return null;
    }

    try {
      await customFetch.post('/blogs', formData);
      queryClient.invalidateQueries(['blogs']);
      toast.success('Blog created successfully');
      return redirect('/dashboard/blog');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const CreateBlog = () => {
  return (
    <Wrapper>
      <Form
        className="form"
        method="post"
        encType="multipart/form-data"
      >
        <h4 className="form-title">Add blog</h4>
        <div className="form-center">
          <FormRow type={'text'} name={'title'} />
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
export default CreateBlog;
