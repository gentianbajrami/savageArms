import React from 'react';
import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import {
  NavLink,
  useLoaderData,
} from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const NavLinks = ({ isSidebar = false }) => {
  const { user } = useAppContext();
  return (
    <Wrapper
      className={`${
        isSidebar ? 'sidebarLinks' : 'navLinks'
      }`}
    >
      <NavLink to="/products">
        <p>Firearms</p>
      </NavLink>
      <NavLink to="/accessories">
        <p>Accessories</p>
      </NavLink>
      <NavLink to="/performance">
        <p>Performance</p>
      </NavLink>
      <NavLink to={'/blog'}>
        <p>Blog</p>
      </NavLink>
      {user && (
        <NavLink to="/cart">
          <p className="cart">
            <FaCartPlus />
          </p>
        </NavLink>
      )}
      {/* <li>
        <a to="#">
          <FaSearch />
        </a>
      </li> */}
    </Wrapper>
  );
};
const Wrapper = styled.ul`
  display: flex;
  font-size: 1.1rem;
  text-transform: uppercase;
  color: white;
  a {
    padding: 0.5rem 1rem;
    letter-spacing: 1px;
    border-radius: 5px;
  }
  p {
    color: white;
    text-decoration: none;
    font-weight: 400;
  }
  a:hover,
  a:hover p {
    background-color: antiquewhite;
    color: black;
  }
  a:hover svg {
    color: black !important;
  }
`;
export default NavLinks;
