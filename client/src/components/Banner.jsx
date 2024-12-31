import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Banner = ({ title }) => {
  return (
    <Wrapper>
      <Link to={'/'}>
        <FaHome />
      </Link>
      <h6>{'>'}</h6>
      <Link to={`/${title}`}>{title}</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 2rem auto;
  align-items: center;
  a,
  h6 {
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--grey-500);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  a:last-child {
    font-size: 1.1rem;
    color: #b00606;
  }
`;
export default Banner;
