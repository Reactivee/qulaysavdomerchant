import { Grid, Skeleton } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';

const MySkeletonTable = () => {
  return (
    <MainCard
      //   title={<Skeleton sx={{ width: { xs: 120, md: 180 } }} />}
      secondary={<Skeleton animation="wave" variant="circular" width={24} height={24} />}
    >
      <Grid container xl={12} spacing={5}>
        {Array.from(new Array(24)).map((item, index) => {
          return (
            <Grid key={index} item xs={4}>
              <Skeleton sx={{}} animation="wave" variant="rounded" />
            </Grid>
          );
        })}

      </Grid>
    </MainCard>
  );
};
export default MySkeletonTable;
