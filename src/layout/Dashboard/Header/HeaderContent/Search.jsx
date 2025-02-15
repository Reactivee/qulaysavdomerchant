// material-ui
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// assets
import Typography from '@mui/material/Typography';
import useAuth from '../../../../hooks/useAuth';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function CompanyName() {
  const { logout, user } = useAuth();

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}>
      <Typography variant="h5" sx={{ color: 'black' }}>{user?.branch?.name}</Typography>
    </Box>
  );
}
