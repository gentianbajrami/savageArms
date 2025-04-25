import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // or '/dashboard' depending on your main page
  };

  return (
    <Wrapper>
      <button className="back-btn" onClick={handleBack}>
        <FaArrowLeft className="icon" />
        Back to Home
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    color: var(--primary-500);
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: black;
    }
  }

  .icon {
    font-size: 1.2rem;
  }
`;

export default BackButton;
