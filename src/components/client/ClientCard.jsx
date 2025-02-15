import ClientCardForm from '../../sections/forms/client/ClientCardForm';
import { Alert } from '@mui/material';
import { Card, Warning2 } from 'iconsax-react';
import AlertTitle from '@mui/material/AlertTitle';
import MainCard from '../MainCard';
import { useMemo } from 'react';
import { useClientContext } from '../../contexts/ClientContext';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import HoverSocialCard from '../cards/customerCard/HoverSocialCard';
import { hideCardNumber } from '../../utils/functions';

const ClientCard = () => {
  const {
    cards,
    getCardListClient
  } = useClientContext();
  const { id } = useParams();


  useMemo(() => {
    getCardListClient(id);
  }, [id]);

  return (<>
    <Alert sx={{ marginBottom: 2 }} color="warning" variant="border" icon={<Warning2 variant="Bold" />}>
      <AlertTitle>Asosiy kartadagi ism mijoz bilan bir xil bo'lishi kerak</AlertTitle>
    </Alert>
    <Grid container spacing={1}>
      {cards &&
        cards.map((item, index) => {
          return (
            <Grid key={index} item sx={{ mb: 2 }} xs={12} md={6} lg={4} sm={6}>
              <HoverSocialCard key={item.id} primary={hideCardNumber(item?.card_number)} secondary={item?.type}
                               iconPrimary={Card}
                               color={'#7BC7C3'} />
            </Grid>
          );
        })}
    </Grid>
    <MainCard title="Karta raqam biriktirish">
      <ClientCardForm />
    </MainCard>
  </>);
};
export default ClientCard;