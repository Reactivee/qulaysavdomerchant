import Typography from '@mui/material/Typography';
import MainCard from '../../../components/MainCard';
import QRCode from 'react-qr-code';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import play from '../../../assets/images/icons/play.png';
import apple from '../../../assets/images/icons/apple.png';
import { useGetLinks } from '../../../api/links';
import Link from '@mui/material/Link';
import CardSkeleton from '../../../components/skeletons/CardSkeleton';
import React from 'react';
import Alert from '@mui/material/Alert';
import { Warning2 } from 'iconsax-react';
import AlertTitle from '@mui/material/AlertTitle';

const QR = () => {
  const { links, isLoading, error } = useGetLinks();
  if (isLoading) {
    return (
      <Grid container xs={12} sx={{ mt: 2 }} spacing={3}>
        {Array.from(new Array(12)).map((item, index) => {
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
      <Alert color="error" variant="border" icon={<Warning2 variant="Bold" />}>
        <AlertTitle>Serverda xatolik</AlertTitle>
      </Alert>
    );
  }

  return (<>
    <Typography variant="h2" sx={{ mb: 3, mt: 2 }}><FormattedMessage id="Mobil Nasiya ilovasiga havola" /></Typography>
    <MainCard contentSX={{ px: 4 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '250px ', width: '100%', marginBottom: '20px' }}
            value={links?.google_play?.link}
            viewBox={`0 0 256 256`}
          />
          <Link href={links?.google_play?.link} target="_blank">
            <img width={'200px'} src={play} alt="play" />
          </Link>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '250px ', width: '100%', marginBottom: '20px' }}
            value={links?.app_store?.link}
            viewBox={`0 0 256 256`}
          />
          <Link href={links?.app_store?.link} target="_blank">
            <img width={'200px'} src={apple} alt="play" />
          </Link>
        </Grid>
      </Grid>

    </MainCard>
  </>);
};
export default QR;