import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import AnimateButton from '../../components/@extended/AnimateButton';
import { useFormik } from 'formik';
import { openSnackbar } from '../../api/snackbar';
import * as yup from 'yup';
import axiosServices from '../../utils/axios';
import { PatternFormat } from 'react-number-format';

const Partner = ({ open, setOpen }) => {

  const validationSchema = yup.object({
    full_name: yup.string().required('Ushbu maydon to\'ldirilishi shart'),
    phone: yup.string().min(12, 'Ushbu maydon to\'ldirilishi shart').required('Ushbu maydon to\'ldirilishi shart'),
    store_name: yup.string().required('Ushbu maydon to\'ldirilishi shart'),
    stir: yup.string().min(14, 'Ushbu maydon to\'ldirilishi shart').max(14, 'Ushbu maydon to\'ldirilishi shart').required('Ushbu maydon to\'ldirilishi shart')
  });

  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone: '',
      store_name: '',
      stir: ''
    },
    validationSchema,
    onSubmit: async (values, { setErrors, setSubmitting, setStatus }) => {
      try {
        await addPartnerDetails(values).then(result => {

          setSubmitting(false);
          setOpen(false);
          openSnackbar({
            open: true,
            message: 'So\'rov yuborildi',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          });
          formik.resetForm();
        });
      } catch (error) {

        openSnackbar({
          open: true,
          message: 'So\'rov yuborishda xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
        formik.errors = error.errors;
        setErrors(error.errors);
      }


    }
  });

  const addPartnerDetails = async (data) => {
    const response = await axiosServices.post('/api/partners', data);

  };
  const handleClose = () => {
    setOpen(false);
  };

  return (<Dialog
    open={open}
    // TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <Box sx={{ p: 1, py: 1.5 }}>
      <DialogTitle>Ariza yuborish</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="full_name">F.I.SH</InputLabel>
                <TextField
                  fullWidth
                  id="full_name"
                  name="full_name"
                  placeholder="Sizning F.I.SH."
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                  helperText={formik.touched.full_name && formik.errors.full_name}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Sizning telefon raqamingiz</InputLabel>
                <PatternFormat
                  fullwidth={true}
                  id={`phone`}
                  name={`phone`}
                  placeholder="99899 999 99 99"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  format="############"
                  mask=""
                  customInput={TextField}
                />

              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Do'konning nomi</InputLabel>
                <TextField
                  fullWidth
                  id="store_name"
                  name="store_name"
                  placeholder="Do'konning nomini kiriting"
                  type="text"
                  value={formik.values.store_name}
                  onChange={formik.handleChange}
                  error={formik.touched.store_name && Boolean(formik.errors.store_name)}
                  helperText={formik.touched.store_name && formik.errors.store_name}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Soliq to‘lovchining identifikatsiya raqami (STIR) / PINFL</InputLabel>
                <PatternFormat
                  fullWidth
                  id="stir"
                  name="stir"
                  placeholder="STIR kiriting"
                  type="text"
                  value={formik.values.stir}
                  onChange={formik.handleChange}
                  error={formik.touched.stir && Boolean(formik.errors.stir)}
                  helperText={formik.touched.stir && formik.errors.stir}
                  format="##############"
                  mask=""
                  customInput={TextField}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                  <Button type="reset" onClick={() => {
                    setOpen(false);
                    formik.resetForm();
                  }} color="error">
                    Orqaga
                  </Button>
                  <Button type="submit" disabled={formik.isSubmitting} variant="contained">
                    Yuborish
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </DialogContent>


    </Box>
  </Dialog>);
};
export default Partner;