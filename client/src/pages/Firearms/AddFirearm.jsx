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

export const action1 = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/firearms', data);
    toast.success('Firearm added successfully');
    return null
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { error: error.response?.data?.message || 'Failed to add firearm' };
  }
};

const AddFirearm = () => {
  const { user } = useOutletContext();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Add Firearm</h4>
        <div className="form-center">
          <FormRow type="text" name="fullName" label="Full Name" />
          <FormRow type="text" name="features" />
          <FormRow type="number" name="price" />
          <FormRow type="number" name="stock" />
          <FormRow type="text" name="description" />
          <FormRow type="number" name="capacity" />
          <FormRowSelect
            name="firearmsCaliber"
            labelText="firearms caliber"
            list={Object.values(FIREARMS_CALIBER)}
            defaultValue={FIREARMS_CALIBER['9mm']}
          />
          <FormRowSelect
            name="firearmsManufacturer"
            labelText="firearms manufacturer"
            list={Object.values(FIREARMS_MANUFACTURER)}
            defaultValue={FIREARMS_MANUFACTURER.GLOCK}
          />
          <FormRowSelect
            name="firearmsType"
            labelText="firearms type"
            list={Object.values(FIREARMS_TYPE)}
            defaultValue={FIREARMS_TYPE.PISTOL}
          />{' '}
          <FormRowSelect
            name="firearmsModel"
            labelText="firearms model"
            list={Object.values(FIREARMS_MODEL)}
            defaultValue={FIREARMS_MODEL.HANDGUN}
          />
          <FormRow type="file" name="photo" />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddFirearm;
