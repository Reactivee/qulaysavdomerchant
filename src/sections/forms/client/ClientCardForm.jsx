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

import AnimateButton from 'components/@extended/AnimateButton';
import { PatternFormat } from 'react-number-format';
import { useClientContext } from 'contexts/ClientContext';
import { Alert } from '@mui/material';
import {
  Send,
  Warning2
} from 'iconsax-react';

import LoadingButton from '../../../components/@extended/LoadingButton';
import AlertTitle from '@mui/material/AlertTitle';
import { useRef } from 'react';
import { useParams } from 'react-router';

import { MdOutlineCancel } from 'react-icons/md';


/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  card_number: yup.string().min(19, 'Karta raqami 16 ta belgigan iborat bo\'lishi kerak').required('Karta raqami talab etiladi'),
  expire_date: yup.string().min(5, 'Amal qilish muddati talab etiladi').required('Amal qilish muddati talab etiladi')
  // code: yup.string().max(4, 'should be of max 4 characters length').required('Kodni kiriting')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const ClientCardForm = () => {
  const {
    attr,
    attachClientCard,
    cards,
    confirmClientCard,
    getCardListClient
  } = useClientContext();
  const { id } = useParams();
  const card_id = useRef('');

  const formik = useFormik({
    initialValues: {
      card_number: '',
      expire_date: '',
      code_card: ''
    },

    validationSchema,
    onSubmit: (data) => {
      if (card_id.current) {
        try {
          confirmAddedCard(data).then((result) => {
            formik.setSubmitting(false);
            formik.resetForm();
            card_id.current = '';
            getCardListClient(id);
          });
        } catch (error) {
          console.error(error);
        }

      } else {
        try {
          addCard(data).then(() => {
            formik.setSubmitting(false);
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  });


  const addCard = async (data) => {
    const response = await attachClientCard(data);
    if (response) {
      card_id.current = response?.card?.id;
    }
  };
  const confirmAddedCard = async (data) => {
    const res = await confirmClientCard(data);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {cards && cards.length == 0 ? (
              <Alert style={{ marginBottom: 10 }} color="warning" variant="border" icon={<Warning2 variant="Bold" />}>
                <AlertTitle>Mijozda hali biriktirilgan kartalar yo'q</AlertTitle>
              </Alert>
            ) : (
              ''
            )}

            <Stack spacing={1}>
              <InputLabel htmlFor="passport">Karta raqami</InputLabel>
              <PatternFormat
                fullwidth
                id="card"
                name="card_number"
                placeholder="Karta raqamini yozing"
                type="text"
                value={formik.values.card_number}
                onChange={formik.handleChange}
                error={formik.touched.card_number && Boolean(formik.errors.card_number)}
                helperText={formik.touched.card_number && formik.errors.card_number}
                format="#### #### #### ####"
                mask=""
                customInput={TextField}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="expire_date">Amal qilish muddati</InputLabel>
              <PatternFormat
                fullwidth
                id="expire_date"
                name="expire_date"
                placeholder="04/29"
                type="text"
                value={formik.values.expire_date}
                onChange={formik.handleChange}
                error={formik.touched.expire_date && Boolean(formik.errors.expire_date)}
                helperText={formik.touched.expire_date && formik.errors.expire_date}
                format="##/##"
                mask=""
                customInput={TextField}
              />
            </Stack>
          </Grid>
          {card_id.current ? (
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="phone">Tasdiqlash kodi</InputLabel>
                <PatternFormat
                  fullwidth
                  id="code_card"
                  name="code_card"
                  placeholder="Kartaga biriktirilgan telefon raqamiga jo'natilgan kodni yozing"
                  type="text"
                  value={formik.values.code_card}
                  onChange={formik.handleChange}
                  error={formik.touched.code_card && Boolean(formik.errors.code_card)}
                  helperText={formik.touched.code_card && formik.errors.code_card}
                  format="######"
                  mask=" "
                  customInput={TextField}
                />
              </Stack>
            </Grid>
          ) : (
            ''
          )}

          {/* {error && (
            <Grid item xs={12}>
              <FormHelperText error>{error}</FormHelperText>
            </Grid>
          )} */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                {attr === 'time' ? (
                  <Button sx={{ textTransform: 'none' }} variant="contained">Qayta jo'natish</Button>
                ) : (
                  <LoadingButton variant="contained" type="submit" loading={formik.isSubmitting} color="primary"
                                 startIcon={<Send variant="bold" />}>
                    Saqlash
                  </LoadingButton>
                )}
              </AnimateButton>
              <AnimateButton>
                <LoadingButton sx={{ ml: 2, textTransform: 'none' }}
                               variant="contained" color="secondary" type="reset" onClick={() => formik.resetForm()}
                               startIcon={<MdOutlineCancel variant="bold" />}>
                  Bekor qilish
                </LoadingButton>

              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>

    </>
  );
};
export default ClientCardForm;
