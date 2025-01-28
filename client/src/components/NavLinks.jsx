import React from 'react';
import styled from 'styled-components';
import {
  FaSearch,
  FaMagento,
} from 'react-icons/fa';

const NavLinks = ({ isSidebar = false }) => {
  return (
    <Wrapper
      className={`${
        isSidebar ? 'sidebarLinks' : 'navLinks'
      }`}
    >
      <li>
        <a href="#">Firearms</a>
      </li>
      <li>
        <a href="/accessories">Accessories</a>
      </li>
      <li>
        <a href="#">Performance</a>
      </li>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a href="#">
          <FaMagento />
        </a>
      </li>
      <li>
        <a href="#">
          <FaSearch />
        </a>
      </li>
    </Wrapper>
  );
};
const Wrapper = styled.ul`
  display: flex;
  font-size: 1.1rem;
  text-transform: uppercase;
  margin-right: 2rem;
  color: white;
  li {
    padding: 0.5rem 1rem;
    letter-spacing: 1px;
    border-radius: 5px;
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: 400;
  }
  li:hover,
  li:hover a {
    background-color: antiquewhite;
    color: black;
  }
  li:hover svg {
    color: black !important;
  }
`;
export default NavLinks;
