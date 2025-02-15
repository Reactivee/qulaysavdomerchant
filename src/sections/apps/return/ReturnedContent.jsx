import MainCard from '../../../components/MainCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const ReturnedContent = ({ cancel }) => {

  return (<>
    <MainCard title="Qaytarish haqida ma'lumot">
      <List sx={{ py: 0 }}>
        <ListItem divider>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>

              <Typography color="secondary">Status</Typography>
              <Chip variant="light" sx={{ mt: 0.3 }} label={cancel.status_name} color="success" />
              {/*<Typography>{}</Typography>*/}

            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Qaytarish sababi</Typography>
                <Typography>{cancel.reason.name}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Sharh</Typography>
                <Typography>{cancel.comment}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
      </List>

    </MainCard>

  </>);
};
export default ReturnedContent;