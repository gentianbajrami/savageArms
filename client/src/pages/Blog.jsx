import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
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
import Loading from '../components/Loading';

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

  const blogs = data?.posts || [];

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

      <ListContainer>
        {blogs.map(post => (
          <ArticleItem key={post._id}>
            <Link to={`/post/${post.slug}`}>
              <Title>{post.title}</Title>
            </Link>
            <Meta>
              By {post.author.username} •{' '}
              {post.readTime} min read
            </Meta>
          </ArticleItem>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ArticleItem = styled.article`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
`;

const Meta = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 8px 0 0;
`;

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
