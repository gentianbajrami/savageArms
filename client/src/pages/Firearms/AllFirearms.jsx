import customFetch from "../../utils";

const action1 = async  ({ request }) => {
  const formData = request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.get('dashboard/all-firearms', data);
    return null
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return { error: error.response?.data?.message || 'Failed to get all firearms' }
  }
}

const AllFirearms = () => {
  return (
    <div>AllFirearms</div>
  )
}
export default AllFirearms