import MainCard from '../../../components/MainCard';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AddCircle, Briefcase, Profile } from 'iconsax-react';
import { useParams } from 'react-router';
import AnimateButton from '../../../components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useClientContext } from '../../../contexts/ClientContext';

const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let selectedTab = 0;
  const { pathname } = useLocation();
  const { data } = useClientContext();

  switch (pathname) {
    case `/customer/edit/${id}`:
      selectedTab = 0;
      break;
    case `/customer/orders/${id}`:
      selectedTab = 1;
      break;
    default:
  }
  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const newCreateOrder = () => {
    navigate(`/customer/create/${id}`);
  };

  return (
    <MainCard border={false}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
        width: '100%'
      }}>
        <Stack direction="row" spacing={2}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto"
                aria-label="account profile tab">
            <Tab label="Shaxsiy ma'lumotlar" component={Link} to={`/customer/edit/${id}`} icon={<Profile />}
                 iconPosition="start" />
            <Tab label="Arizalar" component={Link} to={`/customer/orders/${id}`} icon={<Briefcase
              size="32"
            />} iconPosition="start" />
          </Tabs>
        </Stack>
        {data && data.limit > 0 ? <AnimateButton>
          <Button onClick={() => newCreateOrder()} sx={{ px: 3 }} variant="outlined">
            <AddCircle style={{ marginRight: 8 }} />
            Yangi buyurtma yaratish</Button>
        </AnimateButton> : <Button disabled sx={{ px: 3 }} variant="dashed">
          <AddCircle style={{ marginRight: 8 }} />
          Yangi buyurtma yaratish</Button>}

      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};
export default Account;