import DialogTitle from '@mui/material/DialogTitle';
import { PatternFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';

import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const ConfirmReturnDialog = ({
                               openOtp,
                               setOpenOtp,
                               confirmData,
                               setConfirmData,
                               handleReSendConfirmReturnProduct,
                               handleConfirmReturnProduct,
                               resend
                             }) => {
  const [isSending, setIsSending] = useState(false);

  const sendToConfirm = async () => {
    setIsSending(true);
    await handleConfirmReturnProduct();
    setIsSending(false);
  };

  const sendToReset = async () => {
    setIsSending(true);
    await handleReSendConfirmReturnProduct();
    setIsSending(false);
  };


  return (
    <Dialog open={openOtp} onClose={() => setOpenOtp(false)}>

      <Stack sx={{ px: 2, py: 4, width: '350px' }}>
        <DialogTitle sx={{ mb: 1, p: 0 }}>SMS orqali tasdiqlash</DialogTitle>
        <PatternFormat
          sx={{ mb: 2 }}
          type="text"
          name={'code'}
          required={true}
          value={confirmData.code}
          onChange={(e) => setConfirmData(prevState => {
            return { ...prevState, code: e.target.value };
          })}
          placeholder="Tasdiqlash kodini kiriting"
          format="######"
          mask=""
          customInput={TextField}
        />

        <Stack spacing={2}>
          {resend ? <LoadingButton loading={isSending} color="error" onClick={() => sendToReset()}>
            Qayta jo'natish
          </LoadingButton> : ''}

          <LoadingButton loading={isSending} onClick={() => sendToConfirm()} variant="contained">
            Tasdiqlash
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>

  );
};
export default ConfirmReturnDialog;