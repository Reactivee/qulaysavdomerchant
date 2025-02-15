import PropTypes from 'prop-types';
// material-ui
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import { DropzopType } from 'config';

import UploadCover from 'assets/images/upload/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }) {
  return (
    <>
      {type !== DropzopType.STANDARD && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Fayl yuklash uchun joy</Typography>
            <Typography color="secondary">
              Fayl yuklang&nbsp;yoki kompyuterdan tanlang ( JPG, PNG, JFIF (JPEG), HEIC)
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}

PlaceholderContent.propTypes = { type: PropTypes.any };
