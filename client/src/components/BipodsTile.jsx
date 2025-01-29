import React from 'react';
import styled from 'styled-components';
import tile1 from '../assets/images/arms/bipods/tile_1.jpg';
import tile2 from '../assets/images/arms/bipods/tile_2.jpg';
import tile3 from '../assets/images/arms/bipods/tile_3.jpg';
import tile4 from '../assets/images/arms/bipods/tile_4.jpg';
import tile5 from '../assets/images/arms/bipods/tile_5.jpg';
import tile6 from '../assets/images/arms/bipods/tile_6.jpg';

const data = [
  {
    text: 'ADJUSTABLE TILT (CANT) TENSION LEVER',
    img: tile1,
  },
  {
    text: 'INTUITIVE BUTTONLESS STOWING',
    img: tile2,
  },
  { text: 'QUICK FLICK TO DEPLOY', img: tile3 },
  { text: 'NUMBERED LEG POSITIONS', img: tile4 },
  {
    text: 'BUTTON INTERNALS SHIELDED FROM DEBRIS',
    img: tile5,
  },
  {
    text: 'HIGH-TRACTION RUBBER FEET',
    img: tile6,
  },
];
const BipodsTile = () => {
  return (
    <Wrapper>
      {data.map(tile => {
        return (
          <div key={tile.text} className="tile">
            <img src={tile.img} alt={tile.text} />
            <h5>{tile.text}</h5>
          </div>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(400px, 1fr)
  );
  gap: 1rem;
  margin: 2rem 0;
  .tile {
    text-align: center;
    padding: 1rem;
    cursor: pointer;
    h5 {
      color: var(--grey-700);
      font-size: 1.1rem;
    }
  }
`;
export default BipodsTile;
