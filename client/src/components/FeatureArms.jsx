import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';

import { useLoaderData } from 'react-router-dom';
import {
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';

const AUTO_INTERVAL = 3000; // ms between auto slides
const VISIBLE_COUNT = 3; // how many products are visible

/* ─────────────────────────────── component ─────────────────────────────── */
const FeatureArmsCarousel = () => {
  const [index, setIndex] = useState(0);
  const { products } = useLoaderData();

  // auto-slide every AUTO_INTERVAL ms
  const next = () => {
    setIndex(
      prev => (prev + 1) % products.length
    );
  };
  const prev = () => {
    setIndex(
      prev =>
        (prev - 1 + products.length) %
        products.length
    );
  };

  return (
    <Wrapper>
      <div className="prev" onClick={prev}>
        <FaChevronLeft />
      </div>

      <div className="slider">
        {products.map((p, i) => {
          // circular offset
          const offsetIndex =
            (i - index + products.length) %
            products.length;
          // use multiples of own width: 0, 100%, 200%, ...
          const offsetPercent = offsetIndex * 100;
          // mark only first VISIBLE_COUNT items as visible
          const isVisible =
            offsetIndex < VISIBLE_COUNT;

          return (
            <div
              key={p.id}
              className={`slider-item ${
                isVisible ? 'visible' : ''
              }`}
              style={{
                transform: `translateX(${offsetPercent}%)`,
              }}
            >
              <img
                src={p.photo}
                alt={p.fullName}
              />
              <p>{p.fullName}</p>
            </div>
          );
        })}
      </div>

      <div className="next" onClick={next}>
        <FaChevronRight />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* min-height: 100vh; */
  width: 90%;
  display: grid;
  place-items: center;
  grid-template-columns: 50px 1fr 50px;
  margin: 4rem auto;
  .prev,
  .next {
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider {
    position: relative;
    width: 100%;
    height: 300px; /* adjust height as needed */
    overflow: hidden;
  }

  .slider-item {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 3rem;
    width: calc(100% / ${VISIBLE_COUNT});
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    transition: transform 1.5s ease,
      opacity 0.1s ease;
    opacity: 0;
  }

  .slider-item.visible {
    opacity: 1;
  }

  .slider-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  @media (min-width: 992px) {
    .slider-item img {
      width: 340px;
      height: 180px;
    }
  }

  .slider-item p {
    margin-top: 1rem;
    text-align: center;
    font-weight: 500;
  }
`;

export default FeatureArmsCarousel;
