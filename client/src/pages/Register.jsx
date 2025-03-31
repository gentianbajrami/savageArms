import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import { FormRow, FormRowSelect } from '../components';
import customFetch from '../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Firearms from './Firearms/Firearms';
import { ROLE } from '../../../utils/constants';

export const action1 = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { error: error.response?.data?.message || 'Failed to register' };
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Register</h4>
        <FormRow
          type="text"
          name="firstName"
          labelText="first name"
          defaultValue="Gentian"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Bajrami"
        />
        <FormRow type="text" name="address" defaultValue="ferizaj" />
        <FormRow
          type="email"
          name="email"
          defaultValue="gentian.bajrami20@outlook.com"
        />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <FormRowSelect
          name="role"
          labelText="Role"
          defaultValue={ROLE.USER}
          list={Object.values(ROLE)}
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .form {
    border-top: 5px solid var(--primary-500);
    max-width: 600px;
    width: 90%;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    overflow-y: auto;
    max-height: 90vh;
  }

  h4 {
    grid-column: span 2;
    text-align: center;
    margin-bottom: 1.2rem;
  }

  .btn {
    grid-column: span 2;
    margin-top: 1rem;
    width: 100%;
  }

  p {
    grid-column: span 2;
    margin-top: 1rem;
    text-align: center;
  }

  .member-btn {
    color: var(--primary-500);
    letter-spacing: 1px;
    margin-left: 0.25rem;
  }
`;

export default Register;
