import Firearm from './Firearm';
import { useAllFirearmsContext } from '../pages/Firearms/AllFirearms';
import styled from 'styled-components';

const FirearmsContainer = () => {
  const { data } = useAllFirearmsContext();
  const { firearms } = data;
  if (firearms.length === 0) {
    return (
      <Wrapper>
        <h2>No firearms to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="firearms">
        {firearms.map((firearm) => {
          return <Firearm key={firearm._id} {...firearm} />;
        })}
      </div>
    </Wrapper>
  );
};
export default FirearmsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .firearms {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .firearms {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
