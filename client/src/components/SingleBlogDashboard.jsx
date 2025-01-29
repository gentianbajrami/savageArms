import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import styled from 'styled-components';

const SingleBlogDashboard = ({
  image,
  title,
  content,
  _id,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(prevState => !prevState);
  };

  return (
    <Wrapper>
      <img src={image} alt="no image" />
      <div className="content">
        <h2>{title}</h2>
        {content.length > 200}
        {showMore ? (
          <p>{content}</p>
        ) : content.length > 200 ? (
          <p>
            {content.slice(0, 200)} ...{' '}
            <button
              onClick={toggleShowMore}
              className="showMoreBtn"
            >
              Show more
            </button>
          </p>
        ) : (
          <p>{content}</p>
        )}
        {showMore && (
          <button
            className="showMoreBtn"
            onClick={toggleShowMore}
          >
            Show less
          </button>
        )}
        <div className="actions">
          <Link
            to={`../edit-blog/${_id}`}
            className="btn"
          >
            Edit
          </Link>
          <Form
            method="post"
            action={`../delete-blog/${_id}`}
          >
            <button type="submit" className="btn">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: grid;
  grid-template-rows: 300px auto;
  gap: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  max-width: 400px;
  justify-self: center;
  img {
    width: 400px;
    height: 300px;
    object-fit: cover;
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
  }
  &:hover {
    box-shadow: var(--shadow-4);
  }

  .content {
    padding: 1rem;
    h2 {
      margin-bottom: 1rem;
      text-align: center;
      letter-spacing: var(--letter-spacing);
    }
    p {
      margin: 0;
      color: var(--grey-800);
      line-height: 1.3;
      letter-spacing: var(--letter-spacing);
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 1.3rem;
  }

  .showMoreBtn {
    background: transparent;
    color: red;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: var(--transition);
  }
  .showMoreBtn:hover {
    color: darkred;
  }
`;

export default SingleBlogDashboard;
