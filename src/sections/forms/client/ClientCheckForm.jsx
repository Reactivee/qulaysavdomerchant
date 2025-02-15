// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { PatternFormat } from 'react-number-format';
import { useClientContext } from 'contexts/ClientContext';
import { useNavigate } from 'react-router';
import { Send2 } from 'iconsax-react';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  passport: yup.string().min(9, 'Passport seriya talab etiladi').max(9, 'Passport seriya talab etiladi').required('Passport seriya talab etiladi'),
  phone: yup.string().min(11, 'Telefon raqam talab etiladi').required('Telefon raqam talab etiladi')
  // code: yup.string().max(4, 'should be of max 4 characters length').required('Kodni kiriting')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const ClientCheckForm = () => {

  const {
    sendSmsToClient,
    isLoading,
    sendCodeAccept,
    attr,
    reSendCodeAccept
  } = useClientContext();

  const routing = useNavigate();
  const [smsStatus, setSmsStatus] = useState(false);
  const [reSend, setReSend] = useState(false);
  const formik = useFormik({
    initialValues: {
      passport: '',
      phone: '',
      code: ''
    },

    validationSchema,
    onSubmit: (data) => {
      if (!smsStatus) {
        checkClientExist(data);
      } else {
        handleClientFound(data);
      }
    }
  });

  const checkClientExist = async (data) => {
    const res = await sendSmsToClient(data).then(result => {
      if (result && result?.data?.id) {
        routing(`/customer/edit/${result?.data?.id}`);
      }
      if (result && result.status) {
        setSmsStatus(true);
      }
    });


  };

  const handleClientFound = async (data) => {

    const res = await sendCodeAccept(data).then(result => {
      if (result.errors && result.errors.attribute === 'time') {
        setReSend(true);
      }
      if (result && result.status) {
        routing(`/customer/edit/${result.id}`);
      }
    });

  };

  const handleResend = async () => {
    await reSendCodeAccept().then(result => {
      console.log(result);
      if (result && result.status) {
        setReSend(false);
      }
    });

  };

  return (
    <MainCard title="Mijozni tekshirish">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="passport">Seriya va raqam</InputLabel>
              <TextField
                id="pass"
                name="passport"
                placeholder="AA1234567"
                type="text"
                disabled={smsStatus}
                value={formik.values.passport}
                onChange={formik.handleChange}
                error={formik.touched.passport && Boolean(formik.errors.passport)}
                helperText={formik.touched.passport && formik.errors.passport}
                inputProps={{ maxLength: 9 }} // Set max length to 10 characters
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phone">Telefon raqami</InputLabel>
              <PatternFormat

                id="phone"
                name="phone"
                placeholder="99 999 99 99"
                type="text"
                disabled={smsStatus}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                format="## ### ####"
                mask=""
                customInput={TextField}
                InputProps={{
                  startAdornment: '+998'
                }}
              />
            </Stack>
          </Grid>

          {smsStatus ? <>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="passport">Tasdiqlash kodi</InputLabel>
                <PatternFormat
                  fullwidth
                  id="code"
                  name="code"
                  placeholder="Ko'rsatilgan telefon raqamiga jo'natilgan kodni kiriting"
                  format="######"
                  mask=""
                  customInput={TextField}
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                />
              </Stack>
            </Grid>
          </> : ''}

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                {reSend ? (
                  <LoadingButton sx={{ textTransform: 'none' }} variant="contained" loading={isLoading}
                                 onClick={() => handleResend()}>
                    <Send2 style={{ marginRight: 5 }} /> Qayta jo'natish
                  </LoadingButton>
                ) : (
                  <LoadingButton sx={{ textTransform: 'none' }} variant="shadow" type="submit" loading={isLoading}>
                    <Send2 style={{ marginRight: 5 }} /> {smsStatus ? 'Tasdiqlash' : 'SMS jo\'natish'}
                  </LoadingButton>
                )}
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};
export default ClientCheckForm;
