import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'api/snackbar';

// assets
import { Eye, EyeSlash } from 'iconsax-react';
import { PatternFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';

// ============================|| FIREBASE - RESET PASSWORD ||============================ //

export default function AuthResetPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn, token, updateProfile } = useAuth();
  console.log(token.token);
  const [level, setLevel] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          password_confirmation: '',
          code: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Yangi parolni kiriting'),
          code: Yup.string().min(6, 'Tasdiqlash kodi kiritilmadi').required('Tasdiqlash kodi kiritilmadi'),
          password_confirmation: Yup.string()
            .required('Yangi parolni tasdiqlang')
            .test('confirmPassword', 'Parol bir xil bo\'lishi kerak', (confirmPassword, yup) => yup.parent.password === confirmPassword)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // password reset
            await updateProfile(values.password, values.password_confirmation, token?.token, values.code).then(
              () => {
                setStatus({ success: true });
                setSubmitting(false);
                openSnackbar({
                  open: true,
                  message: 'Sizning parolingiz yangilandi',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                });

                setTimeout(() => {
                  navigate('/login', { replace: true });
                }, 1500);
              },
              (err) => {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                console.log(err.message);
                openSnackbar({
                  open: true,
                  message: err.message || 'Yuklashda xatolik',
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  }
                });
              }
            );

          } catch (err) {
            console.error(err);
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
                  <InputLabel htmlFor="code">Tasdiqlash kodni kiriting</InputLabel>
                  <PatternFormat
                    fullWidth
                    error={Boolean(touched.code && errors.code)}
                    id="code"
                    type="text"
                    value={values.code}
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Tasdiqlash kodi"
                    helperText={touched.code && errors.code}
                    format="#######"
                    mask=""
                    customInput={TextField}
                  />

                </Stack>

              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-reset">Parol</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-reset"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="Yangi parol kiriting"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-reset">
                    {errors.password}
                  </FormHelperText>
                )}

              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirm-password_confirmation">Yangi parolni tasqidlang</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                    id="confirm-password_confirmation"
                    type="password"
                    value={values.password_confirmation}
                    name="password_confirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Parolni qayta kiriting"
                  />
                </Stack>
                {touched.password_confirmation && errors.password_confirmation && (
                  <FormHelperText error id="helper-text-confirm-password-reset">
                    {errors.password_confirmation}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button sx={{ textTransform: 'none' }} disableElevation disabled={isSubmitting} fullWidth size="large"
                          type="submit" variant="contained" color="primary">
                    Qayta tiklash
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
