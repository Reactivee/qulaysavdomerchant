import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import MainCard from '../../components/MainCard';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCalculateTariff, useGetTariff } from '../../api/tariff';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { formatPrice } from '../../utils/functions';
import CardSkeleton from '../../components/skeletons/CardSkeleton';
import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Warning2 } from 'iconsax-react';


export function TarifCard({ calc }) {
  const { id, duration, monthly_payment, total_price } = calc;

  return (
    <MainCard content={false} sx={{ cursor: 'pointer' }}>
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          value={id}
          control={<Radio value={id} />}

          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            '& .MuiFormControlLabel-label': { width: '100%', margin: '0' }
          }}
          label={
            <>
              <List disablePadding sx={{ '& .MuiListItem-root': { px: 1, py: 1.5 } }}>
                <ListItem
                  divider
                >
                  <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography color="secondary">Muddat</Typography>
                    <Typography color="secondary">{duration} oy</Typography>
                  </Stack>
                </ListItem>
                <ListItem
                  divider
                >
                  <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography color="secondary">Oylik to'lov</Typography>
                    <Typography color="secondary">{formatPrice(monthly_payment)} so'm</Typography>
                  </Stack>
                </ListItem>
                <ListItem
                >
                  <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography color="secondary">Muddatli to'lov narxi</Typography>
                    <Typography color="secondary">{formatPrice(total_price)} so'm</Typography>
                  </Stack>
                </ListItem>
              </List>
            </>
          }
        />
      </Box>
    </MainCard>
  );
}


const ListOfTariff = ({ formData, updateFormData }) => {
  const { products } = formData;
  let price = 0;
  if (products && products.length > 0) {
    price = products.reduce((acc, cur) => {
      acc += Number(cur.price * cur.count);
      return acc;
    }, 0);
  }
  const {
    calc, isLoading, error
  } = useCalculateTariff(price);

  useEffect(() => {
    if (calc && !formData.tariff_id) {
      handleChange(calc[0].id);
    }
  }, [calc]);

  const handleChange = (id) => {
    const selectedDuration = { 'tariff_id': Number(id) };
    updateFormData(selectedDuration);

  };

  if (isLoading) {
    return (
      <Grid container xs={12} sx={{ mt: 2 }} spacing={3}>
        {Array.from(new Array(4)).map((item, index) => {
          return (
            <Grid key={index} item xs={1} md={2} lg={3}>
              <CardSkeleton />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert
        variant="border"
        color="error"
        icon={<Warning2 />}
      >
        Ma'lumot olishda xatolik
      </Alert>
    );
  }


  return (
    <RadioGroup aria-label="tariff_id" name="tariff_id" value={formData.tariff_id}
                onChange={(e) => handleChange(e.target.value)}>
      <Stack>
        <Grid item xs={12} container sx={{ mt: 1 }} spacing={2.5}>
          {calc && calc.map((item, index) => {
            return (
              <Grid key={index} xs={4} item gap={2}>
                <TarifCard formData={formData} updateFormData={updateFormData} key={index} calc={item} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </RadioGroup>


  );
};
export default ListOfTariff;