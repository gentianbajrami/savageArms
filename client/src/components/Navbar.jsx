import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';
import Logo from './Logo';
import { useAppContext } from '../context/AppContext';
import Sidebar from './Sidebar';
import NavLinks from './NavLinks';

const Navbar = ({ isScrolled }) => {
  const { toggleSidebar, isSidebarOpen } = useAppContext();

  return (
    <Wrapper $isScrolled={isScrolled}>
      <div className="nav-center">
        <Logo />
        <div className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
          {isSidebarOpen && (
            <div className="sidebar">
              <Sidebar />
            </div>
          )}
        </div>
        <NavLinks />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 100%;
  background-color: ${({ $isScrolled }) =>
    $isScrolled ? 'rgba(1, 1, 1, 1)' : 'rgba(1, 1, 1, 0.8)'};
  position: ${({ $isScrolled }) => ($isScrolled ? 'fixed' : 'absolute')};
  top: ${({ $isScrolled }) => ($isScrolled ? '0' : '3rem')};
  z-index: 1000;
  height: 5rem;
  display: grid;
  place-items: center;
  transition: background-color 0.6s ease-in-out;

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
    .navLinks {
      justify-self: end;
    }
    .sidebar {
      display: none;
    }

    @media (max-width: 992px) {
      .menu-btn {
        display: block;
        position: relative;
        justify-self: end;
        font-size: 2rem;
        color: white;
        transition: 1s all ease-in-out;
        &:hover svg {
          scale: calc(1.2);
          color: aliceblue;
        }
      }

      .navLinks {
        display: none;
      }
      
      .sidebar {
        display: block;
        position: absolute;
        border: 2px solid red;
        top: 2rem;
        right: 2rem;
        transition: var(--transition);
      }
    }
  }
`;

export default Navbar;
