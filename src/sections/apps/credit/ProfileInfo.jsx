import MainCard from '../../../components/MainCard';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Calendar1, Calendar2, DocumentCode, DocumentText1, DollarCircle, Profile, Timer1 } from 'iconsax-react';
import Typography from '@mui/material/Typography';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { LuCalendar1 } from 'react-icons/lu';

import { formatPrice } from '../../../utils/functions';
import { DocumentContext } from 'yet-another-react-lightbox';


const ProfileInfo = ({ customer_order }) => {

  const orderStatus = () => {
    switch (customer_order.status) {
      case -1:
        return (<Chip size="meduim" variant="light" sx={{ mb: 1 }} color={`error`}
                      label={customer_order.status_name}>
        </Chip>);
      case 1:
        return (<Chip sx={{ mb: 1 }} size="meduim" variant="light" color={`success`} label={customer_order.status_name}>
        </Chip>);
      case 2:
        return (<Chip sx={{ mb: 1 }} size="meduim" variant="light" color={`warning`}
                      label={customer_order.status_name}>
          {customer_order.status_name}
        </Chip>);
      case -2:
        return (<Chip sx={{ mb: 1 }} size="meduim" variant="light" color={`error`}
                      label={customer_order.status_name}>
          {customer_order.status_name}
        </Chip>);

      default:
        return (
          <Chip sx={{ mb: 1, px: 1 }} size="meduim" variant="light" color={`info`}
                label={customer_order.status_name}>
            {customer_order.status_name}
          </Chip>);
    }
  };

  return (
    <>
      <MainCard contentSX={{ px: 1.5 }}>
        <Stack spacing={2.5} alignItems="center">
          <Avatar alt="Natacha" sx={{ width: 60, height: 60 }}><Profile variant="Bold" /></Avatar>
          {/*<Avatar alt="Avatar 1" sx={{ width: 50, height: 50 }} />*/}
        </Stack>

        <Stack spacing={0.5} sx={{ my: 2 }} alignItems="center">
          <Typography sx={{ textAlign: 'center' }}
                      variant="h5">{customer_order.client?.full_name}</Typography>
          <Typography variant="h5" color="secondary" sx={{ display: 'flex', alignItems: 'center' }}>

            <MdOutlinePhoneInTalk style={{ marginRight: 5 }} size={20} /> {customer_order.client?.phone}
            <Chip sx={{ ml: 2 }} color="success" label={customer_order.client?.status_name}
                  size="meduim" variant="light" />
          </Typography>
        </Stack>

        <Grid container sx={{ my: 2 }} xs={12}>
          <Grid sx={{ borderRight: 1, borderColor: '#e8e8e8' }} xs={6}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="h5">Status</Typography>
              {customer_order && customer_order.status ? orderStatus() : ''}

            </Stack>
          </Grid>
          <Grid xs={6}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="h5">Muddati</Typography>
              <Typography color="secondary" variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <LuCalendar1 size={20}
                             style={{ marginRight: 5 }} /> {customer_order?.tariff_duration} oy
              </Typography>
            </Stack>
          </Grid>

          <Grid sx={{ mt: 2, borderRight: 1, borderColor: '#e8e8e8' }} xs={6}>
            <Stack spacing={1} alignItems="center">

              <Typography variant="h5">Oylik to'lov</Typography>
              <Typography color="secondary" variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <DollarCircle size={20}
                              style={{ marginRight: 5 }} /> {formatPrice(customer_order?.monthly_payment)} so'm
              </Typography>

            < /Stack>
          </Grid>
          <Grid sx={{ mt: 2 }} xs={6}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="h5">Umumiy summa</Typography>
              <Typography color="secondary" variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <DollarCircle size={20}
                              style={{ marginRight: 5 }} /> {formatPrice(customer_order?.total_price)} so'm
              </Typography>
            </Stack>
          </Grid>
          <Grid sx={{ mt: 2, borderRight: 1, borderColor: '#e8e8e8' }} xs={6}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="h5">Shartnoma raqami</Typography>
              <Typography color="secondary" variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <DocumentText1 style={{ marginRight: 5 }} /> {customer_order.code}
              </Typography>
            </Stack>
          </Grid> <Grid sx={{ mt: 2 }} xs={6}>
          <Stack spacing={1} alignItems="center">
            <Typography variant="h5">Yaratilgan sana</Typography>
            <Typography color="secondary" variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
              <LuCalendar1 size={20} style={{ marginRight: 5 }} /> {customer_order.created_at}
            </Typography>
          </Stack>
        </Grid>
        </Grid>

      </MainCard>
    </>
  );
};
export default ProfileInfo;