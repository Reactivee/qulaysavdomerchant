import Grid from '@mui/material/Grid';
import { UserAdd } from 'iconsax-react';
import RoundIconCard from '../../../components/cards/statistics/RoundIconCard';
import Loadable from '../../../components/Loadable';
import { lazy } from 'react';

const ClientCheckForm = Loadable(lazy(() => import('../../../sections/forms/client/ClientCheckForm')));

const Check = () => {
  return (<>
    <Grid container spacing={4} justifyContent="center">
      <Grid item sx={{ mt: 1 }} xs={6}>
        <ClientCheckForm />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={6}>
        <RoundIconCard
          primary="-Mijoz mavjudligini tekshirish uchun telefon raqamini kiriting"
          content="-Raqam 9 ta raqamdan iborat bo'lishi kerak"
          iconPrimary={UserAdd}
          color="warning.darker"
          bgcolor="warning.lighter"
        />
      </Grid>
    </Grid>
  </>);
};
export default Check;