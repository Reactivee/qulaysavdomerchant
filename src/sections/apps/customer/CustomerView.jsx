import PropTypes from 'prop-types';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import Transitions from 'components/@extended/Transitions';

// assets
import {
  CloseCircle,
  DollarCircle, Send2, TickCircle
} from 'iconsax-react';

import Box from '@mui/material/Box';
import { ThemeMode } from '../../../config';

import Button from '@mui/material/Button';
import { formatPrice } from '../../../utils/functions';
import { useState } from 'react';
import { useClientContext } from '../../../contexts/ClientContext';
import AlertCustomerConfirmation from './AlertCustomerSkoring';

// ==============================|| CUSTOMER - VIEW ||============================== //

export default function CustomerView({ data }) {

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const { sendToScoring } = useClientContext();
  const { id } = data;
  const handleClose = () => {
    setOpen(false);
  };

  const detectLimitScoring = async () => {

    try {
      const res = await sendToScoring(id).then((data) => {
      });
    } catch (error) {
    }
  };

  return (
    <Transitions type="slide" direction="down" in={true}>
      <Grid container spacing={2.5} sx={{ xl: 12 }}>

        <Grid item xs={8}>
          <Stack spacing={2.5}>
            <MainCard title="Shaxsiy">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="h5" color="secondary">To'liq ismi</Typography>
                        <Typography variant="h5">{data.full_name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="h5" color="secondary">Telefon raqami</Typography>
                        <Typography variant="h5">
                          <PatternFormat displayType="text" format="+##### ### ## ##" mask="_"
                                         defaultValue={data.phone} />
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="h5" color="secondary">Passport seriya</Typography>
                        <Typography variant="h5">{data.passport_full_serial}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>

              </List>

            </MainCard>

          </Stack>
        </Grid>
        <Grid item xs={4}>
          <MainCard>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <MainCard
                  content={false}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 1),
                    color: 'common.white',
                    '&:after': {
                      content: '""',
                      background: `linear-gradient(245deg, transparent 25.46%, rgba(0, 0, 0, 0.2) 68.77%, rgba(0, 0, 0, 0.3) 81.72%)`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                      opacity: 0.6
                    }
                  }}
                >
                  <Box sx={{ p: 2, position: 'inherit', zIndex: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack>
                        <Typography variant="h5">Berilgan Limit</Typography>
                        <Typography variant="h5">{data.limit ? formatPrice(data?.limit) : '0'} som</Typography>
                      </Stack>
                      <Avatar
                        variant="rounded"
                        type="filled"
                        size="lg"
                        sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.100' : 'primary.darker' }}
                      >
                        <DollarCircle />
                      </Avatar>
                    </Stack>
                  </Box>
                </MainCard>
              </Grid>

              <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
                    item xs={12}>
                <Typography variant="h5" color="secondary">Skoringdan o'tgan
                </Typography>
                {data.is_checked ? <TickCircle color="#37d67a" /> : <CloseCircle
                  size="24"
                  color="#f47373"
                />}

              </Grid>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
                    item xs={12}>
                <Typography variant="h5" color="secondary">Identifikatsiyadan o'tgan
                </Typography>
                {data.is_identified == 1 ? <TickCircle color="#37d67a" /> : <CloseCircle
                  size="24"
                  color="#f47373"
                />}

              </Grid>
              <Grid item xs={12}>
                {data.is_scoring ? <Button onClick={() => setOpen(true)} fullWidth variant="shadow" color="success"
                                           sx={{ paddingY: '8px', fontSize: '16px' }}
                                           startIcon={<Send2 />}>
                  Skoringa jo'natish
                </Button> : <><Button disabled={true} fullWidth variant="dashed" color="success"
                                      sx={{ paddingY: '8px', fontSize: '16px' }}
                                      startIcon={<Send2 />}>
                  Skoringa jo'natish
                </Button>
                  <Typography variant="body2" sx={{ paddingY: 1, fontWeight: 600, textAlign: 'center' }}>Qayta skoring
                    uchun har
                    30 kunda so'rov
                    berish
                    mumkin</Typography>
                </>
                }

              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <AlertCustomerConfirmation title={'Skoring uchun so\'rov berishni tasdiqlaysizmi?'} open={open}
                                 handleClose={handleClose} id={id} confirmOperation={detectLimitScoring} />
    </Transitions>
  );
}

CustomerView.propTypes = { data: PropTypes.any };
