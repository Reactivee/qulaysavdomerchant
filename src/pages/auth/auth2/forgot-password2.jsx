import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import useAuth from 'hooks/useAuth';
import AuthWrapper2 from 'sections/auth/AuthWrapper2';
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword';

// ================================|| FORGOT PASSWORD ||================================ //

export default function ForgotPassword() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline"
                 sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Parolni tiklash</Typography>

            <Typography
              component={Link}
              to={'/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Orqaga qaytish
            </Typography>
          </Stack>
          <Typography variant="h6">Sizning raqamingizga tasdiqlash kodi yuboriladi</Typography>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
}
