import React, { memo } from 'react';
import MainCard from '../MainCard';
import { Grid, Skeleton } from '@mui/material';

const PrivateFormSkeleton = () => {
  return (<div>
    <MainCard title={<Skeleton sx={{}} animation="wave" width="400px" variant="rounded" />}>
      <Grid container xl={12} spacing={5}>
        {Array.from(new Array(12)).map((item, index) => {
          return (
            <Grid key={index} item xs={6}>
              <Skeleton sx={{}} animation="wave" height={40} variant="rounded" />
            </Grid>
          );
        })}


      </Grid>
    </MainCard>


  </div>);
};
export default PrivateFormSkeleton;