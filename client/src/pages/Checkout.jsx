import { useQuery } from '@tanstack/react-query';
import {
  Banner,
  CartTotal,
  CheckoutForm,
} from '../components';
import styled from 'styled-components';

const cartQuery = {
  queryKey: ['cart'],
  queryFn: async () => {
    const { data } = await customFetch.get(
      '/cart'
    );
    return data;
  },
};

const Checkout = () => {
  const { data } = useQuery(cartQuery);
  const cart = data?.cart || [];
  console.log(data);

  if (cart?.cartTotal === 0) {
    return <Banner title="Your cart is empty" />;
  }

  return (
    <Wrapper className="page">
      {/* <Banner title="Checkout" /> */}
      <h2>Place your order</h2>
      <div className="checkout">
        <CheckoutForm />
        <CartTotal {...cart} showBtn={false} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  h2 {
    margin-top: 4rem;
    font-size: 2.2rem;
    letter-spacing: var(--letter-spacing);
    border-bottom: 1px solid var(--grey-300);
    padding-bottom: 1.4rem;
    margin-bottom: 4rem;
  }
  max-width: var(--max-width);
  margin: 0 auto;
  .checkout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 800px) {
    .checkout {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
export default Checkout;
