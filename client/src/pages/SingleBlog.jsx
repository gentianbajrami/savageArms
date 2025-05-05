import React from 'react';
import styled from 'styled-components';
import { Banner, Comments } from '../components';
import { singleBlogQueryBySlug } from '../utils/allQueryForProject';
import {
  Form,
  redirect,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FaCommentDots,
  FaEye,
  FaHeart,
} from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { toast } from 'react-toastify';

export const loader =
  queryClient =>
  async ({ params }) => {
    const { slug } = params;
    try {
      await queryClient.ensureQueryData(
        singleBlogQueryBySlug(slug)
      );
      return { slug };
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/blogs');
    }
  };

const SingleBlog = () => {
  const { slug } = useLoaderData();
  const blog = useQuery(
    singleBlogQueryBySlug(slug)
  ).data;
  const user = useOutletContext();
  console.log(blog);
  return (
    <Wrapper className="page">
      <Banner title={'blogs'} />
      <div className="content">
        <img
          src={blog?.featuredImage}
          alt={blog?.title}
          className="img"
        />

        <div className="data">
          <h3>{blog?.title}</h3>

          <p>{blog.content}</p>

          <p className="tags">
            Tags:{' '}
            {blog?.tags?.map((t, idx) => {
              return (
                <span key={t}>
                  {t}
                  {idx === blog.tags.length - 1
                    ? ' '
                    : ', '}
                </span>
              );
            })}
          </p>

          <div className="actions">
            <div className="like">
              {blog?.likes?.length || 0}
              <span>
                <Form
                  method="POST"
                  action={`../blogs/toggle-like/${blog?._id}`}
                >
                  <input
                    type="slug"
                    defaultValue={blog?.slug}
                    hidden
                    name="slug"
                  />
                  <button type="submit">
                    {' '}
                    {blog?.likes?.includes(
                      user?._id.toString()
                    ) ? (
                      <FaHeart />
                    ) : (
                      <CiHeart />
                    )}
                  </button>
                </Form>
              </span>
            </div>
            <div className="comment">
              {blog?.comments?.length || 0}
              <span>
                <FaCommentDots />
              </span>
            </div>
            <div className="views">
              {blog?.views || 0}
              <span>
                <FaEye />
              </span>
            </div>
          </div>
          <p className="by">
            By{' '}
            {blog.author?.firstName +
              ' ' +
              blog.author?.lastName}{' '}
            • {blog?.readTime} min read
          </p>
        </div>

        <Comments
          comments={blog?.comments || []}
          slug={slug}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  max-width: 1200px;
  .img {
    border-radius: 5px;
    box-shadow: var(--shadow-3);
    margin-bottom: 3rem;
  }

  .data {
    h3 {
      text-align: center;
      margin-bottom: 1rem;
    }
    p {
      color: var(--grey-800);
      line-height: 1.7;
    }
    .by {
      margin-top: 1rem;
      text-align: end;
    }
    .tags {
      text-transform: capitalize;
      color: var(--grey-800);
      margin-top: 1rem;
    }
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2rem;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      span {
        margin-top: 0.3rem;
      }
    }

    .like {
      button {
        border: none;
        background: transparent;
      }
    }
  }
`;

export default SingleBlog;
