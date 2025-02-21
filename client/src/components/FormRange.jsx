import styled from 'styled-components';
import { formatPrice } from '../utils';
import { useState } from 'react';
const FormRange = ({ label, name, price }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] =
    useState(price || maxPrice);

  return (
    <Wrapper>
      <label htmlFor={name}>
        <span>{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={e =>
          setSelectedPrice(e.target.value)
        }
        step={step}
      />
      <div className="data">
        <span>0</span>
        <span>Max : {formatPrice(maxPrice)}</span>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  color: var(--grey-700);
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    text-transform: capitalize;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    background: red;
    border-radius: 5px;
    cursor: pointer;
  }
  .data {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    font-weight: bold;
    color: var(--grey-700);
  }
`;
export default FormRange;
