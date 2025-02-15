import MainCard from '../MainCard';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PatternFormat } from 'react-number-format';
import uzcard from '../../assets/images/icons/uzcard.png';
import humo from '../../assets/images/icons/humo.png';

function ClientPaymentCard({ card }) {
  const { id, expire_date, card_number, type } = card;
  let newCardNumber = 0;
  if (card_number) {
    newCardNumber = card_number.toString().slice(0, 6);
    newCardNumber += card_number.toString().slice(12, 16);
  }

  return (
    <MainCard content={false} sx={{ cursor: 'pointer' }}>
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          value={id}
          control={<Radio value={id} />}
          sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack spacing={0.5} sx={{ ml: 1 }}>
                  <Typography color="secondary">{name}</Typography>
                  <Typography variant="subtitle1">
                    <PatternFormat value={newCardNumber} displayType="text"
                                   type="text"
                                   format="#### ##** **** ####" />
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                  <img width="25px" src={type === 'humo' ? humo : uzcard} alt="payment card" />
                </Stack>
              </Grid>
            </Grid>
          }
        />
      </Box>
    </MainCard>
  );
}

export default ClientPaymentCard;