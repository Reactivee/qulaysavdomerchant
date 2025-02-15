// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third-party
import * as yup from 'yup';
import { FieldArray, FormikProvider, useFormik } from 'formik';

// project-imports
import MainCard from 'components/MainCard';

import { PatternFormat } from 'react-number-format';
import { useClientContext } from 'contexts/ClientContext';
import { Box, Divider, FormHelperText, MenuItem, Select } from '@mui/material';
import { Add, Send, Trash } from 'iconsax-react';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { LoadingButton } from '@mui/lab';
import AlertProductDelete from '../../apps/invoice/AlertProductDelete';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import countries from '../../../data/countries';
// import AlertDialog from 'components/@extended/AlertDialog';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  relatives:
    yup
      .array()
      .of(
        yup.object().shape({
          relative_type_id: yup.string().max(2, 'should be of 2 characters length').required('Ushbu maydon to\'ldirish shart'),
          phone: yup.string().max(16, 'should be of max 16 characters length').required('Ushbu maydon to\'ldirish shart'),
          full_name: yup.string().max(16, 'should be of max 4 characters length').required('Ushbu maydon to\'ldirish shart')
        })
      )

});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const ClientContactsForm = () => {
  const { error, data, sendClientContactRelatives, getTypeRelatives, getClientSingle } = useClientContext();
  const [count, setCount] = useState(1);
  const [deleted, setDelete] = useState(false);
  const { guarantors } = data;
  const { id } = useParams();
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState(false);

  const [types, setTypes] = useState([{
    id: '',
    phone: '',
    relative_type_id: '',
    full_name: ''
  },
    {
      id: '',
      phone: '',
      relative_type_id: '',
      full_name: ''
    }]);

  const formik = useFormik({
    initialValues: {
      relatives: guarantors && guarantors.length > 0 ? guarantors : types
    },
    // Initial value with one date field
    validationSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      let newValue = {
        id: '',
        phone: '',
        relative_type_id: '',
        full_name: ''
      };

      const collection = {
        data: []
      };

      values.relatives.map((item) => {
        newValue = {
          id: item.id,
          phone: item.phone,
          relative_type_id: item.relative_type_id,
          full_name: item.full_name
        };
        collection.data.push(newValue);
      });

      await sendClientContactRelatives(collection, id).then((response) => {
          if (response) {
            setStatus({ success: true });
            setSubmitting(false);
            getClientSingle(id);

          }
        }
      );
    }
  });

  const handleOpenDialog = (response) => {
    setOpen(false);
    setDelete(response);
  };


  const typeRelatives = useMemo(async () => {
    setLoading(true);
    const res = await getTypeRelatives().then((data) => {
      setTypes(data ? data?.data : []);
    });
    setLoading(false);

  }, [id]);

  return (
    <MainCard title="Kontaktlar">

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} alignItems={'center'} justifyContent={'end'}>
            <FieldArray name="relatives">
              {({ push, remove }) => (
                <>
                  < Grid item xs={12}>
                    {formik.values.relatives?.map((field, index) => (

                      <Grid
                        key={index}
                        container
                        spacing={2}
                        sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: '#F0EAD6' }}
                        alignItems="center"
                      >

                        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel htmlFor="phone">Telefon raqami</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9} lg={6}>
                          <Stack spacing={1}>

                            <PatternFormat
                              fullwidth={true}
                              id={`phone-${index}`}
                              name={`relatives[${index}].phone`}
                              placeholder="99 999 99 99"
                              type="text"
                              value={field.phone}
                              onChange={formik.handleChange}
                              error={formik.touched.relatives?.[index]?.phone && Boolean(formik.errors.relatives?.[index]?.phone)}
                              helperText={formik.touched.relatives?.[index]?.phone && formik.errors.relatives?.[index]?.phone}
                              format="998#########"
                              mask=" "
                              customInput={TextField}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel htmlFor="phone">Raqam egasining ismi</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9} lg={6}>
                          <Stack spacing={1}>
                            <TextField
                              id={`name-${index}`}
                              name={`relatives[${index}].full_name`}
                              type="text"
                              placeholder="To'liq ismi"
                              value={field.full_name}
                              onChange={formik.handleChange}
                              error={formik.touched.relatives?.[index]?.full_name && Boolean(formik.errors.relatives?.[index]?.full_name)}
                              helperText={formik.touched.relatives?.[index]?.full_name && formik.errors.relatives?.[index]?.full_name}

                              // fullwidth
                              autoComplete="given-name"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                          <InputLabel htmlFor="phone">Qarindoshlik turi</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9} lg={6}>
                          <Stack spacing={1}>

                            <Select
                              id={`type-${index}`}
                              name={`relatives[${index}].relative_type_id`}
                              disabled={loading}
                              value={field.relative_type_id ? field.relative_type_id : 0}
                              error={formik.touched.relatives?.[index]?.relative_type_id && Boolean(formik.errors.relatives?.[index]?.relative_type_id)}
                              helperText={formik.touched.relatives?.[index]?.relative_type_id && formik.errors.relatives?.[index]?.relative_type_id}
                              onChange={formik.handleChange}
                              sx={{
                                '& .MuiOutlinedInput-input': {
                                  // border: 1,
                                  // py: '12px',
                                  // borderColor: formik.errors.relatives?.[index]?.relative_type_id ? 'red' : 'transparent'
                                }
                              }}
                            >
                              <MenuItem disabled value={0} style={{ color: 'red' }}>Tanlang</MenuItem>
                              {types && types.map((type, index) => (
                                <MenuItem key={index} value={type ? type.id : 0}>{type.name}</MenuItem>
                              ))}

                              {/*<MenuItem value={2}>Qo'shni</MenuItem>*/}
                              {/* <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            {/*{Boolean(formik.errors.relatives?.[index]?.relative_type_id) && (*/}
                            {/*  <FormHelperText style={{ marginTop: 0 }} error id="standard-region">*/}
                            {/*    {formik.errors.relatives?.[index]?.relative_type_id}*/}
                            {/*    { console.log(formik.errors.relatives,formik.touched.relatives) }*/}
                            {/*  </FormHelperText>*/}
                            {/*)}*/}
                          </Stack>
                        </Grid>
                        {index > 1 ? (
                          <Grid item xs={12} sm={9} lg={2}>

                            <Button
                              style={{ width: 40 }}
                              color="error"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <IconButton color="error">
                                <Trash style={{ width: 20, height: 20 }} variant="Bold" />
                              </IconButton>
                            </Button>

                          </Grid>
                        ) : (
                          ''
                        )}

                        <Divider />
                      </Grid>
                    ))}
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{ backgroundColor: 'white' }}
                      onClick={() => {
                        setCount((item) => item + 1);
                        push({ id: count, phone: '', type: '', full_name: '' });
                      }}
                      startIcon={<Add />}
                    >
                      Yangi qo'shish
                    </Button>
                  </Grid>
                </>
              )}
            </FieldArray>
            <Box ml={3} mt={2}>
              <LoadingButton loading={formik.isSubmitting} variant="contained" type="submit" color="primary"
                             startIcon={<Send variant="bold" />}>
                Saqlash
              </LoadingButton>
            </Box>
          </Grid>
        </form>
        {/*<AlertDialog title={name} open={open} handleClose={handleOpenDialog} />*/
        }
        {/*<AlertProductDelete title={name} open={open} handleClose={handleModalClose} />*/
        }
      </FormikProvider>

    </MainCard>
  );

};

export default ClientContactsForm;

