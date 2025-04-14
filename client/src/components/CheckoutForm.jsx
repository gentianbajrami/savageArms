import { Form, redirect } from 'react-router-dom';
import FormInput from './FormRow';
import SubmitBtn from './SubmitButton';

import customFetch, {
  formatPrice,
} from '../utils';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export const action =
  queryClient =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post('/orders', data);
      queryClient.removeQueries(['orders']);
      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);
      //   if (error?.response?.status === 401 || 403)
      //     return redirect('/login');
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Wrapper>
      <Form method="POST">
        <h4>shipping information</h4>
        <FormInput
          label="first name"
          name="name"
          type="text"
        />
        <FormInput
          label="address"
          name="address"
          type="text"
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
