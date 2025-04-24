import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { Navbar } from '../components';
import {
  Outlet,
  useNavigation,
} from 'react-router-dom';
import Footer from './Footer';
import Loading from '../components/Loading';
import SecondaryMenu from '../components/SecondaryMenu';
import {
  cartQuery,
  userQuery,
} from '../utils/allQueryForProject';
import { useQuery } from '@tanstack/react-query';

export const loader = queryClient => async () => {
  const user = await queryClient.ensureQueryData(
    userQuery
  );
  console.log(user);
  return null;
};

const MainLayout = () => {
  const navigation = useNavigation();
  const isPageLoading =
    navigation.state === 'loading';
  const [isScrolled, setIsScrolled] =
    useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener(
      'scroll',
      handleScroll
    );
    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  return (
    <Wrapper>
      <SecondaryMenu isScrolled={isScrolled} />
      <Navbar isScrolled={isScrolled} />
      {isPageLoading ? <Loading /> : <Outlet />}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

export default MainLayout;
