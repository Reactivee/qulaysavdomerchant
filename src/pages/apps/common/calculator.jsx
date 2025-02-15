import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import { useCalculateTariff } from '../../../api/tariff';
import Grid from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from 'react';
import { TarifCard } from '../../../sections/contracts/ListOfTariff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import { formatPrice } from '../../../utils/functions';
import MainCard from '../../../components/MainCard';
import { NumericFormat } from 'react-number-format';
import { clearCardNumber } from '../../../utils/clearPhone';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CardSkeleton from '../../../components/skeletons/CardSkeleton';
import Alert from '@mui/material/Alert';
import { Warning2 } from 'iconsax-react';
import AlertTitle from '@mui/material/AlertTitle';

const Calculator = () => {
  const [price, setPrice] = useState(0);
  const {
    calc, isLoading,
    error
  } = useCalculateTariff(price);

  const handleChange = (e) => {
    const timeout = setTimeout(() => {
      setPrice(clearCardNumber(e.target.value));
    }, 1000);
    return () => clearTimeout(timeout);

  };


  if (error) {
    return (
      <Alert color="error" variant="border" icon={<Warning2 variant="Bold" />}>
        <AlertTitle>Serverda xatolik</AlertTitle>
      </Alert>
    );
  }


  return (<>
    <Typography variant="h2" sx={{ mb: 3, mt: 2 }}><FormattedMessage id="Kalkulator" /></Typography>
    <InputLabel>Narx kiriting</InputLabel>

    <NumericFormat
      sx={{ mt: 1, width: '30%' }}
      allowLeadingZeros
      thousandSeparator=" "
      placeholder={'0'}
      name={`price`}
      onChange={handleChange}
      format="#########"
      mask="_"
      isAllowed={(values) => {
        const { floatValue } = values;
        return floatValue < 999999999;
      }}
      customInput={TextField}

    />
    {price > 0 && isLoading ? (
      <Grid container xs={12} sx={{ mt: 2 }} spacing={3}>
        {Array.from(new Array(12)).map((item, index) => {
          return (
            <Grid key={index} item xs={1} md={2} lg={3}>
              <CardSkeleton />
            </Grid>
          );
        })}
      </Grid>
    ) : ''}

    {price > 0 ?
      <>
        <Grid item xs={12} container sx={{ mt: 1 }} spacing={2.5}>
          {calc && calc.map((item, index) => {
            const { id, duration, monthly_payment, total_price } = item;
            return (
              <Grid key={id} xs={4} item gap={2}>
                <MainCard>
                  <List disablePadding sx={{ '& .MuiListItem-root': { px: 1, py: 1.5 } }}>
                    <ListItem
                      divider
                    >
                      <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                        <Typography color="secondary">Muddat</Typography>
                        <Typography color="secondary" variant="subtitle1">{duration} oy</Typography>
                      </Stack>
                    </ListItem>
                    <ListItem
                      divider
                    >
                      <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                        <Typography color="secondary">Oylik to'lov</Typography>
                        <Typography color="secondary"
                                    variant="subtitle1">{formatPrice(monthly_payment)} so'm</Typography>
                      </Stack>
                    </ListItem>
                    <ListItem
                    >
                      <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
                        <Typography color="secondary">Muddatli to'lov narxi</Typography>
                        <Typography color="secondary" variant="subtitle1">{formatPrice(total_price)} so'm</Typography>
                      </Stack>
                    </ListItem>
                  </List>
                </MainCard>
              </Grid>
            );
          })}
        </Grid>
      </> : <Alert color="warning" variant="border" sx={{ mt: 3 }} icon={<Warning2 variant="Bold" />}>
        <AlertTitle>Mahsulot narxini kiriting</AlertTitle>
      </Alert>}
  </>);
};
export default Calculator;