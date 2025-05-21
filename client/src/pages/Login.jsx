import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { FormRow } from '../components';
import customFetch from '../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { SubmitButton } from '../components';

export const action1 =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Login successful');
      queryClient.invalidateQueries();
      return redirect('/');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return {
        error: error.response?.data?.message || 'Failed to login',
      };
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="login">Login</h4>
        <FormRow
          type="email"
          name="email"
          defaultValue="gentian.bajrami20@outlook.com"
        />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <SubmitButton />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
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
