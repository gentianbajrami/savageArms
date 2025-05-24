import { toast } from 'react-toastify';
import { ROLE } from '../../../../utils/constants';
import { FormRow, FormRowSelect } from '../../components';
import customFetch from '../../utils/index';
import SubmitButton from '../../components/SubmitButton';
import { Form } from 'react-router-dom';
import { useLoaderData, redirect } from 'react-router-dom';
import styled from 'styled-components';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/admin-update-user/${params.id}`);

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/user-management');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const userId = params.id;

  try {
    await customFetch.patch(`/admin-update-user/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('User updated successfully');
    return redirect('/dashboard/user-management');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};

const AdminEditUser = () => {
  const { data } = useLoaderData();
  const user = data?.user;

  if (!user || Object.keys(user).length === 0) {
    return <p>Loading user data...</p>;
  }

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Edit User</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            label="First Name"
            defaultValue={user.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            label="Last Name"
            defaultValue={user.lastName}
          />

          <FormRow
            type="text"
            name="address"
            label="Address"
            defaultValue={user.address}
          />
          <FormRow
            type="email"
            name="email"
            label="Email"
            defaultValue={user.email}
          />
          <FormRowSelect
            type="text"
            name="role"
            label="Role"
            list={Object.values(ROLE)}
            defaultValue={user.role}
          />

          <div className="form-row">
            <label htmlFor="photo" className="form-label">
              Select an image (max 0.5MB)
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="form-input"
              accept="image/*"
            />
          </div>
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AdminEditUser;
const Wrapper = styled.section`
  .form {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .form-center {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
