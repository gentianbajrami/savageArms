import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { Navbar } from '../components';
import {
  Outlet,
  useNavigation,
  useLoaderData,
} from 'react-router-dom';
import Footer from './Footer';
import Loading from '../components/Loading';
import SecondaryMenu from '../components/SecondaryMenu';
import { userQuery } from '../utils/allQueryForProject';

export const loader = queryClient => async () => {
  let user;
  try {
    const data1 =
      await queryClient.ensureQueryData(
        userQuery
      );
    user = data1?.user;
  } catch (error) {
    if (error?.data?.status == 401) {
      user = null;
    }
  }

  return { user };
};

const MainLayout = ({ queryClient }) => {
  const navigation = useNavigation();
  const isPageLoading =
    navigation.state === 'loading';
  const [isScrolled, setIsScrolled] =
    useState(false);

  const { user } = useLoaderData();

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
      <SecondaryMenu
        isScrolled={isScrolled}
        queryClient={queryClient}
      />
      <Navbar isScrolled={isScrolled} />
      {isPageLoading ? (
        <Loading />
      ) : (
        <Outlet context={user} />
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

export default MainLayout;
