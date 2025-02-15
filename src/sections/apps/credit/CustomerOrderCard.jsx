import MainCard from '../../../components/MainCard';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { formatPrice } from '../../../utils/functions';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';


const CustomerOrderCard = ({ order }) => {
  const navigate = useNavigate();
  const status = (id, name) => {
    switch (id) {
      case 1:
        return <Chip color="info" label={name} size="small" variant="light" />;
      case 2:
        return <Chip color="warning" label={name} size="small" variant="light" />;
      case 4:
        return <Chip color="success" label={name} size="small" variant="light" />;
      case -1:
        return <Chip color="error" label={name} size="small" variant="light" />;
      default:
        return <Chip color="error" label={name} size="small" variant="light" />;
    }
  };

  const toOrderView = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <MainCard title={`№${order.code}`}>
      <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between" spacing={2}>
        <Typography>Miqdori</Typography>
        <Typography>{formatPrice(order.total_price)} so'm</Typography>
      </Stack>
      <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between" spacing={2}>
        <Typography>Yaratilgan sana</Typography>
        <Typography>{order.created_at}</Typography>
      </Stack>
      <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between" spacing={2}>
        <Typography>Status</Typography>
        <Typography>{(status(order.status, order.status_name))}</Typography>
      </Stack>
      <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between" spacing={2}>
        <Typography>Muddati</Typography>
        <Typography>{order.tariff_duration} oy</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <AnimateButton>
        <Button onClick={() => toOrderView(order.id)} fullWidth={true} variant="contained">Batafsil</Button>
      </AnimateButton>
    </MainCard>
  );
};
export default CustomerOrderCard;