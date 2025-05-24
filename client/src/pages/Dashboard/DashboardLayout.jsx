import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { BigSidebar, DashboardNavbar, SmallSidebar } from '../../components';
import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from '../../utils';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
export const loader = async () => {
  try {
    const data = await customFetch.get('/users/current-user');
    return { user: data.data.user };
  } catch (error) {
    return redirect('/');
  }
};
import Loading from '../../components/Loading';

// const userQuery = {
//   queryKey: ['user'],
//   queryFn: async () => {
//     const { data } = await customFetch.get('/users/current-user');
//     return data;
//   },
// };

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);

  // const [isAuthError, setIsAuthError] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    // queryClient.invalidateQueries();
    toast.success('Logging out...');
  };

  if (!user) {
    return <Loading />;
  }

  // const { data: user } = useQuery(userQuery);

  // customFetch.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error?.response?.status === 401) {
  //       setIsAuthError(true);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // useEffect(() => {
  //   if (!isAuthError) return;
  //   logoutUser();
  // }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <DashboardNavbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);

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
