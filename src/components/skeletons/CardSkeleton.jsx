import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const CardSkeleton = () => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width='100%' height={60} />
      <Skeleton variant="rounded" width='100%' height={60} />
    </Stack>
  );
};
export default CardSkeleton;