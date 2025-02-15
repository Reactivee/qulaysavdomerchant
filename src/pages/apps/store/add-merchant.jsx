import Loadable from '../../../components/Loadable';
import { lazy, useState } from 'react';
import { useStoreContext } from '../../../contexts/StoreContext';

const AddMerchantForm = Loadable(lazy(() => import('../../../sections/forms/AddMerchantForm')));

const AddMerchant = () => {

  const { role, addMerchantToStore, fetchRoles } = useStoreContext();
  const [initialValues, setInitialValues] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    full_name: '',
    role_id: '',
    status: 10
  });

  return (
    <AddMerchantForm initialValues={initialValues}
                     accessEdit={true}
                     setInitialValues={setInitialValues} role={role}
                     addMerchantToStore={addMerchantToStore}
                     fetchRoles={fetchRoles} />
  );
};
export default AddMerchant;