import React from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const DashboardLinks = ({ toggleSidebar, shouldToggle = false, user }) => {
  return (
    <Wrapper>
      {links.map((link) => {
        const { text, path, icon } = link;

        if (user?.role !== 'admin' && path === '/admin') {
          return null;
        }

        return (
          <NavLink
            key={text}
            to={path}
            className="nav-link"
            end
            onClick={shouldToggle ? toggleSidebar : undefined}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--grey-900);
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    text-transform: capitalize;
    font-size: 1.3rem;
    &:hover {
      color: var(--primary-500);
    }

    .icon {
      margin-right: 10px;
      font-size: 1.3rem;
    }
  }
`;

export default DashboardLinks;
