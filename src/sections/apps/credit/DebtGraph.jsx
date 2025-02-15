import MainCard from '../../../components/MainCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { formatPrice } from '../../../utils/functions';

const DebtGraph = ({ graph }) => {
  return (
    <MainCard
      title="To'lov jadvali"
    >

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {graph && graph.map((item, index) => {
            const percent = Math.floor((item.total_paid * 100) / item.monthly_payment);

            return (
              <>
                <Grid key={index} container sx={{ mb: 2 }} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">To'lov kuni: {item.payment_date}</Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                    <Typography variant="body2">Oylik to'lov: {formatPrice(item.monthly_payment)} so'm</Typography>
                    <Typography variant="body2" align="right">
                      Qoldiq: {formatPrice(item.graphic_debt)} so'm
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LinearProgress variant="determinate" value={percent}
                                    color={percent === 100 ? 'success' : 'primary'} />
                  </Grid>
                </Grid>

              </>
            );
          })}

        </Grid>
      </Grid>
    </MainCard>

  );
};
export default DebtGraph;