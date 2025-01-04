import React, { useState } from 'react';
import styled from 'styled-components';
import img1 from '../assets/images/arms/accucan_338-removebg-preview.png';
import img2 from '../assets/images/arms/accucan_22-removebg-preview.png';
import img3 from '../assets/images/arms//suppressor2-removebg-preview.png';
import { Link } from 'react-router-dom';

const data = [
  {
    type: 'AC338',
    threadPitch: '5/8"-24',
    modularity:
      'Replaceable Core and End Cap; Serialized Thread Mount',
    mounting:
      'Direct Thread Aluminum Mount w/Titanium Thread Insert',
    materials:
      '100% Machined 7075-T6 Alum. and 6Al-4V Ti.',
    features:
      'Built in Self Cleaning Carbon Cutters',
    soundReduction: '26" Barrel – 132.5 db',
    finish: 'Hard Coat Anodizing',
    weight: '18.5 oz',
    length: '10.9 inches',
    diameter: '1.75 inch',
    rateOfFire:
      'Controlled - 1 round every one second for up to 20 rounds. Then cool to ambient temperature',
    img: img1,
  },
  {
    type: 'AC350',
    threadPitch: '5/8"-24',
    modularity:
      'Replaceable Core and End Cap; Serialized Thread Mount',
    mounting:
      'Direct Thread Aluminum Mount w/Titanium Thread Insert',
    materials:
      '100% Machined 7075-T6 Alum. and 6Al-4V Ti.',
    features:
      'Built in Self Cleaning Carbon Cutters',
    soundReduction: '16.5" 350 Legend – 132.5 db',
    finish: 'Hard Coat Anodizing',
    weight: '10.8 oz',
    length: '7.9 inches',
    diameter: '1.75 inch',
    rateOfFire:
      'Controlled - 1 round every one second for up to 20 rounds. Then cool to ambient temperature',
    img: img2,
  },
  {
    type: 'AC30',
    threadPitch: '5/8"-24',
    modularity:
      'Replaceable Core and End Cap; Serialized Thread Mount',
    mounting:
      'Direct Thread Aluminum Mount w/Titanium Thread Insert',
    materials:
      '100% Machined 7075-T6 Alum. and 6Al-4V Ti.',
    features:
      'Built in Self Cleaning Carbon Cutters',
    soundReduction: '20" Barrel 300WM - 136.6 db',
    finish: 'Hard Coat Anodizing',
    weight: '10.8 oz',
    length: '7.9 inches',
    diameter: '1.75 inch',
    rateOfFire:
      'Controlled - 1 round every one second for up to 20 rounds. Then cool to ambient temperature',
    img: img3,
  },
];

const SuppressorTypes = () => {
  const [suppressorType, setSuppressorType] =
    useState(data?.[0] ?? '');
  const changeSuppressor = type => {
    setSuppressorType(
      data.find(supp => type === supp.type)
    );
  };

  return (
    <Wrapper>
      <h3>AccuCan MODELS TO CHOOSE FROM:</h3>
      <div className="types">
        {data.map(suppressor => {
          return (
            <div
              key={suppressor.type}
              className={`${
                suppressor.type ===
                  suppressorType.type &&
                'selected'
              }`}
              onClick={() =>
                changeSuppressor(suppressor.type)
              }
            >
              <p>{suppressor.type}</p>
            </div>
          );
        })}
      </div>
      <div className="img-container">
        <img
          src={suppressorType.img}
          alt="a"
          loading="laze"
        />
      </div>
      <div className="data">
        <p>
          Thread Pitch:{' '}
          <span>
            {suppressorType?.threadPitch}
          </span>
        </p>
        <p>
          Modularity:{' '}
          <span>
            {suppressorType?.modularity}
          </span>
        </p>
        <p>
          Mounting:{' '}
          <span>{suppressorType?.mounting}</span>
        </p>
        <p>
          Materials:{' '}
          <span>{suppressorType?.materials}</span>
        </p>
        <p>
          Features:{' '}
          <span>{suppressorType?.features}</span>
        </p>
        <p>
          Sound Reduction:{' '}
          <span>
            {suppressorType?.soundReduction}
          </span>
        </p>
        <p>
          Finish:{' '}
          <span>{suppressorType?.finish}</span>
        </p>
        <p>
          Weight:{' '}
          <span>{suppressorType?.weight}</span>
        </p>
        <p>
          Length:{' '}
          <span>{suppressorType?.length}</span>
        </p>
        <p>
          Diameter:{' '}
          <span>{suppressorType?.diameter} </span>
        </p>
      </div>
      <div className="btnContainer">
        <Link to={'/'} className="btn">
          Shop now
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--grey-100);
  padding: 2rem 1rem;
  border-radius: 1rem;
  margin-top: 5rem;
  .btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  h3 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .types {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--primary-500);
    transition: var(--transition);
    max-width: 600px;
    margin: 0 auto;
    flex-wrap: wrap;
    p {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.2rem;
      padding: 0.2rem 2rem;
      border-radius: var(--border-radius);
    }
    .selected {
      background-color: white;
      color: var(--primary-500);
      border-bottom: 1px solid var(--primary-500);
      transition: var(--transition);
    }
  }
  .data {
    max-width: 600px;
    margin: 0 auto;
    p {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--grey-500);
      padding-bottom: 0.3rem;
    }
    span {
      font-weight: 400;
      margin-left: 30px;
      color: var(--grey-800);
    }
  }
  .img-container {
    img {
      width: 80%;
      max-width: 500px;
    }
  }
`;
export default SuppressorTypes;
