import { createContext, useState, useContext, useEffect } from 'react';
import customFetch from '../utils';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await customFetch.get('/users/current-user', {
        withCredentials: true,
      });
      saveUser(data.user);
    } catch (error) {
      removeUser();
    } finally {
      setIsUserLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await customFetch.get('/auth/logout', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setIsSidebar(!isSidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        user,
        isUserLoading,
        saveUser,
        removeUser,
        logoutUser,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
