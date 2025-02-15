import { useOrdersContext } from '../../../contexts/OrdersContext';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import MainCard from '../../../components/MainCard';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularWithPath from '../../../components/@extended/progress/CircularWithPath';
import Grid from '@mui/material/Grid';
import {Warning2 } from 'iconsax-react';
import Alert from '@mui/material/Alert';
import ListProducts from '../../../sections/apps/credit/ListProducts';
import DebtGraph from '../../../sections/apps/credit/DebtGraph';
import ProfileInfo from '../../../sections/apps/credit/ProfileInfo';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ReturnProducts from '../../../sections/apps/return/ReturnProducts';
import ReturnedContent from '../../../sections/apps/return/ReturnedContent';

const OrderEdit = () => {
  const {
    error,
    isLoading,
    customer_order,
    getInstallmentOrderSingleCustomer,
    getInstallmentContract
  } = useOrdersContext();

  const [pdfLoading, setPdfLoading] = useState(false);
  const { id } = useParams();


  useEffect(() => {
    getInstallmentOrderSingleCustomer(id);
  }, [id]);

  const downloadContract = async () => {
    setPdfLoading(true);
    await getInstallmentContract(id).then((response) => {
        if (response) {
          // Get the binary data as a Blob
          const pdfUrl = URL.createObjectURL(response);
          if (pdfUrl) {
            // Open the PDF in a new tab
            window.open(pdfUrl, '_blank');
            // Cleanup the URL after some time (optional)
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000); // Cleanup after 1 minute
          }
        }
        setPdfLoading(false);
      },
      (error) => {
        setPdfLoading(false);
        console.log(error);
      }
    );

  };

  if (error)
    return (
      <Alert color="error" variant="filled" icon={<Warning2 size={20} variant="Bold" />}>
        <Typography variant="h6"> Ma'lumot olishda xatolik</Typography>
      </Alert>
    );

  return (
    <>
      {isLoading ? (
        <Box sx={{ p: 5 }}>
          <Stack direction="row" justifyContent="center">
            <CircularWithPath />
          </Stack>
        </Box>
      ) : (
        <>

          {customer_order ?
            <Grid container xs={12} spacing={3}>
              <Grid item xs={5} md={5} lg={4}>

                <ProfileInfo customer_order={customer_order} />

                <Box sx={{ mt: 2 }}>
                  <DebtGraph graph={customer_order?.graphics} />
                </Box>
              </Grid>

              <Grid item xs={7} md={7} lg={8}>
                {customer_order && customer_order.products.length > 0 ?
                  <ListProducts loading={pdfLoading} downloadContract={downloadContract}
                                customer_order={customer_order} /> : ''}

                <Box sx={{ mt: 2 }}>
                  <MainCard title="Sharhlar">
                    <Alert icon={<Warning2 />} sx={{ mb: 1 }} variant="border" color="warning">
                      Hech qanday izoh yo'q
                    </Alert>
                  </MainCard>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <MainCard title={<Stack direction="row" justifyContent="space-between">
                    <Typography variant="bold">Qaytarishlar</Typography>
                    {customer_order && customer_order.status === 4 ? <Link to={`/orders/reject/${id}`}>
                      <Button variant="contained" sx={{ textTransform: 'none' }}>Qaytarish uchun so'rov</Button>
                    </Link> : ''}
                  </Stack>}>

                    {customer_order && customer_order.cancels.map(cancel => {
                      return (
                        <Stack sx={{ mb: 2 }} spacing={2}>
                          <ReturnProducts cancel={cancel} />
                          <ReturnedContent cancel={cancel} />
                        </Stack>
                      );
                    })}

                    {customer_order && customer_order.cancels.length === 0 ? (
                      <Alert icon={<Warning2 />} sx={{ mb: 1 }} variant="border" color="warning">
                        Qaytarishlar mavjud emas
                      </Alert>
                    ) : ''}

                  < /MainCard>
                </Box>
              </Grid>

            </Grid> : ''}
        </>

      )}
    </>


  );
};
export default OrderEdit;