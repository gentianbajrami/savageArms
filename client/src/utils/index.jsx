import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:5101/api/v1',
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
  ).format((price / 100).toFixed(2));
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
