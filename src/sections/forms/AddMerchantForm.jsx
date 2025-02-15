import MainCard from '../../components/MainCard';
import { Formik } from 'formik';
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

// third-party
import * as Yup from 'yup';

// assets
import { Eye, EyeSlash } from 'iconsax-react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '../../components/@extended/IconButton';
import { useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { BiSave } from 'react-icons/bi';
import { clearPhoneNumber } from '../../utils/clearPhone';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router';

const AddMerchantForm = ({
                           initialValues,
                           setInitialValues,
                           data,
                           role,
                           addMerchantToStore,
                           updateMerchantToStore,
                           fetchRoles,
                           accessEdit,
                           editMode = false
                         }) => {
  const { id } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (data && editMode) {
      setInitialValues(data);
    }
    if (!editMode) {
      setInitialValues({
        username: '',
        password: '',
        email: '',
        phone: '',
        full_name: '',
        role_id: 0,
        status: 10
      });
    }
  }, [data]);

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <MainCard content={false} title="Shaxsiy ma'lumotlar">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true} // Enable reinitializing on prop changes
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('Ushbu maydon to\'ldirilishi shart'),
            password: Yup.string().min(8, 'Parol minimum 8 ta belgidan iborat bo\'lishi kerak').required('Ushbu maydon to\'ldirilishi shart'),
            email: Yup.string().email('Email xato formatda').max(255),
            phone: Yup.string().max(255).required('Ushbu maydon to\'ldirilishi shart'),
            full_name: Yup.string().max(255).required('Ushbu maydon to\'ldirilishi shart'),
            role_id: Yup.string().required('Ushbu maydon to\'ldirilishi shart'),
            status: Yup.string().required('Ushbu maydon to\'ldirilishi shart')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

            if (editMode) {
              await updateMerchantToStore({ values, id });
              setInitialValues(values);
            } else {
              await addMerchantToStore(values).then(res => {
                if (res.errors) {
                  let newError = {};
                  Object.entries(res.errors).forEach(([key, value]) => {
                    newError[key] = 'Bunday qiymat allaqachon mavjud';
                  });
                  setErrors(newError);
                }
              });
            }
            setSubmitting(false);
          }}
        >
          {

            ({
               errors,
               handleBlur,
               handleChange,
               handleSubmit,
               isSubmitting,
               setFieldValue,
               touched,
               values,
               resetForm

             }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ p: 2.5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="personal-full_name">To'liq ism*</InputLabel>
                        <TextField
                          fullWidth
                          id="full_name"
                          value={values.full_name}
                          error={Boolean(touched.full_name && errors.full_name)}
                          placeholder="To'liq ismi"
                          name="full_name"
                          onBlur={handleBlur}
                          disabled={!accessEdit}
                          onChange={handleChange}
                        />
                      </Stack>
                      {touched.full_name && errors.full_name && (
                        <FormHelperText error id="full_name-helper">
                          {errors.full_name}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="personal-first-name">Login*</InputLabel>
                        <TextField
                          fullWidth
                          id="username"
                          error={Boolean(touched.username && errors.username)}
                          placeholder="Login"
                          value={values.username}
                          name="username"
                          onBlur={handleBlur}
                          disabled={!accessEdit}

                          onChange={handleChange}

                        />
                      </Stack>
                      {touched.username && errors.username && (
                        <FormHelperText error id="username-helper">
                          {errors.username}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="personal-email">Email</InputLabel>
                        <TextField
                          type="email"
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          value={values.email}
                          name="email"
                          placeholder="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={!accessEdit}
                          id="personal-email"
                        />
                      </Stack>
                      {touched.email && errors.email && (
                        <FormHelperText error id="personal-email-helper">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="personal-phone">Telefon nomer*</InputLabel>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          {accessEdit ? <PatternFormat
                            fullWidth
                            defaultValue={values.phone ? values.phone.toString().substring(3, 12) : ''}
                            error={Boolean(touched.phone && errors.phone)}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              const phone = e.target.value;
                              setFieldValue('phone', clearPhoneNumber(phone));
                            }}
                            id="phone"
                            name="phone"
                            placeholder="99 999 99 99"
                            type="text"
                            format="## ### ####"
                            mask=""
                            customInput={TextField}
                            InputProps={{
                              startAdornment: '+998'
                            }}
                          /> : <PatternFormat
                            fullWidth
                            defaultValue={values.phone ? values.phone.toString().substring(3, 12) : ''}
                            id="phone"
                            name="phone"
                            placeholder="99 999 99 99"
                            type="text"
                            format="##### ### ####"
                            mask=""
                            disabled={!accessEdit}
                            customInput={TextField}
                          />}

                        </Stack>
                      </Stack>
                      {touched.phone && errors.phone && (
                        <FormHelperText error id="personal-contact-helper">
                          {errors.phone}
                        </FormHelperText>
                      )}
                    </Grid>
                    {accessEdit ? <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="personal-last-name">Parol*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="-password-login"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={!accessEdit}
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
                        <FormHelperText error id="password-helper">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Grid> : ''}


                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="status">Status*</InputLabel>
                        <Select
                          fullWidth
                          value={values.status}
                          name="status"
                          disabled={!accessEdit}
                          onChange={handleChange}>

                          <MenuItem value={10}>Faol</MenuItem>
                          <MenuItem value={9}>Nofaol</MenuItem>
                        </Select>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel id="role_id" htmlFor="role_id">Rol*</InputLabel>
                        <Select
                          fullWidth
                          labelId="role_id"
                          value={values.role_id}
                          name="role_id"
                          disabled={!accessEdit}
                          error={Boolean(touched.role_id && errors.role_id)}
                          onChange={handleChange}
                        >
                          <MenuItem value={0}><em>Rol tanlash</em></MenuItem>
                          {role && role.map(item => {
                            return (
                              <MenuItem value={item.id}>{item.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </Stack>
                      {touched.role_id && errors.role_id && (
                        <FormHelperText error id="password-helper">
                          {errors.role_id}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Divider />
                {accessEdit ? <Box sx={{ p: 2.5 }}>
                  < Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                    {editMode ? '' : <Button color="secondary" onClick={() => resetForm()}>
                      Tozalash
                    </Button>}

                    <LoadingButton loading={isSubmitting} startIcon={<BiSave />}
                                   disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit"
                                   variant="contained">
                      Saqlash
                    </LoadingButton>
                  </Stack>
                </Box> : ''}

              </form>
            )}
        </Formik>
      </MainCard>
    </>
  );

};
export default AddMerchantForm;