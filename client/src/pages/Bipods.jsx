import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Banner,
  BipodsTile,
  BipodsType,
} from '../components';
import SilentEdgeX from '../assets/images/arms/SilentEdgeX.webp';
import { Link } from 'react-router-dom';
import featureImg from '../assets/images/content/featureImgBipods.jpg';

const Bipods = () => {
  return (
    <Wrapper className="page">
      <Banner
        title={'accessories'}
        secondTitle={'bipods'}
      />
      <div className="content">
        <h1>G-Arms Bipods</h1>
        <p className="intro">
          In the world of shooting and hunting,
          the pursuit of perfect equipment is
          endless. Yet, every so often, a product
          comes into the market that stands a cut
          above the rest. Enter the G-Arms line of
          Suppressors.
        </p>

        <div className="features">
          <div className="info">
            <h2>Features:</h2>
            <ul>
              <li>
                Effortless one-handed control
              </li>
              <li>
                Rubber feet for unmatched grip in
                any terrain
              </li>
              <li>
                Lightweight premium polymer blend
              </li>
              <li>
                Ergonomic design for comfort and
                ease of use
              </li>
            </ul>
          </div>
          <div className="featureImg">
            <img
              src={featureImg}
              loading="lazy"
              alt="Bipods Image"
              className="img"
            />
          </div>
        </div>
        <BipodsType />
        <BipodsTile />
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
      text-align: center;
      font-size: 1.2rem;
    }
  }

  .features {
    display: grid;
    width: 90%;
    margin: 3rem auto;
    border-top: 2px solid var(--primary-500);
    padding-top: 3rem;
    .info {
      color: var(--grey-700);
      h2 {
        margin-bottom: 1rem;
      }
      ul {
        list-style-type: square;
        margin-left: 1rem;
        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
  @media (min-width: 768px) {
    .features {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 2rem;
      .info {
        justify-self: end;
      }
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

export default Bipods;
