import React, {
  useEffect,
  useState,
} from 'react';
import {
  FaEdit,
  FaRemoveFormat,
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  Form,
  redirect,
  useOutletContext,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils';

export const createCommentAction =
  queryClient =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(
        `/blogs/${params?.slug}/comments`,
        data
      );
      toast.success(
        'Comment added successfully!'
      );
      queryClient.invalidateQueries({
        queryKey: ['blog', params?.slug],
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(params, data);
    return redirect('/blogs/' + params?.slug);
  };

export const editCommentAction =
  queryClient =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(
        `/blogs/${params?.slug}/comments/${params?.id}`,
        data
      );
      toast.success(
        'Comment edited successfully!'
      );
      queryClient.invalidateQueries({
        queryKey: ['blog', params?.slug],
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(params, data);
    return redirect('/blogs/' + params?.slug);
  };

export const deleteCommentAction =
  queryClient =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      await customFetch.delete(
        `/blogs/${params?.slug}/comments/${data?.id}`,
        data
      );
      toast.success(
        'Comment deleted successfully!'
      );
      queryClient.invalidateQueries({
        queryKey: ['blog', params?.slug],
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(params);
    return redirect('/blogs/' + params?.slug);
  };

const Comments = ({
  comments = [],
  onDelete,
  slug,
}) => {
  const user = useOutletContext();
  const [commentContent, setCommentContent] =
    useState('');
  const [editingId, setEditingId] =
    useState(null);

  const handleEdit = id => {
    setEditingId(id);
  };

  useEffect(() => {
    setEditingId(null);
    setCommentContent('');
  }, [comments]);

  return (
    <Wrapper>
      {/* Create Comment */}
      <Form
        method="post"
        action={`../blogs/add-comment/${slug}`}
        className="create-comment"
      >
        <textarea
          rows="2"
          placeholder="Add a comment..."
          name="content"
          value={commentContent}
          onChange={e =>
            setCommentContent(e.target.value)
          }
        />
        <button className="btn" type="submit">
          Post
        </button>
      </Form>

      {/* Display Comments */}
      {comments.map(c => (
        <article key={c?._id}>
          <div className="img-container">
            <img
              src="https://www.paxus.com.au/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOW1nQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0b8b8e1c6c0819b6eef4fb97c1b80ff9b77717d/7%20linkedin%20photo%20tipes%20to%20maximise%20your%20impact.png"
              alt="User"
            />
            <p>
              {c?.user?.firstName}{' '}
              {c?.user?.lastName}
            </p>
            <small>
              {dayjs(c.createdAt).format(
                'MMM D, YYYY'
              )}
            </small>
          </div>

          {!user ? (
            <p>{c.content}</p>
          ) : (
            <div>
              {editingId === c._id ? (
                <Form
                  method="post"
                  action={`../blogs/edit-comment/${slug}/${editingId}`}
                  className="editComment"
                >
                  <textarea
                    rows="2"
                    defaultValue={c?.content}
                    name="content"
                  />
                  <div className="buttons">
                    <button
                      className="btn"
                      type="submit"
                      onClick={() =>
                        handleEdit(c._id)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        setEditingId(null)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              ) : (
                <div className="content">
                  <p>{c.content}</p>
                  {(user?._id == c.user?._id ||
                    user?.role == 'admin') && (
                    <div className="buttons">
                      <button
                        onClick={() => {
                          setEditingId(c._id);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <Form
                        method="post"
                        action={`../blogs/delete-comment/${slug}`}
                      >
                        <input
                          type="text"
                          defaultValue={c?._id}
                          hidden
                          name="id"
                        />
                        <button
                          type="submit"
                          className="delete"
                        >
                          <MdDelete />
                        </button>
                      </Form>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </article>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 5rem;
  .create-comment {
    display: flex;
    align-items: center;
    justify-content: center;
    textarea {
      width: 90%;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      outline: none;
    }
    .btn {
      height: 53px;
      width: 70px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      margin-top: 0.1rem;
    }
  }

  textarea {
    resize: none;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  article {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1rem;
    .img-container {
      display: grid;
      place-items: center;
      text-align: center;
      gap: 0.3rem;
      img {
        opacity: 0.9;
        box-shadow: var(--shadow-4);
      }
      color: var(--grey-700);
    }
  }

  article img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .content {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    p {
      color: var(--grey-800);
      line-height: 1.7;
      text-transform: capitalize;
    }
    .buttons {
      display: flex;
      gap: 1rem;
    }
    .delete {
      color: red;
      :hover {
        color: darkred;
      }
      /* margin-left: 1rem; */
    }
    button {
      background-color: transparent;
      color: #605f5f;
      border: transparent;
      font-size: 1.2rem;
      transition: var(--tranistion);
      :hover {
        color: #000000;
      }
    }
  }

  .editComment {
    display: flex;
    gap: 1rem;
    align-items: center;
    .buttons {
      display: flex;
      gap: 1rem;
    }
  }
`;

export default Comments;
