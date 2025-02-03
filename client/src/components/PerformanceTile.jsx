import React from 'react';
import styled from 'styled-components';
import img1 from '../assets/images/arms/accufit.jpg';
import img2 from '../assets/images/arms/accuStock.jpg';
import img3 from '../assets/images/arms/acuu1.jpg';

const data = [
  {
    title: 'AccuTrigger',
    text: 'The AccuTrigger system is easily adjustable by the shooter,clean pull with no creep,and prevents the firearm from discharging if jarred or dropped.',
    img: img1,
  },
  {
    title: 'AccuFit',
    text: 'The AccuFit system uses an exclusive combination of interchangeable comb risers and length-of-pull inserts to create a custom fit for any shooter.',
    img: img2,
  },
  {
    title: 'AccuStock',
    text: 'The AccuStock is an aluminum rail system embedded in the forend of the stock that three-dimensionally engages the stock along its entire length providing rigidity ',
    img: img3,
  },
];
const PerformanceTile = () => {
  return (
    <Wrapper>
      {data.map(({ title, text, img }) => (
        <article key={title} className="tile">
          <img src={img} alt={title} />
          <div className="data">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  .tile {
    max-height: 700px;
    margin-bottom: 5rem;
    max-width: 400px;
    background: var(--grey-200);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    &:hover {
      box-shadow: var(--shadow-4);
    }
    img {
      height: 350px;
      object-fit: cover;
      width: 100%;
      border-top-left-radius: var(
        --border-radius
      );
      border-top-right-radius: var(
        --border-radius
      );
    }
    .data {
      padding: 1rem 2rem;
      h3 {
        margin-bottom: 1rem;
      }
      p {
        margin-bottom: 1rem;
        line-height: 1.3;
        font-size: 1.1rem;
      }
    }
  }
`;
export default PerformanceTile;
