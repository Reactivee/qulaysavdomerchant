import MainCard from '../../../components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '../../../components/@extended/Avatar';
import Typography from '@mui/material/Typography';
import { BsPhone } from 'react-icons/bs';
import { DollarCircle, Money, Star, UserEdit } from 'iconsax-react';
import Tooltip from '@mui/material/Tooltip';

const CustomerTopBar = ({ title, phone, status, color, limit }) => {
  return (
    <MainCard>
      <Grid container spacing={2}>


        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={3} justifyContent="start">
            {title ?
              <Tooltip title="Mijoz to'liq ismi">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar variant="rounded" color={color}>
                  <UserEdit />
                </Avatar>
                <Typography variant="subtitle1">{title}</Typography>
              </Stack>
              </Tooltip>
              : ''}

            <Tooltip title="Mijoz telefon raqami">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar variant="rounded" color={color}>
                  <BsPhone />
                </Avatar>
                <Typography variant="subtitle1">+{phone}</Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Status">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar variant="rounded" color={color}>
                  <Star />
                </Avatar>
                <Typography variant="subtitle1">{status}</Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Limit">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar variant="rounded" color={color}>
                  <DollarCircle />
                </Avatar>
                <Typography variant="subtitle1">{limit} so'm</Typography>
              </Stack>
            </Tooltip>

          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );

};
export default CustomerTopBar;