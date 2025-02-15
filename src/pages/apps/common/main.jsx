// material-ui

import Grid from '@mui/material/Grid';
import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
import HoverSocialCard from '../../../components/cards/customerCard/HoverSocialCard';
import { Calculator, MessageQuestion } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import { FcOnlineSupport } from 'react-icons/fc';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const ClientCheckForm = Loadable(lazy(() => import('../../../sections/forms/client/ClientCheckForm')));
const TodayOrdersListTable = Loadable(lazy(() => import('../../../components/orders/TodayOrdersListTable')));
const TodayCustomerListTable = Loadable(lazy(() => import('../../../components/client/TodayCustomerListTable')));

// ==============================|| SAMPLE PAGE ||============================== //

export default function Main() {
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sx={{ mt: 1 }} xs={12} md={6}>
          <ClientCheckForm />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link style={{ textDecoration: 'none' }} to="/calculator">
                <HoverSocialCard sx={{ height: '100%' }} secondary="Kalkulator" iconPrimary={Calculator}
                                 color={theme.palette.primary.main} />
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link style={{ textDecoration: 'none' }} to="/faq">
                <HoverSocialCard secondary="Ko'p beriladigan savollar" iconPrimary={MessageQuestion}
                                 color={theme.palette.info.main} />
              </Link>
            </Grid>
            <Grid item xs={6}>
              {/*<FcOnlineSupport*/}
              <Link style={{ textDecoration: 'none' }} target="_blank" to="https://t.me/abomuslimov">
                <HoverSocialCard secondary="Texnik yordamga murojaat qilish" iconPrimary={FcOnlineSupport}
                                 color={theme.palette.warning.main} />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TodayCustomerListTable />
        </Grid>
        <Grid item xs={6}>
          <TodayOrdersListTable />
        </Grid>
      </Grid>
    </>

  );
}
