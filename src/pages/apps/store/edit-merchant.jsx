import { useParams } from 'react-router';
import { useStoreContext } from '../../../contexts/StoreContext';
import { lazy, useEffect, useRef, useState } from 'react';
import Loadable from '../../../components/Loadable';
import { MessageQuestion } from 'iconsax-react';
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import MerchantInfoBar from '../../../sections/apps/store/MerchantInfoBar';
import Loading from '../../../components/third-party/Loading';
import useAuth from '../../../hooks/useAuth';

const AddMerchantForm = Loadable(lazy(() => import('../../../sections/forms/AddMerchantForm')));

const EditMerchant = () => {
  const { id } = useParams();
  const {
    data,
    role,
    fetchRoles,
    fetchSingleMerchant,
    isLoading,
    updateMerchantToStore
  } = useStoreContext();

  const [initialValues, setInitialValues] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    full_name: '',
    role_id: '',
    status: 10
  });

  const editMode = useRef(false);
  const [accessEdit, setAccessEdit] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  const openToEditMerchant = async () => {

    await fetchSingleMerchant({ id }).then(result => {
        if (result.status) {
          editMode.current = true;
        } else {
          setError(true);
        }
      }
    );
  };

  useEffect(() => {
    if (id) {
      openToEditMerchant();
    } else {
      editMode.current = false;
    }
    if (Number(id) === user.id) {
      setAccessEdit(false);
    }
  }, [id]);


  if (error) {
    return <>
      <Alert
        variant="border"
        color="error"
        icon={<MessageQuestion />}>
        Ma'lumot olishda xatolik
      </Alert>
    </>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {data ? <MerchantInfoBar data={initialValues} /> : ''}
        </Grid>

        <Grid item xs={9}>
          <AddMerchantForm initialValues={initialValues}
                           setInitialValues={setInitialValues}
                           editMode={editMode.current}
                           role={role} data={data}
                           accessEdit={accessEdit}
                           updateMerchantToStore={updateMerchantToStore}
                           fetchRoles={fetchRoles} />
        </Grid>
      </Grid>


    </>);
};
export default EditMerchant;