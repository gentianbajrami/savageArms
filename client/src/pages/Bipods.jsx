import React, { useState } from 'react';
import styled from 'styled-components';
import { Banner } from '../components';
import SilentEdgeX from '../assets/images/arms/SilentEdgeX.webp';
import { Link } from 'react-router-dom';

const Bipods = () => {
  return (
    <Wrapper className="page">
      <Banner
        title={'accessories'}
        secondTitle={'bipods'}
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

const Wrapper = styled.div``;

export default Bipods;
