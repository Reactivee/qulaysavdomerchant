import Stack from '@mui/material/Stack';
import CircularWithPath from '../@extended/progress/CircularWithPath';
import Box from '@mui/material/Box';

const Loading = () => {
  return <Box sx={{ p: 5 }}>
    <Stack direction="row" justifyContent="center">
      <CircularWithPath />
    </Stack>
  </Box>;
};
export default Loading;