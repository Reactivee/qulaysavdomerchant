import MainCard from '../../../components/MainCard';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Lock, Profile } from 'iconsax-react';
import Typography from '@mui/material/Typography';
import { MdOutlinePhoneInTalk } from 'react-icons/md';

import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';


const MerchantInfoBar = ({ data }) => {

  // const orderStatus = () => {
  //   switch (customer_order.status) {
  //     case -1:
  //       return (<Chip size="meduim" variant="light" sx={{ mb: 1 }} color={`error`}
  //                     label={customer_order.status_name}>
  //       </Chip>);
  //     case 1:
  //       return (<Chip sx={{ mb: 1 }} size="meduim" variant="light" color={`success`} label={customer_order.status_name}>
  //       </Chip>);
  //     case 2:
  //       return (<Chip sx={{ mb: 1 }} size="meduim" variant="light" color={`warning`}
  //                     label={customer_order.status_name}>
  //         {customer_order.status_name}
  //       </Chip>);
  //     case -2:
  //       return (<Chip sx={{ mb: 1 }} size="meduim" variant="light" color={`error`}
  //                     label={customer_order.status_name}>
  //         {customer_order.status_name}
  //       </Chip>);
  //
  //     default:
  //       return (
  //         <Chip sx={{ mb: 1, px: 1 }} size="meduim" variant="light" color={`info`}
  //               label={customer_order.status_name}>
  //           {customer_order.status_name}
  //         </Chip>);
  //   }
  // };

  return (
    <>
      <MainCard contentSX={{ px: 3 }}>
        <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
          <Chip sx={{ ml: 2 }} color="primary" label={data?.role?.name}
                size="meduim" variant="light" />
        </Stack>
        <Stack spacing={2.5} alignItems="center">
          <Avatar alt="Natacha" sx={{ width: 60, height: 60 }}><Profile variant="Bold" /></Avatar>

        </Stack>

        <Stack spacing={0.5} sx={{ my: 2 }} alignItems="center">
          <Typography sx={{ textAlign: 'center' }}
                      variant="h5">{data?.full_name}
          </Typography>
          <Divider />
          <Typography variant="h6" color="secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <MdOutlinePhoneInTalk style={{ marginRight: 5 }} size={20} /> {data?.phone}
            <Chip sx={{ ml: 2 }} color={data.status === 10 ? 'success' : 'error'} label={data?.status_name}
                  size="meduim" variant="light" />
          </Typography>
        </Stack>

        {/*<List component="nav" sx={{ pt: 1, '& .MuiListItemIcon-root': { minWidth: 32, color: 'secondary.main' } }}>*/}
        {/*  <ListItemButton selected={true}>*/}
        {/*    <ListItemIcon>*/}
        {/*      <Profile size={18} />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Shahsiy ma'lumotlar" />*/}
        {/*  </ListItemButton>*/}
        {/*  <ListItemButton selected={false}>*/}
        {/*    <ListItemIcon>*/}
        {/*      <Lock size={18} />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Parol almashtirish" />*/}
        {/*  </ListItemButton>*/}
        {/*</List>*/}

      </MainCard>
    </>
  );
};
export default MerchantInfoBar;