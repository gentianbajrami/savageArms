import React, { useState } from 'react';
import styled from 'styled-components';
import FormRow from './FormRow';
import { Form, redirect } from 'react-router-dom';
import customFetch, {
  renderStars,
} from '../utils';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export const action =
  queryClient =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.productId = params?.productId;

    console.log(data);
    try {
      await customFetch.post('/reviews', data);
      queryClient.invalidateQueries([
        'reviews',
        params?.productId || '',
      ]);
      toast.success('Review added');
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.msg ||
          'Something went wrong with review'
      );
    }

    return redirect(
      '/products/' + params?.productId
    );
  };

const CreateReview = ({ reviews, productId }) => {
  if (!reviews) {
    reviews = [];
  }

  return (
    <Wrapper>
      <h2>Reviews</h2>

      <Form
        method="post"
        action={`../create-review/${productId}`}
        className="create"
      >
        <FormRow type={'text'} name={'comment'} />
        <FormRow
          type={'number'}
          name={'rating'}
          defaultValue={''}
          min={1}
          max={5}
        />
        <button type="submit" className="btn">
          create review
        </button>
      </Form>

      {reviews && reviews.length == 0 ? (
        <div>No reviews available</div>
      ) : (
        <table className="reviews-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, idx) => (
              <tr key={r._id}>
                <td>{idx + 1}</td>
                <td className="comment">
                  {r.comment}
                </td>
                <td>{renderStars(r.rating)}</td>
                <td>
                  {dayjs(r.createdAt).format(
                    'MMM D, YYYY'
                  )}
                </td>
                <td>
                  {r?.user?.firstName +
                    ' ' +
                    r?.user?.lastName || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 7rem;
  display: grid;
  align-items: center;
  gap: 1rem;
  h2 {
    letter-spacing: 2px;
  }
  @media (min-width: 800px) {
    grid-template-columns: 1fr 2fr;
    .create {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      .btn {
        margin-top: 1rem;
      }
    }
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 3fr;
  }
  .reviews-table {
    margin-top: 1rem;
    grid-column: span 2;
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }

  .reviews-table th,
  .reviews-table td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }

  .reviews-table th {
    background-color: #f4f4f4;
    color: #333;
  }

  .reviews-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .reviews-table .comment {
    max-width: 300px;
    word-wrap: break-word;
  }
`;
export default CreateReview;
