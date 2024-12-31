import styled from 'styled-components';
import { Banner } from '../components';
import Suppressors from '../assets/images/arms/surpersor.jpg';
import Bipods from '../assets/images/arms/bipods.jpg';
import Magazines from '../assets/images/arms/magazines.jpg';
const Accessories = () => {
  const data = [
    { name: 'surpressor', img: Suppressors },
    { name: 'bipods', img: Bipods },
    { name: 'magazine', img: Magazines },
  ];
  return (
    <Wrapper className="page">
      <Banner title={'Accessories'} />
      <div className="content">
        <h3>Accessories</h3>
        <p>
          Looking for a way to level up your set
          up? Our new lineup of Accessories has
          you covered! From suppressors and bipods
          to conversion kits and apparel will
          complete your ultimate set up.
        </p>
      </div>
      <div className="boxes">
        {data.map(({ img, name }) => {
          return (
            <article className="box">
              <img src={img} alt={name} />
              <span>{name}</span>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .content {
    h3 {
      letter-spacing: var(--letter-spacing);
      text-transform: uppercase;
      font-weight: bold;
      font-family: 'helvetica';
      margin-bottom: 1rem;
    }
    p {
      color: var(--grey-800);
      line-height: 1.5;
      font-size: 1.1rem;
      margin-bottom: 5rem;
    }
  }
  .boxes {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 2rem;
    flex-wrap: wrap;
    .box {
      transition: var(--transition);
      position: relative;
      box-shadow: var(--shadow-2);
      border-radius: var(--border-radius);
      img {
        border-radius: var(--border-radius);
      }
    }
    .box:hover {
      box-shadow: var(--shadow-4);
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      background: darkred;
      color: white;
      text-transform: uppercase;
      padding: 0.5rem 1.4rem;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 5px;
      letter-spacing: var(--letter-spacing);
    }
  }
`;
export default Accessories;
