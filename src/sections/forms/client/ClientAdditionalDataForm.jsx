// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third-party
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { useClientContext } from 'contexts/ClientContext';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { openSnackbar } from '../../../api/snackbar';


/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  type_field: yup.string().max(50, 'should be of 50 characters length').required('Ish joyi turi talab etiladi'),
  placement: yup.string().max(50, 'should be of max 50 characters length').required('Ish joyi talab etiladi')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const ClientAdditionalDataForm = () => {
  const {
    data,
    work_types,
    sendPrivateDate,
    getWorkPlace,
    mutateClientData
  } = useClientContext();
  const { id, position, field } = data;

  const initialValues = {
    type_field: field?.id,
    placement: position
  };

  useEffect(() => {
    getWorkPlace();
  }, []);

  return (
    <MainCard title="Shaxsiy ma'lumotlar">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

          setStatus({ success: true });
          setSubmitting(false);
          await sendPrivateDate(values, id).then((result) => {
              mutateClientData(result?.data);
              openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                message: 'Muvaffaqiyatli saqlandi',
                variant: 'alert',
                alert: {
                  color: 'success'
                }
              });
            },
            (error) => {
              setErrors({ error: 'Serverda xatolik' });
              setSubmitting(false);
              openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                message: 'Serverda xatolik',
                variant: 'alert',
                alert: {
                  color: 'error'
                }
              });
            }
          );


        }}
      >
        {({ setFieldValue, values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="type_field">Faoliyat sohasi</InputLabel>
                      <Select id="type_field" name="type_field" value={values.type_field} onChange={handleChange}>
                        {work_types &&
                          work_types.map((type, index) => {
                            return (
                              <MenuItem key={type.id} value={type.id}>
                                {type.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      {errors.type_field && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.type_field}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="placement">Lavozim</InputLabel>
                      <TextField
                        id="placement"
                        name="placement"
                        placeholder="Lavozim"
                        value={values.placement}
                        onChange={handleChange}
                        error={touched.placement && Boolean(errors.placement)}
                        helperText={touched.placement && errors.placement}
                        fullwidth
                      />
                    </Stack>
                  </Grid>


                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end">
                  <AnimateButton>
                    <Button variant="contained" type="submit" disabled={values.isSubmitting}>
                      Saqlash
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {/* <form onChange={handleChange} onSubmit={formik.handleSubmit}>
      
      </form> */}
    </MainCard>
  );
};
export default ClientAdditionalDataForm;
