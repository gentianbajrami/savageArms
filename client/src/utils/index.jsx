import axios from 'axios';

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from 'react-icons/fa';

const customFetch = axios.create({
  baseURL: 'http://localhost:5100/api/v1',
  withCredentials: true,
});

export default customFetch;

export const formatPrice = price => {
  const dollarsAmount = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    }
  ).format(price);
  return dollarsAmount;
};

export const generateAmountOptions = number => {
  return Array.from(
    { length: number },
    (_, index) => {
      const amount = index + 1;
      return (
        <option key={amount} value={amount}>
          {amount}
        </option>
      );
    }
  );
};

export const renderStars = rating => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars =
    5 - fullStars - (hasHalf ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} color="#facc15" />
    ); // yellow-400
  }

  if (hasHalf) {
    stars.push(
      <FaStarHalfAlt key="half" color="#facc15" />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        color="#facc15"
      />
    );
  }

  return stars;
};
