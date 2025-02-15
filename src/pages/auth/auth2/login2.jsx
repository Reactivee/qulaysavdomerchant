// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
// import Logo from 'components/logo';
import AuthWrapper2 from 'sections/auth/AuthWrapper2';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import Logo from '../../../components/logo';
// ================================|| LOGIN ||================================ //

export default function Login2() {


  return (
    <AuthWrapper2>

      <Grid container spacing={3}>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {/*<Logo />*/}
          {/*<Logo isIcon={false} sx={{ width: 80 }} />*/}

        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline"
                 sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Hisobingizga kiring</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin forgot="/auth/forgot-password2" />
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
}
