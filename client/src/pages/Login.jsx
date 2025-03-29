import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import { FormRow } from '../components';
import customFetch from '../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
export const action1 = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { error: error.response?.data?.message || 'Failed to login' };
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="login">Login</h4>
        <FormRow
          type="email"
          name="email"
          defaultValue="gentian.bajrami20@outlook.com"
        />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;

  .form {
    border-top: 5px solid var(--primary-500);
    max-width: 400px;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

export default Login;
