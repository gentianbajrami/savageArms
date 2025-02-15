import React, { useState } from 'react';
import styled from 'styled-components';
import img1 from '../assets/images/arms/bipod1.png';
import img2 from '../assets/images/arms/bipod2.png';
import { Link } from 'react-router-dom';

const data = [
  {
    type: 'm-lok Bipod',
    weight: '11oz',
    materials: 'High strength polymer',
    height:
      '7.2" - 10" as measured by the pivot point',
    'Head Adjustments': '50° - Cant',
    'Footprint Width': '9" - 11.5"',
    sku: '56310',
    img: img1,
  },
  {
    type: 'sling swivel bipod',
    weight: '12.5 oz',
    materials: 'High strength polymer',
    height:
      '7.2" - 10" as measured by the pivot point',
    'Head Adjustments': '50° - Cant',
    'Footprint Width': '9" - 11.5"',
    sku: '56311',
    img: img2,
  },
];

const SuppressorTypes = () => {
  const [bipodType, setBipodType] = useState(
    data?.[0] ?? ''
  );
  const changeSuppressor = type => {
    setBipodType(data.find(b => type === b.type));
  };

  return (
    <Wrapper>
      <h3>BIPODTM MODELS TO CHOOSE FROM:</h3>
      <div className="types">
        {data.map(bipod => {
          return (
            <div
              key={bipod.type}
              className={`${
                bipod.type === bipodType.type &&
                'selected'
              }`}
              onClick={() =>
                changeSuppressor(bipod.type)
              }
            >
              <p>{bipod.type}</p>
            </div>
          );
        })}
      </div>
      <div className="img-container">
        <img
          src={bipodType.img}
          alt="a"
          loading="laze"
        />
      </div>
      <div className="data">
        <p>
          weight: <span>{bipodType?.weight}</span>
        </p>
        <p>
          materials:{' '}
          <span>{bipodType?.materials}</span>
        </p>
        <p>
          height: <span>{bipodType?.height}</span>
        </p>
        <p>
          Head Adjustments:{' '}
          <span>
            {bipodType?.['Head Adjustments']}
          </span>
        </p>
        <p>
          Footprint Width:{' '}
          <span>
            {bipodType?.['Footprint Width']}
          </span>
        </p>
        <p>
          SKU: <span>{bipodType?.sku}</span>
        </p>
        <div className="btnContainer">
          <Link to={'/products'} className="btn">
            shop now
          </Link>
        </div>
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
      text-align: start;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--grey-500);
      padding-bottom: 0.3rem;
      padding-left: 4rem;
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
  .btnContainer {
    display: flex;
    justify-content: center;
  }
`;
export default SuppressorTypes;
