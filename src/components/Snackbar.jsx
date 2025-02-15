import { enqueueSnackbar } from 'notistack';

const Snackbar = (key, message) => {

  return (
    enqueueSnackbar(message ? String(message) : 'Empty', {
      variant: key ? String(key) : 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    })
  );
};
export default Snackbar;