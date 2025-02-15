import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { BiCheckboxChecked } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';


const ThanksContract = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backToCustomer = () => {
    navigate(`/customer/orders/${id}`);
  };

  return (
    <>
      <Alert color="success" variant="border" sx={{ mt: 4 }} icon={<BiCheckboxChecked sx={{ fontsize: '50px' }} />}>
        <AlertTitle variant="h3">Ariza muvaffaqiyatli jo'natildi</AlertTitle>
        <Typography variant="h6"> Ariza javobi SMS orqali yuboriladi </Typography>
      </Alert>
      <Stack direction="row" justifyContent={'center'} sx={{ mt: 2 }} spacing={2}>
        <Button onClick={() => backToCustomer()} variant="contained" sx={{ px: 8 }}>Orqaga</Button>
      </Stack>
    </>
  );
};
export default ThanksContract;
