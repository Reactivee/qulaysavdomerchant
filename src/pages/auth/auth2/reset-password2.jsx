// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthWrapper2 from 'sections/auth/AuthWrapper2';
import AuthResetPassword from 'sections/auth/auth-forms/AuthResetPassword';

// ================================|| RESET PASSWORD ||================================ //

export default function ResetPassword() {
  return (
    <AuthWrapper2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Parol qayta tiklash</Typography>
            <Typography color="secondary">Yangi parol kiriting</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthResetPassword />
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
}
