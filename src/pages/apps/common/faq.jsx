import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useGetFaq } from '../../../api/faq';
import Alert from '@mui/material/Alert';
import { Warning2 } from 'iconsax-react';
import AlertTitle from '@mui/material/AlertTitle';

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { FaRegQuestionCircle } from 'react-icons/fa';
import Stack from '@mui/material/Stack';

const Faq = () => {

  const { faq, empty, error, isLoading } = useGetFaq();
  const theme = useTheme();
  if (empty) {
    return (
      <Alert color="warning" variant="border" icon={<Warning2 variant="Bold" />}>
        <AlertTitle>Ma'lumotlar topilmadi</AlertTitle>
      </Alert>
    );
  }
  if (error) {
    return (
      <Alert color="error" variant="border" icon={<Warning2 variant="Bold" />}>
        <AlertTitle>Serverda xatolik</AlertTitle>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>FAQ</Typography>

        {Array.from(new Array(4)).map((item, index) => {
          return (
            <Grid key={index} item sx={{ mb: 2 }}>
              <Skeleton variant="wave" width="100%" height={20} />
            </Grid>
          );
        })}
      </>
    );

  }

  return (<>
    <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>Ko'p beriladigan savollar</Typography>
    <Grid container>
      <Grid item
            sx={{ width: '100%', marginX: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box
          sx={{
            '& .MuiAccordion-root': {
              borderColor: theme.palette.divider,
              '& .MuiAccordionSummary-root': {
                bgcolor: 'transparent',
                flexDirection: 'row'

              },
              '& .MuiAccordionDetails-root': {
                borderColor: theme.palette.divider

              },
              '& .Mui-expanded': {
                color: 'primary.main'


              }
            }
          }}
        >
          {faq && faq.map(item => {
            return (

              <Accordion  key={item.id}>
                <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
                  <Stack  direction="row" spacing={1.5} alignItems="center">
                    <FaRegQuestionCircle size={18} />
                    <Typography sx={{ fontSize: '20px'}} variant="h6">{item.question}</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: '20px'}}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

      </Grid>
    </Grid>
  </>);
};
export default Faq;