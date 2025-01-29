import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardLinks from './DashboardLinks';
import { GiPistolGun } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout';
const BigSidebar = () => {
  const { showSidebar, toggleSidebar } =
    useDashboardContext();

  return (
    <Wrapper>
      <div
        className={`${
          showSidebar
            ? 'sidebar-container'
            : 'sidebar-container show-sidebar'
        }`}
      >
        <div className="logo">
          <GiPistolGun /> G-Arms
        </div>

        <div className="links">
          <DashboardLinks
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="sidebar-footer">
          <p>
            �� 2025 G-Arms. All rights reserved.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      min-height: 100vh;
      height: 100%;
      display: grid;
      grid-template-rows: auto 1fr auto;
      padding: 1rem;
      text-align: center;
      transition: margin-left 0.5s ease-in-out;
      margin-left: -29rem;
      padding-top: 3rem;
      background-color: var(
        --background-secondary-color
      );
    }
    .show-sidebar {
      margin-left: 0;
    }
  }
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeSidebar {
    color: red;
    font-size: 2rem;
    transition: var(--transition);
    &:hover {
      color: darkred;
    }
  }
  .logo {
    color: black;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .links {
    display: grid;
    place-items: center;
  }
  .sidebar-footer {
    padding: 2rem;
  }
  .pending{
    background: var(--background-color);
  }
`;

export default BigSidebar;
