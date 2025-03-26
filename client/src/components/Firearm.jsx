import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import FirearmsInfo from './FirearmsInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styled from 'styled-components';
day.extend(advancedFormat);

const Firearm = ({ _id, fullName, photo, price, description }) => {
  return (
    <Wrapper className="firearm-card">
      <div className="firearm-banner">{fullName}</div>

      <div className="firearm-image">
        <img src={photo} alt={fullName} />
      </div>

      <div className="firearms-details">
        <p className="firearm-description">{description}</p>
        <h4 className="firearm-price">
          <strong>${price}</strong>
        </h4>
      </div>

      <footer className="actions">
        <div className="actions-container">
          <Link to={`../edit-firearm/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </div>
      </footer>
    </Wrapper>
  );
};
export default Firearm;

const Wrapper = styled.section`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 380px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04);
    transition: transform 0.4s ease-in-out;
  }

  .firearm-banner {
    background: #c32026;
    color: white;
    font-weight: bold;
    text-align: left;
    padding: 10px;
    text-transform: uppercase;
  }

  .actions-container {
    margin: 10px;
    display: flex;
    gap: 10px;
  }

  .firearm-image {
    display: flex;
    justify-content: center;
    padding: 15px;
    background: #f9f9f9;
  }

  .firearm-image img {
    width: 100%;
    max-height: 230px;
  }

  .firearm-description {
    font-size: 16px;
    color: #555;
    margin: 10px;
  }

  .firearm-price {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
  }
`;
