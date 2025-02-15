import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { LoadingButton } from '@mui/lab';
import { CustomProvider, DateRangePicker } from 'rsuite';
import * as locales from 'rsuite/locales';
import 'rsuite/DateRangePicker/styles/index.css';
import { Send2 } from 'iconsax-react';
import { useState } from 'react';
import axiosServices, { fetcher } from '../../../utils/axios';
import Snackbar from '../../../components/Snackbar';
import { generateFilterLink, setUpDate } from '../../../utils/functions';

const FileReport = () => {

  const [loading, setLoading] = useState({});
  const [dates, setDates] = useState({
    cancel: {
      start_date: '',
      end_date: ''
    },
    products: {
      start_date: '',
      end_date: ''
    },
    pdf: {
      start_date: '',
      end_date: ''
    }
  });

  const setStartEndDates = (date, key) => {
    if (date && date.length > 0) {
      const start_date = setUpDate(date[0]);
      const end_date = setUpDate(date[1]);
      setDates(prev => ({
        ...prev,
        [key]: {
          start_date,
          end_date
        }
      }));
    } else {
      setDates(prev => ({
        ...prev,
        [key]: {
          start_date: '',
          end_date: ''
        }
      }));
    }
  };

  const sendToGenerationCancel = async (key) => {
    setLoading(prevState => ({ ...prevState, cancel: true }));
    const queryLink = generateFilterLink(dates.cancel);
    try {
      const response = await axiosServices.get(`/api/reports/cancels-excel?${queryLink}`, {
        responseType: 'blob' // Important: To handle binary data
      });
      Snackbar('success', 'Muvaffaqiyatli yuklandi');
      generateDownloadLink(response, 'cancel');
    } catch (e) {
      Snackbar('error', 'Malumot olishda xatolik');
      console.log(e);
    } finally {
      setLoading(prevState => ({ ...prevState, cancel: false }));
    }
  };

  const sendToGenerationProducts = async () => {
    setLoading(prevState => ({ ...prevState, products: true }));
    const queryLink = generateFilterLink(dates.products);
    try {
      const response = await axiosServices.get(`/api/reports/products-excel?${queryLink}`, {
        responseType: 'blob' // Important: To handle binary data
      });
      Snackbar('success', 'Muvaffaqiyatli yuklandi');
      generateDownloadLink(response, 'orders');
    } catch (e) {
      Snackbar('error', 'Malumot olishda xatolik');
      console.log(e);
    } finally {
      setLoading(prevState => ({ ...prevState, products: false }));
    }
  };

  const sendRequestPdf = async () => {
    const queryLink = generateFilterLink(dates.pdf);

    try {
      const { data } = await axiosServices.get(`/api/reports/act?${queryLink}`, {
        responseType: 'blob' // Important: To handle binary data
      });
      Snackbar('success', 'Muvaffaqiyatli yuklandi');
      return data;
    } catch (e) {
      Snackbar('error', 'Malumot olishda xatolik');
      console.log(e);
    }
  };

  const downloadPdf = async (key) => {
    setLoading(prevState => ({ ...prevState, [key]: true }));

    await sendRequestPdf().then(response => {
        setLoading(prevState => ({ ...prevState, [key]: false }));
        if (response) {
          // Get the binary data as a Blob
          const pdfUrl = URL.createObjectURL(response);
          // Open the PDF in a new tab
          window.open(pdfUrl, '_blank');
          // Cleanup the URL after some time (optional)
          setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000); // Cleanup after 1 minute
        }
      },
      (err) => {
        setLoading(prevState => ({ ...prevState, [key]: false }));
        console.log(err);
      }
    );

  };


  const generateDownloadLink = (response, type) => {
    let filename = `report_${type}-${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

  };

  return (
    <TableContainer>
      {/*<Alert sx={{ mb: 2 }} color="success" variant="border" onClose={() => {*/}
      {/*}}>*/}
      {/*  <AlertTitle>Success Text</AlertTitle>*/}
      {/*  <Typography variant="h6"> This is an success alert.</Typography>*/}
      {/*</Alert>*/}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Fayl</TableCell>
            <TableCell align="center">Muddati</TableCell>
            <TableCell align="center">Yuklash</TableCell>
          </TableRow>

        </TableHead>
        <TableRow hover>
          <TableCell align="center">
            Mahsulotlar
          </TableCell>
          <TableCell align="center">
            <CustomProvider locale={locales['ruRU']}>
              <DateRangePicker
                showHeader={false}

                editable={false}
                showWeekNumbers={false} showMeridiem={false} block={false} isoWeek={false}
                placeholder="Muddat tanlang"
                onChange={(e) => setStartEndDates(e, 'products')}
                size="lg" />
            </CustomProvider>
          </TableCell>
          <TableCell align="center">
            <LoadingButton loading={loading?.products} onClick={() => sendToGenerationProducts()}
                           startIcon={<Send2 />}
                           color="info"
                           variant="contained">
              So'rov jo'natish
            </LoadingButton>
          </TableCell>

        </TableRow>
        <TableRow hover>
          <TableCell align="center">
            Qaytarilgan tovarlar
          </TableCell>
          <TableCell align="center">
            <CustomProvider locale={locales['ruRU']}>
              <DateRangePicker
                showHeader={false}

                editable={false}

                showWeekNumbers={false} showMeridiem={false} block={false} isoWeek={false}
                placeholder="Muddat tanlang"
                onChange={(e) => setStartEndDates(e, 'cancel')}
                size="lg" />
            </CustomProvider>
          </TableCell>
          <TableCell align="center">
            <LoadingButton loading={loading?.cancel} onClick={() => sendToGenerationCancel()} startIcon={<Send2 />}
                           color="info" variant="contained">
              So'rov jo'natish
            </LoadingButton>
          </TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell align="center">
            Solishtirma Dalolatnomasi
          </TableCell>
          <TableCell align="center">
            <CustomProvider locale={locales['ruRU']}>
              <DateRangePicker
                showHeader={false}

                editable={false}
                showWeekNumbers={false} showMeridiem={false} block={false} isoWeek={false}
                placeholder="Muddat tanlang"
                onChange={(e) => setStartEndDates(e, 'pdf')}
                size="lg" />
            </CustomProvider>
          </TableCell>
          <TableCell align="center">
            <LoadingButton loading={loading?.pdf} onClick={() => downloadPdf('pdf')} startIcon={<Send2 />}
                           color="info" variant="contained">
              So'rov jo'natish
            </LoadingButton>
          </TableCell>
        </TableRow>
        <TableBody>

        </TableBody>
      </Table>

    </TableContainer>
  );
};
export default FileReport;