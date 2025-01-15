import React from 'react';
import styled from 'styled-components';
import DashboardLinks from './DashboardLinks';
import { GiPistolGun } from 'react-icons/gi';
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout';
import { FaTimes } from 'react-icons/fa';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } =
    useDashboardContext();

  return (
    <Wrapper>
      <div
        className={`${
          showSidebar
            ? 'sidebar-container show-sidebar'
            : 'sidebar-container'
        }`}
      >
        <div className="content">
          <button
            className="close-btn"
            type="button"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <div className="logo">
            <GiPistolGun /> G-Arms
          </div>

          <div className="links">
            <DashboardLinks
              toggleSidebar={toggleSidebar}
              shouldToggle
            />
          </div>
          <div className="sidebar-footer">
            <p>
              �� 2025 G-Arms. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .logo {
    color: black;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .links {
    margin-bottom: 5rem;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  @media (min-width: 992px) {
    display: none;
  }
`;
export default SmallSidebar;
