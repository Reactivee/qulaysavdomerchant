import * as yup from 'yup';
import { useFormik } from 'formik';
import MainCard from '../../../components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { PatternFormat } from 'react-number-format';
import { SearchNormal, Warning2 } from 'iconsax-react';
import { useClientContext } from '../../../contexts/ClientContext';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { clearPhoneNumber } from '../../../utils/clearPhone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../../utils/functions';
import Chip from '@mui/material/Chip';
import { NavLink } from 'react-router-dom';

const validationSchema = yup.object({
  phone: yup.string().min(11, 'Telefon raqam talab etiladi').required('Telefon raqam talab etiladi')
  // code: yup.string().max(4, 'should be of max 4 characters length').required('Kodni kiriting')
});
const ClientSearch = () => {

  const { searchClientByPhone } = useClientContext();
  const [isEmpty, setIsEmpty] = useState(false);
  const [user, setUser] = useState({});
  const formik = useFormik({
    initialValues: {
      phone: ''
    },

    validationSchema,
    onSubmit: async (data) => {
      setIsEmpty(false);
      formik.setSubmitting(true);
      const { phone } = data;
      const fullPhone = clearPhoneNumber(`998${phone}`);
      await searchClientByPhone(fullPhone).then((result) => {
          setUser(result.data);
        },
        (error) => {
          setUser({});
          setIsEmpty(true);
          console.log(error);
        }
      );
      formik.setSubmitting(true);

    }
  });

  return (<>
    <MainCard title="Mijozni qidirish">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phone">Telefon raqami</InputLabel>
              <PatternFormat

                id="phone"
                name="phone"
                placeholder="99 999 99 99"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                format="## ### ####"
                mask=""
                customInput={TextField}
                InputProps={{
                  startAdornment: '+998'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <LoadingButton loading={formik.isSubmitting} startIcon={<SearchNormal />} sx={{ textTransform: 'none' }}
                             variant="contained" type="submit">
                Mijozni qidirish
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
    <Stack sx={{ mt: 2 }}>
      {user && user.id && <MainCard contentSX={{ px: 1, py: 0 }}>
        <List>
          <ListItem divider>
            <Grid container>
              <Grid item>
                <Typography variant="h6">Mijoz</Typography>
                <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={`/customer/edit/${user.id}`}>
                  <Typography variant="h5">{user.full_name ? user.full_name : user.phone}
                    <Chip variant="light" sx={{ ml: 3 }} label={user.status_name} color="success" />
                  </Typography>
                </NavLink>

              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item>
                <Typography variant="h6">Limit</Typography>
                <Typography variant="h5">{formatPrice(user.limit)} so'm</Typography>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </MainCard>}


    </Stack>


    <Stack sx={{ mt: 2 }}>
      {isEmpty ? <Alert color="error" icon={<Warning2 variant="Bold" />}>
        Mijoz topilmadi
      </Alert> : ''}

    </Stack>
  </>)
    ;


};
export default ClientSearch;