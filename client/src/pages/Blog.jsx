import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import customFetch from '../utils';
import {
  Banner,
  FormRow,
  Logo,
  SingleBlog,
} from '../components';
import PageBtnContainer from '../components/PageBtnContainer';

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

const Blog = () => {
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

  console.log(searchValues);

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
      {data?.blogs?.length === 0 ? (
        <>
          <h3 className="noBlog">
            No blog found reset the filter
          </h3>
        </>
      ) : (
        <>
          <div className="blogs">
            {data?.blogs.map(blog => {
              return (
                <SingleBlog
                  key={blog?._id}
                  {...blog}
                />
              );
            })}
          </div>
          {data?.numOfPages > 1 && (
            <PageBtnContainer
              currentPage={data?.currentPage}
              numOfPages={data?.numOfPages}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .blogs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
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
