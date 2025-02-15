import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { FaHeadset } from 'react-icons/fa';

const Support = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mr: 2, alignItems: 'center' }}>
      <Typography sx={{ display: 'flex', alignItems: 'center', textWrap: 'nowrap', mr: 1, fontWeight: 600 }}
                  variant="h6" color="secondary">
        <FaHeadset size={20} style={{ marginRight: 5 }} /> Tex yordam:</Typography>
      <Link underline="none" href="tel:998915055545" sx={{ textWrap: 'nowrap', textDecoration: 'none' }} target="_blank"
            variant="h6"
            color="secondary">+998 91 505-55-45</Link>
    </Box>
  );
};
export default Support;