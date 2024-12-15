import React from 'react';
import { GiPistolGun } from 'react-icons/gi';
import { redirect } from 'react-router-dom';
import styled from 'styled-components';
const Logo = () => {
  return (
    <Wrapper href="/">
      <GiPistolGun />
      G-Arms
    </Wrapper>
  );
};

const Wrapper = styled.a`
  justify-self: start;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  svg {
    font-size: 3.5rem;
  }
`;

export default Logo;
