import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  Outlet,
  useNavigation,
} from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import {
  BigSidebar,
  DashboardNavbar,
  SmallSidebar,
} from '../../components';
import Loading from '../../components/Loading';

const DashboardContext = createContext();
const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] =
    useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navigation = useNavigation();
  const isPageLoading =
    navigation.state === 'loading';

  return (
    <DashboardContext.Provider
      value={{ toggleSidebar, showSidebar }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            {/*Dashboard Navbar TODO */}
            <DashboardNavbar />
            <div className="dashboard-page">
              {isPageLoading ? (
                <Loading />
              ) : (
                <Outlet />
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () =>
  useContext(DashboardContext);

const Wrapper = styled.div`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default DashboardLayout;
