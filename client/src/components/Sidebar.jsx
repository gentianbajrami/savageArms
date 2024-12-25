import React from 'react';
import styled from 'styled-components';
import NavLinks from './NavLinks';

const Sidebar = () => {
  return (
    <Wrapper>
      <NavLinks isSidebar />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: #333;
  padding: 1rem;
  place-items: center;
  border-radius: var(--border-radius);
  .sidebarLinks {
    display: grid;
    gap: 1rem;
  }
`;
export default Sidebar;
