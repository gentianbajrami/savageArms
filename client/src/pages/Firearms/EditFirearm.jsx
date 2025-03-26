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

const EditFirearm = () => {
  return <div>EditFirearm</div>;
};
export default EditFirearm;
