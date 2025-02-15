import Grid from '@mui/material/Grid';
import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
const ClientSearch = Loadable(lazy(() => import('../../../sections/forms/client/ClientSearch')));

const Search = () => {
  return (<>
    <Grid container spacing={4}>
      <Grid item sx={{ mt: 1 }} xs={6}>
        <ClientSearch />
        {/*<Alert sx={{ mt: 1 }} color="error" variant="border" icon={<Warning2 variant="Bold" />}>*/}
        {/*  <AlertTitle>Mijoz topilmadi</AlertTitle>*/}
        {/*</Alert>*/}

      </Grid>
    </Grid>

  </>);
};
export default Search;