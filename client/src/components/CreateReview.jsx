import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Form,
  redirect,
  useSubmit,
} from 'react-router-dom';
import customFetch, {
  renderStars,
} from '../utils';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const action =
  queryClient =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.productId = params?.productId;

    console.log(data);
    try {
      if (data.reviewId) {
        await customFetch.patch(
          `/reviews/${data.reviewId}`,
          data
        );
        toast.success('Review updated');
      } else {
        await customFetch.post('/reviews', data);
        toast.success('Review added');
      }

      queryClient.invalidateQueries([
        'reviews',
        params?.productId,
      ]);
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
  const [isEditing, setIsEditing] =
    useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [reviewId, setReviewId] = useState(null);
  const submit = useSubmit();

  if (!reviews) reviews = [];

  const handleEdit = review => {
    setIsEditing(true);
    setComment(review.comment);
    setRating(review.rating);
    setReviewId(review._id);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setComment('');
    setRating('');
  };

  return (
    <Wrapper>
      <h2>Reviews</h2>

      <Form
        method="post"
        action={`../create-review/${productId}`}
        className="create"
      >
        {isEditing && (
          <input
            type="hidden"
            name="reviewId"
            value={reviewId}
          />
        )}

        <div className="form-row">
          <label
            htmlFor={'comment'}
            className="form-label"
          >
            Comment
          </label>
          <input
            type={'text'}
            name={'comment'}
            className="form-input"
            onChange={e =>
              setComment(e.target.value)
            }
            value={comment}
          />
        </div>
        <div className="form-row">
          <label
            htmlFor={'rating'}
            className="form-label"
          >
            rating
          </label>
          <input
            type={'number'}
            name={'rating'}
            className="form-input"
            onChange={e =>
              setRating(e.target.value)
            }
            value={rating}
            max={5}
            min={1}
          />
        </div>
        <button
          className="btn"
          type="button"
          onClick={e => {
            submit(e.currentTarget.form);
            handleCancel();
          }}
        >
          {isEditing
            ? 'update review'
            : 'create review'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn cancel-btn"
          >
            Cancel
          </button>
        )}
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
              <th>Action</th>
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
                <td className="actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(r)}
                  >
                    <FaEdit />
                  </button>
                  <Form
                    method="post"
                    action={`../reviews/delete/${r._id}/${productId}`}
                  >
                    <button
                      type="submit"
                      className="delete-btn"
                    >
                      <MdDelete />
                    </button>
                  </Form>
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
  .cancel-btn {
    margin-left: 0.5rem;
  }
  @media (min-width: 600px) {
    grid-template-columns: 1fr 2fr;
    .reviews-table {
      grid-column: span 2;
    }
  }
  @media (min-width: 800px) {
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

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    button {
      color: #000000;
      background-color: transparent;
      border: transparent;
      font-size: 1rem;
      transition: var(--tranistion);
      :hover {
        color: #343434;
      }
    }

    .delete-btn {
      color: red;
      :hover {
        color: darkred;
      }
    }
  }
`;
export default CreateReview;
