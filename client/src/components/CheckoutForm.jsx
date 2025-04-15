import {
  Form,
  redirect,
  useNavigate,
} from 'react-router-dom';
import FormInput from './FormRow';
import SubmitBtn from './SubmitButton';

import customFetch from '../utils';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from '../utils/allQueryForProject';
import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

export const action =
  queryClient =>
  async ({ request }) => {
    const formData = await request.formData();
    const dataObj = Object.fromEntries(formData);

    try {
      const { data } = await customFetch.post(
        '/orders/create-checkout-session',
        dataObj
      );
      // Redirect the user to Stripe hosted payment page
      window.location.href = data.url;
      return null;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error creating checkout session';
      toast.error(errorMessage);
      return null;
    }
  };

const CheckoutForm = () => {
  const user =
    useQuery(userQuery).data?.user || null;

  return (
    <Wrapper>
      <Form method="post">
        <h4>shipping information</h4>
        <FormInput
          label="first name"
          name="name"
          type="text"
          defaultValue={user?.firstName}
        />
        <FormInput
          label="address"
          name="address"
          type="text"
          defaultValue={user?.address}
        />
        <div>
          <SubmitBtn text="place your order" />
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    button,
    input {
      padding: 1.3rem;
      font-size: 1rem;
    }
  }
  h4 {
    text-transform: capitalize;
    font-size: 1.4rem;
  }
`;
export default CheckoutForm;
