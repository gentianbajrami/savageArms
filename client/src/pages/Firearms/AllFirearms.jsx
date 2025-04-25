import { toast } from 'react-toastify';
import { FirearmsContainer, ProductFilters } from '../../components';
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
        <ProductFilters />
        <FirearmsContainer />
      </AllFirearmsContext.Provider>
    </>
  );
};

export const useAllFirearmsContext = () => useContext(AllFirearmsContext);

export default AllFirearms;
