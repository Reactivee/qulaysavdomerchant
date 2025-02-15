import Grid from '@mui/material/Grid';
import MainCard from '../../components/MainCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Calendar2 } from 'iconsax-react';
import RoundIconCard from '../../components/cards/statistics/RoundIconCard';
import { ru } from 'date-fns/locale';
import { useEffect } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const SelectDateContract = ({ formData, updateFormData }) => {

  const setPaymentDay = (date) => {
    const paymentDay = {
      'payment_date': date.getDate()
    };
    updateFormData(paymentDay);
  };

  let thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();

  const maxDay = 20;
  if (thisMonth === 12)
    thisYear = thisYear + 1;
  useEffect(() => {
    if (formData.payment_date == '')
      setPaymentDay(new Date(`${thisMonth + 1}.${today}.${thisYear}`));
  }, []);

  return (<>
    <Grid container sx={{ mt: 2 }} spacing={3} xs={12}>
      <Grid item xs={6}>
        <MainCard title="Birinchi to'lov sanasi">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Stack spacing={3}>
              {/*<MobileDatePicker*/}
              {/*  label="Birinchi to'lov sanasini tanlang"*/}
              {/*  inputFormat="MM/dd/yyyy"*/}
              {/*  minDate={new Date(`${thisMonth + 1}.01.${thisYear}`)}*/}
              {/*  maxDate={new Date(`${thisMonth + 1}.${maxDay}.${thisYear}`)}*/}
              {/*  // value={new Date(formData.payment_date ? formData.payment_date : null)}*/}
              {/*  onChange={setPaymentDay}*/}
              {/*  // defaultValue={new Date(`${thisMonth + 1}.${today}.${thisYear}`)}*/}
              {/*  renderInput={(params) => <TextField {...params} />}*/}
              {/*/>*/}
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                onChange={setPaymentDay}
                minDate={new Date(`${thisMonth + 1}.01.${thisYear}`)}
                maxDate={new Date(`${thisMonth + 1}.${maxDay}.${thisYear}`)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </MainCard>

      </Grid>
      <Grid item xs={6}>
        <RoundIconCard
          primary="-Mijoz uchun qulay bo'lgan kunni tanlang"
          content="-Iltimos, mijozdan unga qulay bo'lgan to'lov kunni so'rang"
          iconPrimary={Calendar2}
          color="warning.darker"
          bgcolor="warning.lighter"
        />
      </Grid>
    </Grid>

  </>);
};
export default SelectDateContract;