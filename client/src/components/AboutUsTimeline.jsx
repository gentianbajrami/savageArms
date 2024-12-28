import React from 'react';
import styled from 'styled-components';

const data = [
  {
    year: '1990',
    event: 'Founded by Dr. Michael Cooper',
    description:
      'Savage Arms was founded by Dr. Michael Cooper, a pistol maker and historian.',
  },
  {
    year: '2000s',
    event: 'Manufacturing Begins',
    description:
      'The company began manufacturing pistols in the United States.',
  },
  {
    year: '2010s',
    event: 'Manufacturing Expands to Europe',
    description:
      'The company expanded its manufacturing facilities to Europe.',
  },
  {
    year: '2020s',
    event: 'Technology Advances',
    description:
      'The company continues to improve its technology and designs.',
  },
];
const AboutUsTimeline = () => {
  return (
    <Wrapper>
      <h2>Timeline Overview</h2>
      <div className="timeline">
        {data.map((item, index) => (
          <div
            key={index}
            className="timeline-item"
          >
            <h3 className="firstDate">
              {item.year}
            </h3>
            <span></span>
            <div>
              <h3 className="secondDate">
                {item.year}
              </h3>
              <h5>{item.event}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  margin-top: 2rem;
  place-items: center;
  h2 {
    margin-bottom: 3rem;
    font-size: 1.5rem;
    color: #001300;
    font-weight: bold;
    margin-top: 1rem;
    text-transform: uppercase;
  }
  .timeline {
    padding: 1rem 2rem;
  }
  .timeline-item {
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 130px 50px 300px;
  }
  span {
    width: 1px;
    position: relative;
    height: auto;
    background-color: var(--grey-200);
  }
  span::after {
    content: '';
    position: absolute;
    top: 0;
    left: -0.15rem;
    width: 5px;
    height: 5px;
    margin-bottom: 1rem;
    border-radius: 50%;
    background-color: #625ffd;
  }
  h3 {
    padding: 0.4rem 1rem;
    background-color: rgb(209 250 229);
    color: rgb(5 150 105);
    align-self: start;
    font-size: 0.8rem;
    justify-self: center;
    border-radius: 8px;
  }
  h5 {
    font-weight: 500;
    line-height: 1.5;
    font-size: 1.3rem;
  }
  p {
    margin-top: 0.5rem;
    color: var(--grey-700);
  }
  .secondDate {
    display: none;
  }
  @media (max-width: 700px) {
    place-items: start;
    .timeline {
      padding: 0;
    }
    .timeline-item {
      grid-template-columns: 50px auto;
    }
    .firstDate {
      display: none;
    }
    .secondDate {
      justify-self: start;
      margin-bottom: 0.5rem;
    }
  }
`;

export default AboutUsTimeline;
