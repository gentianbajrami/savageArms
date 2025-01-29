import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SecondaryMenu = ({ isScrolled }) => {
  return (
    <Wrapper className={`secondary-menu ${isScrolled ? 'hidden' : ''}`}>
      <div className="menu-container">
        <div className="menu-left">
          <p>shop</p>
        </div>
        <div className="menu-right">
          <Link to="/register" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: rgba(1, 1, 1, 0.7);
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  transition: transform 0.3s ease;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .menu-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    @media (min-width: 992px) {
      padding: 0 7.5rem; /* Push left/right on larger screens */
    }
  }

  .menu-left {
    display: flex;
    align-items: center;
  }

  .menu-right {
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }

  .btn {
    margin-left: 1rem;
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  &.hidden {
    transform: translateY(-100%);
  }
`;

export default SecondaryMenu;
