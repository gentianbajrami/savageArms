import styled from 'styled-components';
import { Navbar } from '../components';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MainLayout;
