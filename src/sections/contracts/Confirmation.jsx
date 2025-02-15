import OtpCreditConfirmation from '../forms/OtpCreditConfirmation';
import Grid from '@mui/material/Grid';
import RoundIconCard from '../../components/cards/statistics/RoundIconCard';
import MainCard from '../../components/MainCard';
import { SlEnvolope } from 'react-icons/sl';

const Confirmation = ({ handleBack, handleNext }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MainCard title={'Tasdiqlash kodini kiriting'}>
            <OtpCreditConfirmation handleNext={handleNext}  />
          </MainCard>
        </Grid>
        <Grid item xs={6}>
          <RoundIconCard
            primary="-Tasdiqlash kodi mijoz raqamiga sms tarzida yuborildi"
            content="-Kod 6 ta raqamdan iborat bo'lishi kerak"
            iconPrimary={SlEnvolope}
            color="primary.darker"
            bgcolor="lighter"
          />
        </Grid>
      </Grid>

    </>
  );
};
export default Confirmation;