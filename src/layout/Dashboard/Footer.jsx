
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">&copy; "MOBILE HP" MCHJ</Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Link  href="https://api.mobilnasiya.uz/api/docs/offer" target="_blank" variant="caption" color="text.primary">
          Oferta
        </Link>
        <Link

          href="https://api.mobilnasiya.uz/api/docs/licence"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Guvohnoma
        </Link>
        <Link  href="https://api.mobilnasiya.uz/api/docs/rule" target="_blank" variant="caption" color="text.primary">
          Ustav
        </Link>
      </Stack>
    </Stack>
  );
}
