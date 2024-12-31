import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';
import Logo from './Logo';
import { useAppContext } from '../context/AppContext';
import Sidebar from './Sidebar';
import NavLinks from './NavLinks';

const Navbar = () => {
  const { toggleSidebar, isSidebarOpen } =
    useAppContext();
  const [isscrolled, setIsScrolled] =
    useState('false');

  // Detect scrolling and change background opacity
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true); // Scrolled down 50px or more
    } else {
      setIsScrolled(false); // Not scrolled
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener(
      'scroll',
      handleScroll
    );

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  return (
    <Wrapper isscrolled={isscrolled}>
      <div className="nav-center">
        <Logo />
        <div
          className="menu-btn"
          onClick={toggleSidebar}
        >
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
  background-color: ${({ isscrolled }) =>
    isscrolled
      ? 'rgba(1, 1, 1, 1)'
      : 'rgba(1, 1, 1, 0.8)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
        top: 2rem;
        right: 2rem;
        transition: var(--transition);
      }
    }
  }
`;

export default Navbar;
