import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// ============================|| STATISTICS - ROUND ICON CARD ||============================ //

export default function RoundIconCard({ primary, secondary, content, iconPrimary, color, bgcolor }) {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary /> : null;

  return (
    <MainCard>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item>
          <Avatar variant="rounded" sx={{ bgcolor, color }} size="lg">
            {primaryIcon}
          </Avatar>
        </Grid>
        <Grid item>
          <Stack spacing={1}>
            <Typography variant="h6" color="secondary">
              {primary}
            </Typography>
            {/*<Typography variant="h4">{secondary}</Typography>*/}
            <Typography variant="h6" color="secondary">
              {content}
            </Typography>
          </Stack>
        </Grid>

      </Grid>
    </MainCard>
  );
}

RoundIconCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  content: PropTypes.string,
  iconPrimary: PropTypes.any,
  color: PropTypes.string,
  bgcolor: PropTypes.string
};
