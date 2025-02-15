import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
// project-imports
import CustomerLeftTab from './CustomerLeftTab';
import MainCard from 'components/MainCard';

import defaultImages from 'assets/images/users/default.png';


// ==============================|| USER PROFILE - TABS ||============================== //

export default function CustomerTabWrapper({ focusInput, setValue, value }) {
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(defaultImages);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <MainCard contentSX={{ px: 1.5 }}>
      <Grid sx={{ p: 0 }} container spacing={6}>
        <Grid item xs={12}>
          <CustomerLeftTab setValue={setValue} value={value} />
        </Grid>
      </Grid>
    </MainCard>
  );
}

CustomerTabWrapper.propTypes = { focusInput: PropTypes.func };
