import React, { useState } from 'react';
import styled from 'styled-components';
import { Banner } from '../components';
import SilentEdgeX from '../assets/images/arms/SilentEdgeX.webp';
import { Link } from 'react-router-dom';

const Suppressor = () => {
  return (
    <Wrapper className="page">
      <Banner
        title={'accessories'}
        secondTitle={'suppressor'}
      />
      <div className="content">
        <h1>The SilentEdge X</h1>
        <p className="intro">
          Introducing the SilentEdge X, the newest
          innovation in firearm suppressor
          technology. Engineered for precision and
          stealth, it offers unparalleled noise
          reduction and performance.
        </p>

        <div className="details">
          <h2>Features of the SilentEdge X</h2>
          <ul>
            <li>
              Advanced baffle design for superior
              noise suppression.
            </li>
            <li>
              Lightweight titanium construction
              for enhanced durability and
              portability.
            </li>
            <li>
              Quick-detach mechanism for seamless
              attachment and removal.
            </li>
            <li>
              Minimal recoil impact for improved
              accuracy.
            </li>
          </ul>
          <h2>Performance Highlights</h2>
          <ul>
            <li>
              The SilentEdge X reduces noise
              levels by up to 40 dB, making it one
              of the most effective suppressors on
              the market. Its modular design
              allows for customization to fit
              various firearm types.
            </li>
          </ul>
          <h2>
            Legal and Compliance Information
          </h2>
          <ul>
            <li>
              As with all suppressors, ownership
              and use of the SilentEdge X are
              subject to local laws and
              regulations. Ensure you have the
              necessary permits and adhere to all
              applicable legal requirements.
            </li>
          </ul>
        </div>
        <div className="img-container">
          <img
            src={SilentEdgeX}
            alt="Silent Edge X"
            loading="lazy"
          />
          <Link to={'/products'} className="btn">
            shop now
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .content {
    h1 {
      margin: 3rem 0;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      background: linear-gradient(
        to right,
        #b00606,
        #450101
      );
      padding: 1rem 0;
      border-radius: 1rem;
    }
    p {
      line-height: 1.6;
      color: var(--grey-800);
    }
  }

  .details {
    ul {
      list-style-type: disc;
    }
    h2 {
      margin-bottom: 1rem;
      margin-top: 3rem;
    }
    li {
      margin-bottom: 0.6rem;
      margin-left: 5rem;
      color: var(--grey-800);
      line-height: 1.6;
    }
  }
  .img-container {
    display: grid;
    place-items: center;
  }
  img {
    width: 90%;
    border-radius: 1rem;
    max-width: 600px;
    margin: 3rem auto;
    max-height: 350px;
  }
`;

export default Suppressor;
