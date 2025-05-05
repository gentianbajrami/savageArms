import React from 'react';
import customFetch from '../../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  FormRow,
  SingleBlog,
  SingleBlogDashboard,
} from '../../components';
import { useQuery } from '@tanstack/react-query';
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import PageBtnContainer from '../../components/PageBtnContainer';
import { blogsQuery } from '../../utils/allQueryForProject';

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
      toast.error(
        error?.response?.data?.msg ||
          'something went wrong'
      );
      return redirect('/dashboard');
    }
  };

const BlogDashboard = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(
    blogsQuery(searchValues)
  );

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
  console.log(data);

  const blogs = data?.posts || [];
  const numOfPages = data?.numOfPages;
  console.log(blogs);
  return (
    <Wrapper>
      <div className="search">
        <Form className="form">
          <FormRow
            type="search"
            name={'search'}
            defaultValue={searchValues?.search}
            onChange={debounce(form =>
              submit(form)
            )}
          />

          <Link
            to={'/dashboard/create-blog'}
            className="btn form-btn "
            style={{ marginRight: '1rem' }}
          >
            Create new blog
          </Link>

          <Link
            to={'/dashboard/blog'}
            className="btn form-btn delete-btn"
          >
            Reset search value
          </Link>
        </Form>
      </div>
      {blogs?.length === 0 ? (
        <>
          <h3 className="noBlog">
            No blog found reset the filter or
            create a new blog
          </h3>
        </>
      ) : (
        <div className="blog">
          {blogs.map(blog => {
            return (
              <SingleBlogDashboard
                key={blog?._id}
                {...blog}
              />
            );
          })}

          {numOfPages > 1 && (
            <PageBtnContainer
              currentPage={data?.currentPage}
              numOfPages={numOfPages}
            />
          )}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    margin-top: 0;
  }
  .search {
    text-align: center;
    margin-bottom: 3rem;
    input {
      padding: 0.5rem;
      border: 1px solid var(--grey-300);
      border-top-left-radius: var(
        --border-radius
      );
      border-bottom-left-radius: var(
        --border-radius
      );
    }
    button {
      padding: 0.5rem 2rem;
      border: 1px solid var(--grey-300);
      background-color: var(--primary-500);
      color: white;
      border-top-right-radius: var(
        --border-radius
      );
      border-bottom-left-radius: var(
        --border-radius
      );
    }
  }
  .blog {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(
      auto-fill,
      minmax(400px, 1fr)
    );
    gap: 1rem;
  }
  .noBlog {
    letter-spacing: var(--letter-spacing);
    line-height: 1.2;
  }
`;

export default BlogDashboard;
