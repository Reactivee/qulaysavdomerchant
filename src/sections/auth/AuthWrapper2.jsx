import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthSideImg from 'assets/images/auth/img-auth-sideimg.png';
import SwitchTheme from '../../layout/Dashboard/Header/HeaderContent/SwitchTheme';
import Button from '@mui/material/Button';
import useConfig from '../../hooks/useConfig';
import { useMemo, useState } from 'react';
import Localization from '../../layout/Dashboard/Header/HeaderContent/Localization';
import Stack from '@mui/material/Stack';

import Partner from '../forms/partner';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper2({ children }) {
  const { i18n, menuOrientation } = useConfig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState(false);
  const localization = useMemo(() => <Localization dropDown={true} />, [i18n]);
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Stack spacing={1} direction="row" rows sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        right: 150,
        top: 15,
        zIndex: 100
        // width: '280px',
      }}>
        <Button onClick={() => setOpen(prev => !prev)} variant="outlined" color="secondary">Hamkorlik</Button>
        {localization}

        <SwitchTheme />

      </Stack>

      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.paper'
        }}
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item md={7}
                  sx={{ display: { xs: 'none', md: 'flex' }, alignSelf: 'center', justifyContent: 'flex-start' }}>
              <img src={AuthSideImg} alt="Authimg" style={{ height: '100vh', minHeight: '100%', width: '100%' }} />
            </Grid>
            <Grid item md={5} sx={{ display: 'flex', justifyContent: 'center' }}>

              <AuthCard border={false}>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Partner open={open} setOpen={setOpen}></Partner>
    </Box>
  );
}

AuthWrapper2.propTypes = { children: PropTypes.node };
