import Landing from './Landing';
import { FeatureArms } from '../components';
import {
  allProductsQuery,
  userQuery,
} from '../utils/allQueryForProject';

export const loader = queryClient => async () => {
  const data = await queryClient.ensureQueryData(
    allProductsQuery({ search: '' })
  );

  return {
    products: data?.data?.products || [],
  };
};

const Home = () => {
  return (
    <>
      <Landing />
      <FeatureArms />
    </>
  );
};
export default Home;
