import { FormRow, FormRowSelect } from '../../components';
import Wrapper from './DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import {
  FIREARMS_CALIBER,
  FIREARMS_MANUFACTURER,
  FIREARMS_MODEL,
  FIREARMS_TYPE,
} from '../../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils/index';
import SubmitButton from '../../components/SubmitButton';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/firearms/${params.id}`);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-firearms');
  }
};

export const action1 = async ({ request, params }) => {
  const formData = await request.formData();

  try {
    await customFetch.patch(`/firearms/${params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Firearm updated successfully');
    return redirect('/dashboard/all-firearms');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};

const EditFirearm = () => {
  const { data } = useLoaderData();
  const firearm = data?.firearm;

  if (!firearm || Object.keys(firearm).length === 0) {
    return <p>Loading firearm data...</p>;
  }

  console.log(firearm);
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Edit Firearm</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="fullName"
            label="Full Name"
            defaultValue={firearm.fullName}
          />
          <FormRow
            type="text"
            name="features"
            label="Features"
            defaultValue={firearm?.features || ''}
          />
          <FormRow
            type="number"
            name="price"
            label="Price"
            defaultValue={firearm?.price || 0}
          />
          <FormRow
            type="number"
            name="stock"
            label="Stock"
            defaultValue={firearm?.stock || 0}
          />
          <FormRow
            type="text"
            name="description"
            label="Description"
            defaultValue={firearm.description}
          />
          <FormRow
            type="number"
            name="capacity"
            label="Capacity"
            defaultValue={firearm?.capacity || 0}
          />

          <FormRowSelect
            name="caliber"
            labelText="Firearms Caliber"
            defaultValue={firearm.caliber}
            list={Object.values(FIREARMS_CALIBER)}
          />

          <FormRowSelect
            name="manufacturer"
            labelText="Manufacturer"
            defaultValue={firearm.manufacturer}
            list={Object.values(FIREARMS_MANUFACTURER)}
          />

          <FormRowSelect
            name="model"
            labelText="Model"
            defaultValue={firearm.model}
            list={Object.values(FIREARMS_MODEL)}
          />

          <FormRowSelect
            name="type"
            labelText="Type"
            defaultValue={firearm.type}
            list={Object.values(FIREARMS_TYPE)}
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
export default EditFirearm;
