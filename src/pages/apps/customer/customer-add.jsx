import Grid from '@mui/material/Grid';
import CustomerTabWrapper from '../../../sections/apps/customer/CustomerTabWrapper';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ClientCard from '../../../components/client/ClientCard';

import { useParams } from 'react-router';
import { useClientContext } from '../../../contexts/ClientContext';
import PrivateFormSkeleton from '../../../components/skeletons/PrivateFormSkeleton';
import { LoadingButton } from '@mui/lab';
import { Send2, Warning2 } from 'iconsax-react';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../../utils/functions';
import ClientPrivateForm from '../../../sections/forms/client/ClientPrivateForm';
import AdditionalContactsForm from '../../../sections/forms/client/AdditionalContactsForm';
import ClientAdditionalDataForm from '../../../sections/forms/client/ClientAdditionalDataForm';
import AlertCustomerConfirmation from '../../../sections/apps/customer/AlertCustomerSkoring';
import { openSnackbar } from '../../../api/snackbar';
import Button from '@mui/material/Button';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box
        sx={{ height: { xs: '100%', sm: 'auto' }, overflowX: { xs: 'scroll', sm: 'auto' } }}>{children}</Box>}
    </div>
  );
}

const CustomerAdd = () => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(0);
  const [showLimit, setShowLimit] = useState(false);
  const { id } = useParams();
  const { data, getClientSingle, mutateClientData, sendToScoring } = useClientContext();
  const [loading, setLoading] = useState(false);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [anyError, setError] = useState('');
  const [accessEdit, setAccessEdit] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const detectLimitScoring = async () => {
    try {
      setLoading(true);
      const res = await sendToScoring(id).then((data) => {
        setShowLimit(true);
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomer = async () => {
    setUserDataLoading(true);
    await getClientSingle(id).then((data) => {
        setUserDataLoading(false);
        if (data && data.data.is_checked == 1 && data.data.is_identified == 1) {
          setAccessEdit(false);
        }
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: 'Ma\'lumot yuklandi',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
      },
      (error) => {
        setError(error?.message);
        setUserDataLoading(false);
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: error.message || 'Serverda xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
      }
    );
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);


  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={3}>
        <CustomerTabWrapper setValue={setValue} value={value} focusInput={focusInput} />

        {data && data?.is_scoring ?
          <LoadingButton loading={loading}
                         onClick={() => setOpen(true)}
                         size="medium"
                         variant="contained"
                         fullWidth={true}
                         sx={{ marginTop: 2, paddingY: 1 }} startIcon={<Send2 />}>
            Skoringa jo'natish
          </LoadingButton> : <>
            <Button
              size="medium"
              variant="dashed"
              fullWidth={true}
              disabled
              sx={{ marginTop: 2, paddingY: 1 }} startIcon={<Send2 />}>
              Skoringa jo'natish
            </Button>
            <Typography variant="body2" sx={{ paddingY: 1, fontWeight: 600, textAlign: 'center' }}>Qayta skoring uchun
              har
              30 kunda so'rov
              berish
              mumkin</Typography>
          </>
        }

      </Grid>

      <Grid item xs={12} md={9}>
        {userDataLoading ? (
          <PrivateFormSkeleton />
        ) : <>

          {showLimit && data && data?.limit > 0 ? <TabPanel style={{ marginBottom: 5 }}>
              <Alert variant="border" color="success">
                <Typography variant="h5">Limit: {formatPrice(data?.limit)} so'm</Typography>
              </Alert>
            </TabPanel>
            : ''}

          {anyError ? <TabPanel style={{ marginBottom: 5 }}>
              <Alert variant="border" icon={<Warning2 />} color="error">
                <Typography variant="h5">{anyError}</Typography>
              </Alert>
            </TabPanel>
            : ''}

          <TabPanel value={value} index={0}>
            <ClientPrivateForm accessEdit={accessEdit} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ClientCard />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdditionalContactsForm />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ClientAdditionalDataForm />
          </TabPanel>
        </>
        }
      </Grid>

      <AlertCustomerConfirmation title={'Skoring uchun so\'rov berishni tasdiqlaysizmi?'} open={open}
                                 handleClose={handleClose} confirmOperation={detectLimitScoring} />
    </Grid>
  );


};
export default CustomerAdd;