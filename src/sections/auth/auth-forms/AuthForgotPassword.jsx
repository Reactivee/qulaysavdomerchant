import { useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';
import { PatternFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn, resetPassword } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          phone: '',
          submit: null
        }}
        validationSchema={Yup.object({
          phone: yup.string().min(9, 'Telefon raqam talab etiladi').required('Telefon raqam talab etiladi')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

          try {
            await resetPassword(values.phone).then(
              () => {
                setStatus({ success: true });
                setSubmitting(false);
                openSnackbar({
                  open: true,
                  message: 'Sms yuborildi',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                });
                setTimeout(() => {
                  navigate('/reset-password', { replace: true });
                }, 1000);

                // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                // github issue: https://github.com/formium/formik/issues/2430
              },
              (err) => {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                openSnackbar({
                  open: true,
                  message: 'Bunday raqam mavjud emas',
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  }
                });
              }
            );
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Telefon raqami</InputLabel>
                  <PatternFormat
                    fullwidth={true}
                    id={`phone`}
                    name={`phone`}
                    placeholder="99 999 99 99"
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    // error={values.touched.phone && Boolean(values.errors.phone)}
                    // helperText={values.touched.phone && values.errors.phone}
                    format="#########"
                    mask=" "
                    customInput={TextField}
                    InputProps={{
                      startAdornment: '+998'
                    }}
                  />

                </Stack>

              </Grid>
              {/*{errors.submit && (*/}
              {/*  <Grid item xs={12}>*/}
              {/*    <FormHelperText error>{errors.submit}</FormHelperText>*/}
              {/*  </Grid>*/}
              {/*)}*/}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button sx={{ textTransform: 'none' }} disableElevation disabled={isSubmitting} fullWidth size="large"
                          type="submit"
                          variant="contained" color="primary">
                    Sms yuborish
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
