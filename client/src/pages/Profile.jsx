import { FormRow } from '../components';
import { redirect, useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';
// import { action } from '../actions/profileAction';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch('/users/update-user', data);
    toast.success('Profile updated successfully');
    return redirect('/dashboard/profile');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { error: error.response?.data?.message || 'Failed to update profile' };
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const { firstName, lastName, email, address } = user || {};

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            defaultValue={firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue={lastName}
          />
          <FormRow type="text" name="email" labelText="Email" defaultValue={email} />
          <FormRow
            type="text"
            name="address"
            labelText="Address"
            defaultValue={address}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    border: 5px solid red;
    margin: 0 auto;
    max-width: 800px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    text-align: left;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .form-row {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
  }

  .form-input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
    color: #333;
  }
`;

export default Profile;
