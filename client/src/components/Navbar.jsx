import React from 'react';
import styled from 'styled-components';

import {
  FaSearch,
  FaMagento,
  FaBars,
} from 'react-icons/fa';
import Logo from './Logo';
const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <Logo />
        <div className="menu-btn">
          <FaBars />
        </div>

        <div className="links">
          <a href="#">Firearms</a>
          <a href="#">Accessories</a>
          <a href="#">Performance</a>
          <a href="#">Blog</a>
          <a href="#">
            <FaMagento />
          </a>
          <a href="#">
            <FaSearch />
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 100%;
  background: rgba(1, 1, 1, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 5rem;
  display: grid;
  place-items: center;
  .nav-center {
    display: grid;
    grid-template-columns: 300px 1fr;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1240px;
    margin: 0 auto;

    .menu-btn {
      display: none;
    }
    .links {
      justify-self: end;
      display: flex;
      font-size: 1.1rem;
      text-transform: uppercase;
      margin-right: 2rem;

      color: white;
      a {
        color: white;
        text-decoration: none;
        font-weight: 400;
        padding: 0.5rem 1rem;
        letter-spacing: 1px;
        border-radius: 5px;
      }
      :hover {
        background-color: antiquewhite;
        color: black;
      }
    }
    @media (max-width: 992px) {
      .menu-btn {
        display: block;
        justify-self: end;
        font-size: 2rem;
        color: white;
        transition: 1s all ease-in-out;
        &:hover {
          scale: calc(1.2);
          color: aliceblue;
        }
      }

      .links {
        display: none;
      }
    }
  }
`;

export default Navbar;
