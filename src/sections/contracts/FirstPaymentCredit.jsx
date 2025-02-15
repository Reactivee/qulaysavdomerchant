import { useContractContext } from '../../contexts/ContractContext';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import ClientPaymentCard from '../../components/client/ClientPaymentCard';
import MainCard from '../../components/MainCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useClientContext } from '../../contexts/ClientContext';
import { useParams } from 'react-router';
import { useMemo, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { formatPrice } from '../../utils/functions';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const FirstPaymentCredit = ({ handleNext }) => {
  const { credit, payFirstPayment } = useContractContext();
  const {
    cards,
    getCardListClient
  } = useClientContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [cardId, setCardId] = useState(0);
  const navigation = useNavigate();

  const fetchCardListClient = async () => {
    setLoading(true);
    await getCardListClient(id);
    setLoading(false);
  };

  useMemo(() => {
    fetchCardListClient();
  }, [id]);

  const handleSelectCard = (card) => {
    if (card)
      setCardId(card.target.value);
  };

  const makeFirstPayment = async () => {
    const { id: creditId, first_payment } = credit;
    const paymentDetail = {
      'summa': first_payment,
      'card_id': cardId
    };
    setSubmit(true);
    await payFirstPayment({ creditId, cardId, paymentDetail }).then((result) => {
        setSubmit(false);
        if (result && result.status) {
          handleNext();
          // navigate(`/customer/orders/${id}`);
        }

      },
      (error) => {
        setSubmit(false);
        console.log('error', error);
      }
    );
  };

  const backToUserForm = () => {
    navigation(`/customer/orders/${id}`);
  };

  return (<>

    <Grid container spacing={3}>
      <Grid item xs={4}>
        {credit ? <MainCard title="Shartnoma ma'lumotlari" contentSX={{ p: 1 }}>
          <List sx={{ py: 0 }}>
            <ListItem divider>
              <Stack spacing={0.5}>
                <Typography color="secondary">Muddati</Typography>
                <Typography>{credit.tariff_duration} oy</Typography>
              </Stack>

            </ListItem>

            <ListItem divider>
              <Stack spacing={0.5}>
                <Typography color="secondary">Boshlang'ich to'lov</Typography>
                <Typography>
                  <Chip label={`${formatPrice(credit.first_payment)} so'm`} size="small" color="success" />
                </Typography>
              </Stack>
            </ListItem>
            <ListItem divider>
              <Stack spacing={0.5}>
                <Typography color="secondary">Boshlang'ich to'lov uchun qo'shimcha summa</Typography>
                <Typography>
                  <Chip label={`${formatPrice(credit.need_payed_price)} so'm`} size="small" color="info" />
                </Typography>
              </Stack>
            </ListItem>

            <ListItem divider>
              <Stack spacing={0.5}>
                <Typography color="secondary">Oylik to'lov</Typography>
                <Typography>
                  {formatPrice(credit.monthly_payment)} so'm
                </Typography>
              </Stack>
            </ListItem>

            <ListItem>
              <Stack spacing={0.5}>
                <Typography color="secondary">Shartnoma qiymati</Typography>
                <Typography>
                  {formatPrice(credit.total_price)} so'm
                </Typography>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack spacing={0.5}>
                <Typography color="secondary">Status</Typography>
                <Typography>
                  <Chip label={credit.status_name} size="small" color="info" />
                </Typography>
              </Stack>
            </ListItem>
          </List>
        </MainCard> : ''}
      </Grid>
      <Grid item xs={8}>
        <MainCard title={'Boshlang\'ich to\'lov uchun mijoz kartasini tanlang'}>

          {loading ? <Skeleton variant="rectangular" width="100%" height={60} /> :
            <RadioGroup row aria-label="payment-card" name="payment-card" value={cardId} onChange={handleSelectCard}>
              <Grid item xs={12} container spacing={2.5}>
                {cards && cards.map((card, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ClientPaymentCard card={card} />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>}

          <Grid item xs={12}>
            <Stack direction="row" sx={{ mt: 2 }} justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button onClick={() => backToUserForm()}>Orqaga</Button>
              {cardId ? <LoadingButton loading={submit} onClick={() => makeFirstPayment()} variant="contained"
                                       sx={{ textTransform: 'none' }}>Keyingisi
              </LoadingButton> : <Button disabled={true} variant="contained"
                                                 sx={{ textTransform: 'none' }}>Keyingisi</Button>}

            </Stack>
          </Grid>
        </MainCard>

      </Grid>


    </Grid>


  </>);
};
export default FirstPaymentCredit;