import FormRow from '../../components/FormRow';
import Wrapper from './DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import {
  FIREARMS_TYPE,
  FIREARMS_MODEL,
  FIREARMS_MANUFACTURER,
  FIREARMS_CALIBER,
} from '../../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils/index';
import SubmitButton from '../../components/SubmitButton';
import FormRowSelect from '../../components/FormRowSelect';

export const action1 =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('photo');
    if (file && file.size > 500000) {
      toast.error('Image size to large');
    return null;
  }

  try {
    await customFetch.post('/firearms', formData);
    queryClient.invalidateQueries(['firearms']);
    toast.success('Firearm created successfully');
    return redirect('/dashboard/all-firearms');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const AddFirearm = () => {
  const { user } = useOutletContext();
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Add Firearm</h4>
        <div className="form-center">
          <FormRow type="text" name="fullName" label="Full Name" />
          <FormRow type="text" name="features" />
          <FormRow type="number" name="price" />
          <FormRow type="number" name="stock" />
          <FormRow type="text" name="description" />
          <FormRow type="number" name="capacity" />
          <FormRowSelect
            name="caliber"
            labelText="firearms caliber"
            list={Object.values(FIREARMS_CALIBER)}
            defaultValue={FIREARMS_CALIBER['10mm']}
          />
          <FormRowSelect
            name="manufacturer"
            labelText="firearms manufacturer"
            list={Object.values(FIREARMS_MANUFACTURER)}
            defaultValue={FIREARMS_MANUFACTURER.BENELLI}
          />
          <FormRowSelect
            name="type"
            labelText="firearms type"
            list={Object.values(FIREARMS_TYPE)}
            defaultValue={FIREARMS_TYPE.PISTOL}
          />{' '}
          <FormRowSelect
            name="model"
            labelText="firearms model"
            list={Object.values(FIREARMS_MODEL)}
            defaultValue={FIREARMS_MODEL.HANDGUN}
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
export default AddFirearm;
