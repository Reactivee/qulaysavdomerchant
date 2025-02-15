import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { Eye, EyeSlash, Lock } from 'iconsax-react';
import { FaRegUser, FaTelegram } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { LoadingButton } from '@mui/lab';
import { openSnackbar } from '../../../api/snackbar';


// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ forgot }) {
  const [checked, setChecked] = useState(false);
  const { isLoggedIn, login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          login: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          login: Yup.string().max(255).required('Login talab etiladi'),
          password: Yup.string().max(255).required('Parol talab etiladi')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.login, values.password);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);

              // preload('api/menu/dashboard', fetcher); // load menu on login success
            }
          } catch (err) {
            openSnackbar({
              open: true,
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              message: 'Mijoz topilmadi!',
              variant: 'alert',
              alert: {
                color: 'error'
              }
            });
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: 'Mijoz topilmadi !' });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Login</InputLabel>
                  <OutlinedInput
                    id="login-login"
                    type="text"
                    value={values.login}
                    name="login"
                    startAdornment={
                      <InputAdornment position="start">
                        <FaRegUser size={18} />
                      </InputAdornment>
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Login kiriting"
                    fullWidth
                    error={Boolean(touched.login && errors.login)}
                  />
                </Stack>
                {touched.login && errors.login && (
                  <FormHelperText error id="standard-login">
                    {errors.login}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Parol</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="*******"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Meni eslab qolish</Typography>}
                  />

                  <Link variant="h6" underline="none" href={'/forgot-password'}
                        color="primary">
                    Parolni unutdingizmi?
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <LoadingButton loading={isSubmitting} disableElevation disabled={isSubmitting} fullWidth size="large"
                                 type="submit"
                                 variant="contained" color="primary">
                    Kirish
                  </LoadingButton>
                </AnimateButton>
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="center" flexDirection="column" sx={{ mt: 0 }} alignItems="center">
              <Typography variant="h6" sx={{ mt: 1 }} color="secondary">
                Savollaringiz bormi? Bizga qo'ng'iroq qiling:
              </Typography>
              {/*<div style={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>*/}
              {/*  <Link underline="none" color="secondary" sx={{ marginRight: 3, textDecoration: 'none' }} target="_blank"*/}
              {/*        href="tel:998915055545">+998 91 505 55 45</Link>*/}
              {/*  <Link underline="none" color="secondary" target="_blank" sx={{ display: 'flex', alignItems: 'center' }}*/}
              {/*        href="https://t.me/abomuslimov"><FaTelegram*/}
              {/*    style={{ marginRight: 2, textDecoration: 'none' }} /> Telegram bot</Link>*/}
              {/*</div>*/}
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { forgot: PropTypes.string };
