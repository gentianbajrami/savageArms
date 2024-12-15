import styled from 'styled-components';
import { Navbar } from '../components';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MainLayout;
