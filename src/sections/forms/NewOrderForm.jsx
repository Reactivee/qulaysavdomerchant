import { Form, FormikProvider, useFormik } from 'formik';
import { openSnackbar } from '../../api/snackbar';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';
import countries from '../../data/countries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';


const newOrder = {
  client_id: '',
  tariff_id: '',
  payment_date: '',
  products: [{
    'product_id': '',
    'product_name': '',
    'price': 0,
    'count': 0
  }]
};

const NewOrderForm = ({ closeModal }) => {

  const orderValidation = Yup.object().shape({
    // client_id: Yup.string().max(255).required('First Name is required'),
    // tariff_id: Yup.string().max(255).required('Last Name is required'),
    // payment_date: Yup.string().required('Email is required'),
    // products: Yup.array().required('Status is required')
  });

  const formik = useFormik({
    initialValues: newOrder,
    validationSchema: orderValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
      try {

        // await insertCustomer(values).then(() => {
        //   openSnackbar({
        //     open: true,
        //     message: 'Customer added successfully.',
        //     variant: 'alert',
        //     alert: {
        //       color: 'success'
        //     }
        //   });
        //   setSubmitting(false);
        //   closeModal();
        // });

      } catch (error) {
        // console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 2.5 }}>
            <Grid2 container spacing={3}>
              <Grid2 item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="client_id">Mijoz</InputLabel>
                  {/*<TextField*/}
                  {/*  fullWidth*/}
                  {/*  id="customer-firstName"*/}
                  {/*  placeholder="Enter First Name"*/}
                  {/*  {...getFieldProps('client_id')}*/}
                  {/*  error={Boolean(touched.client_id && errors.client_id)}*/}
                  {/*  helperText={touched.client_id && errors.client_id}*/}
                  {/*/>*/}
                  <Autocomplete
                    id="personal-country"
                    fullWidth
                    // value={countries.filter((item) => item.code === values?.country)[0]}
                    // onBlur={handleBlur}
                    onChange={(event, newValue) => {
                      setFieldValue('client_id', newValue === null ? '' : newValue.code);
                    }}
                    options={countries}
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.code === value?.code}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.code && (
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                        )}
                        {option.label}
                        {option.code && `(${option.code}) ${option.phone}`}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Mijozni tanlang"
                        name="country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container alignItems="end">

              <Grid item>
                <Stack direction="row" spacing={2} alignItems="end">
                  <Button color="error" onClick={closeModal}>
                    Bekor qilish
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Saqlash
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </FormikProvider>
    </>
  );
};
export default NewOrderForm;