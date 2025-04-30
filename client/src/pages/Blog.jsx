import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import customFetch from '../utils';
import { Banner } from '../components';
import {
  FaCommentDots,
  FaEye,
  FaHeart,
} from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

const blogsQuery = params => {
  const { search, page } = params;
  return {
    queryKey: ['blogs', search ?? '', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch(
        '/blogs',
        { params }
      );
      return data;
    },
  };
};

export const loader =
  queryClient =>
  async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(
          request.url
        ).searchParams.entries(),
      ]);
      await queryClient.ensureQueryData(
        blogsQuery(params)
      );
      return { searchValues: { ...params } };
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.msg ||
          'something went wrong'
      );
      return redirect('/');
    }
  };
export const action =
  queryClient =>
  async ({ params, request }) => {
    const { id } = params;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post(
        `/blogs/${id}/like`
      );
      queryClient.invalidateQueries(['blogs']);
      toast.success(
        `Blog ${
          response.data.liked
            ? 'liked'
            : 'unliked'
        } successfully`
      );

      if (data?.slug) {
        console.log(data?.slug);
        return redirect(`/blogs/${data?.slug}`);
      }
      return redirect('/blogs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const Blog = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(
    blogsQuery(searchValues)
  );
  const user = useOutletContext();

  const blogs = data?.posts || [];

  console.log(user);
  console.log(blogs);
  const submit = useSubmit();

  const debounce = onChange => {
    let timeout;
    return e => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper className="page">
      <Banner title={'blog'} />
      <div className="searchForm">
        <p>G-Arms Blog</p>
        <Form>
          <div className="form-row">
            <input
              type={'search'}
              name={'search'}
              className="form-input"
              defaultValue={searchValues?.search}
              onChange={debounce(form =>
                submit(form)
              )}
              placeholder={'Search for blogs...'}
            ></input>
          </div>
          <Link
            to={'/blog'}
            className="btn form-btn "
          >
            Reset
          </Link>
        </Form>
      </div>

      <div className="blogs">
        {blogs.map(post => (
          <article
            className="blog"
            key={post._id}
          >
            <Link
              to={`/blogs/${post.slug}`}
              className="img-container"
            >
              <img
                src={post?.featuredImage}
                alt="no image"
                className="img"
              />
            </Link>

            <div className="data">
              <Link to={`/blogs/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>

              <div className="content">
                <p>
                  {post?.content?.slice(0, 250)}{' '}
                  ...
                </p>
                <p>
                  Tags:{' '}
                  {post?.tags?.map((t, idx) => {
                    return (
                      <span key={t}>
                        {t}
                        {idx ===
                        post.tags.length - 1
                          ? ' '
                          : ', '}
                      </span>
                    );
                  })}
                </p>
              </div>

              <div className="actions">
                <div className="like">
                  {post?.likes?.length || 0}
                  <span>
                    <Form
                      method="post"
                      action={`toggle-like/${post?._id}`}
                    >
                      <button type="submit">
                        {' '}
                        {post?.likes?.includes(
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
                  {post?.comments?.length || 0}
                  <span>
                    <FaCommentDots />
                  </span>
                </div>
                <div className="views">
                  {post?.views || 0}
                  <span>
                    <FaEye />
                  </span>
                </div>
              </div>
              <p className="by">
                By{' '}
                {post.author?.firstName +
                  ' ' +
                  post.author?.lastName}{' '}
                • {post.readTime} min read
              </p>
            </div>
          </article>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .blogs {
    display: grid;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }

  @media (min-width: 992px) {
    .blogs {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
  }

  .blog {
    color: white;
    border-radius: 20px;
    box-shadow: var(--shadow-2);
    .img-container .img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      max-height: 300px;
      height: 300px;
    }

    .data {
      padding: 1.5rem 1rem;
      color: black;
      a {
        color: black;
        text-align: center;
      }

      .content {
        margin-top: 1rem;
        margin-bottom: 1rem;
        color: var(--grey-800);
        :last-child {
          margin-top: 0.5rem;
          text-transform: capitalize;
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

      .by {
        margin-top: 1rem;
        text-align: end;
      }
    }
  }
  .searchForm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    p {
      display: flex;
      color: black;
      font-size: 2rem;
      text-transform: uppercase;
      font-weight: bold;
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      input {
        width: 20rem;
        margin-top: 1rem;
      }
    }
  }
`;

export default Blog;
