import React from 'react';
import styled from 'styled-components';
import {
  Link,
  useLoaderData,
} from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Adjust path if needed
import customFetch from '../utils';

const SecondaryMenu = ({
  isScrolled,
  queryClient,
}) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const handleDashboardClick = e => {
    e.preventDefault();
    if (!user) {
      toast.error(
        'You must be logged in to access the dashboard.'
      );
    } else {
      navigate('/dashboard');
    }
  };

  const logoutUser = async () => {
    await customFetch('/auth/logout');
    queryClient.removeQueries();
    navigate('/');
    toast.success('Logging out...');
  };

  return (
    <Wrapper
      className={`secondary-menu ${
        isScrolled ? 'hidden' : ''
      }`}
    >
      <div className="menu-container">
        <div className="dashboard">
          <span
            className="btn"
            onClick={handleDashboardClick}
          >
            Dashboard
          </span>
        </div>
        <div className="menu-right">
          {user ? (
            <>
              <span className="welcome-msg">
                Welcome, {user.firstName}!
              </span>
              <Link
                className="btn"
                onClick={logoutUser}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="btn"
              >
                Register
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </>
          )}
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
      padding: 0 7.5rem;
    }
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

  .welcome-msg {
    color: white;
    font-weight: bold;
    margin-left: 1rem;
  }

  &.hidden {
    transform: translateY(-100%);
  }
`;

export default SecondaryMenu;
