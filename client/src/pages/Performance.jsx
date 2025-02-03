import styled from 'styled-components';
import {
  Banner,
  PerformanceTile,
} from '../components';
const Performance = () => {
  return (
    <Wrapper className="page">
      <Banner title={'performance'} />
      <div className="title">
        <h3>G-Arms Performance</h3>
        <p>
          At G-Arms, we're constantly looking
          ahead, finding new ways to push
          performance ever higher. We are proud of
          our reputation for the development and
          use of technologies made to make every
          shooter better. We're proud to set the
          industry standard for out-of-the-box
          accuracy with no-nonsense high
          performance firearms. We accomplish this
          by holding ourselves and our products to
          a better standard. Make it better or
          don't make it at all
        </p>
      </div>
      <div className="data">
        <h3>Core Values</h3>
        <div className="value">
          <h5>THINK LIKE A GUNSMITH</h5>
          <p>
            We take accountability for every shot
            made with Savage. Just like a local
            gunsmith does. It’s why we hand-test
            and verify the accuracy and
            performance of every barrel, trigger
            and action of every gun that leaves
            our U.S. facilities. The gunsmith
            “custom stock” mentality is ingrained
            in every aspect of the Savage
            experience.
          </p>
        </div>
        <div className="value">
          <h5>MAKE EVERY SHOOTER BETTER</h5>
          <p>
            We make better firearms to make better
            shooters. Period. Our definition of
            accuracy is a guarantee found in every
            shot. We live to make you squarely
            confident in every moment with
            consistent accuracy the competition
            has simply never matched.
          </p>
        </div>
      </div>
      <PerformanceTile />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .title {
    h3 {
      text-align: start;
      font-weight: bold;
      margin-bottom: 2.5rem;
      font-size: 2rem;
      text-transform: uppercase;
    }
    p {
      color: var(--grey-900);
      font-size: 1.2rem;
      line-height: 1.5;
      margin-bottom: 5rem;
      text-align: start;
    }
  }
  .data {
    h3 {
      font-weight: bold;
      font-size: 1.5rem;
      color: black;
    }
    .value {
      margin: 3rem 0;
      h5 {
        font-weight: bold;
        font-size: 1.1rem;
        color: black;
        margin-bottom: 1rem;
      }
      p {
        color: var(--grey-900);
        font-size: 1.2rem;
        line-height: 1.5;
        text-align: start;
      }
    }
  }
`;
export default Performance;
