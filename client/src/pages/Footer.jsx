import React from 'react';
import styled from 'styled-components';
import { Logo } from '../components';

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer">
        <Logo />
        <div className="links">
          <div className="link">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Dealers and Reps</li>
              <li>Meet Team Savage</li>
              <li>Careers</li>
              <li>Careers</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="link">
            <h3>Resources</h3>
            <ul>
              <li>Catalog</li>
              <li>Manuals</li>
              <li>Promotions and Rebates</li>
              <li>Safety Information</li>
            </ul>
          </div>
          <div className="link">
            <h3>Support</h3>
            <ul>
              <li>Contact Us</li>
              <li>Repairs</li>
              <li>FAQs</li>
              <li>Find a Dealer</li>
            </ul>
          </div>
          <div className="newsLetter">
            <button className="btn">
              sign up for our e-mail newsletter
            </button>
            <p>
              Stay informed about our latest deals
              and promotions.
            </p>
          </div>
        </div>
        <hr />
        <div className="terms">
          <p>
            2024. G-Arms, Inc. All right reserved
          </p>
          <div className="cookies">
            <p>Terms & conditions</p>
            <p>Privacy policy</p>
            <p>Cookies</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  background: rgba(15, 15, 15, 1);
  padding: 4rem 1rem;
  .footer {
    max-width: var(--max-width);
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    .links {
      display: flex;
      gap: 2rem;
      column-gap: 4rem;
      width: 100%;
      flex-wrap: wrap;
      justify-content: start;

      .link {
        color: white;
        padding: 0;
        h3 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        ul li {
          margin-bottom: 1rem;
        }
      }
    }
    .newsLetter {
      margin-top: 2rem;
      p {
        color: white;
        margin-top: 1rem;
        max-width: 25rem;
      }
    }
    .terms {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      div {
        display: flex;
        gap: 1rem;
        a {
          color: white;
        }
      }
    }
  }
`;
export default Footer;
