import styled from 'styled-components';
import { Navbar } from '../components';
import {
  Outlet,
  useNavigation,
} from 'react-router-dom';
import Footer from './Footer';
import Loading from '../components/Loading';

const MainLayout = () => {
  const navigation = useNavigation();
  const isPageLoading =
    navigation.state === 'loading';
  return (
    <Wrapper>
      <Navbar />
      {isPageLoading ? <Loading /> : <Outlet />}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MainLayout;
