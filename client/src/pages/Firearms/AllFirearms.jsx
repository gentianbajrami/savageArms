import { toast } from 'react-toastify';
import { FirearmsContainer, SearchContainer } from '../../components';
import customFetch from '../../utils/index';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/firearms');
    console.log(data);

    return { data };
  } catch (error) {
    console.error('Error fetching firearms:', error);
    toast.error(error?.response?.data?.msg || 'Failed to load firearms');
    return null;
  }
};

const AllFirearmsContext = createContext();
const AllFirearms = () => {
  const { data } = useLoaderData();
  return (
    <>
      <AllFirearmsContext.Provider value={{ data }}>
        <SearchContainer />
        <FirearmsContainer />
      </AllFirearmsContext.Provider>
    </>
  );
};

export const useAllFirearmsContext = () => useContext(AllFirearmsContext);

export default AllFirearms;
