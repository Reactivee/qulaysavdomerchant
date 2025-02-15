import { Outlet } from 'react-router-dom';
import { useClientContext } from '../../contexts/ClientContext';

import { formatPrice } from '../../utils/functions';
import CustomerTopBar from '../../sections/apps/customer/CustomerTopBar';
import Box from '@mui/material/Box';
import ScrollTop from '../../components/ScrollTop';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { openSnackbar } from '../../api/snackbar';

const CustomerLayout = () => {
  const { data, getClientSingle, mutateClientData } = useClientContext();
  const { id } = useParams();



  return (
    <>
      <ScrollTop />
      <Box sx={{ mb: 1 }}>
        {data && data?.phone ? <CustomerTopBar title={data?.full_name}
                                               phone={data?.phone}
                                               status={data?.status_name}
                                               limit={formatPrice(data?.limit)} /> : ''}

      </Box>
      <Outlet />
    </>
  );
};
export default CustomerLayout;
