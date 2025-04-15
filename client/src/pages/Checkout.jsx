import { useQuery } from '@tanstack/react-query';
import {
  Banner,
  CartTotal,
  CheckoutForm,
} from '../components';
import styled from 'styled-components';
import {
  cartQuery,
  userQuery,
} from '../utils/allQueryForProject';

export const loader = queryClient => async () => {
  try {
    await queryClient.ensureQueryData(cartQuery);
    await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    return redirect('/');
  }
};

const Checkout = () => {
  const cart =
    useQuery(cartQuery).data?.cart || [];
  console.log(cart);

  if (cart?.cartTotal === 0) {
    return <Banner title="Your cart is empty" />;
  }

  console.log(cart);
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
  max-width: 1400px;
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
