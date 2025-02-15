import { useParams } from 'react-router';

import Grid from '@mui/material/Grid';
import CustomerOrderCard from '../../../sections/apps/credit/CustomerOrderCard';
import React, { useEffect, useState } from 'react';
import CardSkeleton from '../../../components/skeletons/CardSkeleton';
import { Warning2 } from 'iconsax-react';
import Alert from '@mui/material/Alert';
import { useClientContext } from '../../../contexts/ClientContext';

const CustomerOrder = () => {

  const { id } = useParams();
  const { getClientOrders, orders } = useClientContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const { orders, meta, error, isLoading, empty } = useGetCustomerOrders(id);
  const fetchCustomerOrders = async () => {
    setIsLoading(true);
    try {
      await getClientOrders(id).then((result) => {
      });
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomerOrders();
  }, [id]);

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from(new Array(4)).map((item, index) => {
          return (
            <Grid key={index} item xs={2} md={3}>
              <CardSkeleton />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  if (isError) {
    return (
      <Alert
        variant="border"
        color="error"
        icon={<Warning2 />}
      >
        Ma'lumot olishda xatolik
      </Alert>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <Alert
        variant="border"
        color="warning"
        icon={<Warning2 />}
      >
        Sizda arizalar topilmadi
      </Alert>
    );
  }

  return (
    <>
      <Grid container sx={12} spacing={2}>
        {orders && orders.map((order, index) => {
          return (
            <Grid item xs={6} md={3} lg={4} key={index}>
              <CustomerOrderCard order={order} />
            </Grid>
          );
        })}
      </Grid>
    </>
  )
    ;


};
export default CustomerOrder;