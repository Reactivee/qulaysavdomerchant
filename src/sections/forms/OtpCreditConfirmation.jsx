import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { PatternFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import AnimateButton from '../../components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import LoadingButton from '../../components/@extended/LoadingButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useContractContext } from '../../contexts/ContractContext';
import { useParams } from 'react-router';
import { openSnackbar } from '../../api/snackbar';
import { useNavigate } from 'react-router-dom';


/**
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  code: yup.string().min(6, 'SMS kodni kiriting').required('SMS kodni kiriting')
  // code: yup.string().max(4, 'should be of max 4 characters length').required('Kodni kiriting')
});

const OtpCreditConfirmation = ({ handleNext }) => {
  const [resendConfirmation, setResendConfirmation] = useState(false);
  const { token, credit, confirmationWithOtpCredit, reSendConfirmationWithOtpCredit } = useContractContext();

  const formik = useFormik({
    initialValues: {
      phone: '',
      code: ''
    },

    validationSchema,
    onSubmit: (data) => {

      if (token && credit) {
        const { id: creditId } = credit;
        const upComingDate = {
          'token': token,
          'code': data?.code
        };
        formik.setSubmitting(true);
        try {
          confirmationWithOtpCredit({ creditId, upComingDate }).then((result) => {
            formik.setSubmitting(false);

            if (result && result.status) {
              openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                message: 'Ariza yaratildi',
                variant: 'alert',
                alert: {
                  color: 'success'
                }
              });
              handleNext();
              // handleNavigateAfterConfirmation();
            }
            if (result && result?.errors?.attribute === 'time') {
              setResendConfirmation(true);
              formik.resetForm();
            }

          }).catch((e) => {
            console.log(e);
          });

        } catch (error) {
          console.log(error);
        } finally {

          formik.setSubmitting(false);
        }
      }
    }
  });

  const reSendConfirmation = async () => {
    formik.setSubmitting(true);
    await reSendConfirmationWithOtpCredit(token).then(result => {
      if (result && result.status) {
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: 'Mijoz raqamiga sms jo\'natildi',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
        setResendConfirmation(false);
      }
    });
    formik.setSubmitting(false);

  };

  // const handleNavigateAfterConfirmation = () => {
  //   console.log(token);
  //   // navigate(`/customer/orders/${id}`);
  // };

  return (<>
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <PatternFormat
              fullwidth
              id="code"
              name="code"
              placeholder="Mijozning telefon raqamiga jo'natilgan 6 xonali kodni yozing"
              type="text"
              autoFocus={true}
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              format="######"
              mask=" "
              customInput={TextField}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <AnimateButton>
              {resendConfirmation ? (
                <Button loading={formik.isSubmitting} onClick={() => reSendConfirmation()}
                        sx={{ textTransform: 'none' }} variant="contained">Qayta
                  jo'natish</Button>
              ) : (
                <Button loading={formik.isSubmitting} variant="contained" type="submit" color="primary">
                  Tasdiqlash
                </Button>
              )}
            </AnimateButton>


          </Stack>
        </Grid>
      </Grid>
    </form>

  </>);
};
export default OtpCreditConfirmation;