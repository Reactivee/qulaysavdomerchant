import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import MainCard from '../../../components/MainCard';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useOrdersContext } from '../../../contexts/OrdersContext';
import { useParams } from 'react-router';
import Alert from '@mui/material/Alert';
import { MinusCirlce, Warning2 } from 'iconsax-react';
import Typography from '@mui/material/Typography';
import CircularWithPath from '../../../components/@extended/progress/CircularWithPath';
import { formatPrice } from '../../../utils/functions';
import { openSnackbar } from '../../../api/snackbar';
import { LoadingButton } from '@mui/lab';
import { PatternFormat } from 'react-number-format';
import IconButton from '@mui/material/IconButton';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';
import ConfirmReturnDialog from '../../../sections/apps/return/ConfirmReturnDialog';

// table header
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nomi'
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: 'soni'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Narxi'
  }
];


const Reject = () => {
  const [selected, setSelected] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [confirmData, setConfirmData] = useState({ 'token': '', 'code': '', 'id': null });
  const [reason, setReason] = useState([]);
  const [resend, setResend] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [rejectData, setRejectData] = useState({
    'reason_id': '',
    'cancel_comment': '',
    'type': 2,
    'products': [
      {
        'credit_product_id': 0,
        'count': 1
      }
    ]
  });

  const {
    error,
    isLoading,
    customer_order,
    getInstallmentOrderSingleCustomer,
    getReturnReason,
    postReturnProducts,
    confirmReturnProducts,
    reSendConfirmReturnProducts
  } = useOrdersContext();

  const { products } = customer_order;

  useEffect(() => {
    getInstallmentOrderSingleCustomer(id);
    getCreditReturn();
  }, [id]);

  useEffect(() => {
    collectProductsId(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    validationFields();
  }, [rejectData]);


  const getCreditReturn = async () => {
    await getReturnReason().then(result => {
        const { data } = result;
        setReason(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };


  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    const selectedRowData = products.filter((row) => newSelected.includes(row.id));
    setSelectedValue(selectedRowData);
    setSelected(newSelected);

  };
  const collectProductsId = (productsId) => {
    let type = 2;
    const newData = productsId.map(product => {
      return {
        'credit_product_id': product.id,
        'count': product.count
      };
    });
    if (productsId.length === products?.length) {
      type = 1;
    }
    setRejectData(prevState => {
      return { ...prevState, products: newData, type };
    });

  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = products.map((n) => n.id);
      const selectedRowData = products.filter((row) => newSelectedId.includes(row.id));
      setSelected(newSelectedId);
      setSelectedValue(selectedRowData);
      return;
    }
    collectProductsId([]);
    setSelected([]);
  };

  const handleCancelComment = (text) => {
    setRejectData(prevState => {
      return { ...prevState, cancel_comment: String(text) };
    });

  };
  const handleRejectReason = (id) => {
    setRejectData(prevState => {
      return { ...prevState, reason_id: Number(id) };
    });
  };

  const validationFields = () => {
    const empty = Object.values(rejectData).some(item => {
      return (
        item === '' || item === null || item === undefined || (typeof value === 'number' && isNaN(value)) ||
        (Array.isArray(item) && item.length === 0) ||
        (typeof item === 'object' && Object.keys(item).length === 0)
      );
    });
    setIsEmpty(empty);
  };

  const onDecrement = (id) => {
    const { products: rejectedProducts } = rejectData;
    const newVal = rejectedProducts.map(item => {
      if (item.credit_product_id === id && item.count > 1) {
        item.count = item.count - 1;
      }
      return item;
    });
    setRejectData(prevState => {
      return { ...prevState, products: newVal };
    });

  };
  const onIncrement = (id, event) => {
    const realCount = products.find((item) => item.id === id);
    const { products: rejectedProducts } = rejectData;
    const newVal = rejectedProducts.map(item => {
      if (item.credit_product_id === id && realCount.count > item.count) {
        item.count = item.count + 1;
      }
      return item;
    });
    setRejectData(prevState => {
      return { ...prevState, products: newVal };
    });
  };

  const handleConfirmReturnProduct = async (code) => {
    await confirmReturnProducts({ id, confirmData }).then((result) => {
        navigate(`/orders/${id}`);
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: result?.message || 'Rasmiylashtirildi',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
      },
      (error) => {
        if (error.errors.attribute === 'time') {
          setResend(true);
        }
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: error?.message || 'Xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
      });
  };

  const handleProductsForReturn = async () => {
    setIsSending(true);
    await postReturnProducts({ id, rejectData }).then(result => {
        const { data } = result;
        setConfirmData(prevState => {
          return { ...prevState, token: data?.data?.sms?.token, code: '', id: data?.data?.cancel?.id };
        });
        setOpenOtp(true);
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: 'Mijoz raqamiga tasdiqlash sms kod yuborildi',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
      },
      (error) => {

        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: error?.message || 'Xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
      }
    );
    setIsSending(false);
  };

  const handleReSendConfirmReturnProduct = async (code) => {
    await reSendConfirmReturnProducts(confirmData.token).then((result) => {
        const { data } = result;
        setResend(false);
        setConfirmData(prevState => {
          return { ...prevState, token: data?.data?.token, code: '' };
        });
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: 'Mijoz raqamiga tasdiqlash sms kod yuborildi',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
      },
      (error) => {
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: error?.message || 'Xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
      });
  };

  if (error)
    return (
      <Alert color="error" variant="filled" icon={<Warning2 size={20} variant="Bold" />}>
        <Typography variant="h6"> Ma'lumot olishda xatolik</Typography>
      </Alert>
    );

  if (isLoading) {
    return (<Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="center">
        <CircularWithPath />
      </Stack>
    </Box>);
  }

  return <>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard contentSX={{ p: 1 }} title="Qaytarish tovarini tanlang" content={false}>
          <TableContainer>
            <Table aria-labelledby="tableTitle" size="medium">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ pl: 3 }}>

                    {/*<Checkbox*/}
                    {/*  color="primary"*/}
                    {/*  // indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                    {/*  // checked={rowCount > 0 && numSelected === rowCount}*/}
                    {/*  onChange={handleSelectAllClick}*/}
                    {/*  inputProps={{*/}
                    {/*    'aria-label': 'select all desserts'*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </TableCell>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align="center"
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {products && products.map((row, index) => {

                  // if (typeof row === 'number') return null;
                  const isItemSelected = isSelected(row.id);
                  const labelId = `table-checkbox-${index}`;
                  const { products: rejectedId } = rejectData;
                  const selectedItem = rejectedId.find((product) => product.credit_product_id === row.id);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell sx={{ pl: 3 }} padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                        {row.product_name}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                          <Button onClick={(event) => onDecrement(row.id)} disabled={!isItemSelected}>
                            <BiMinusCircle />
                          </Button>
                          <Typography> {selectedItem?.count}</Typography>

                          <Button onClick={(event) => onIncrement(row.id)} disabled={!isItemSelected}>
                            <BiPlusCircle />
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{formatPrice(row.price)} so'm</TableCell>
                    </TableRow>
                  );
                })}
                {/*{emptyRows > 0 && (*/}
                {/*  <TableRow sx={{ height: (dense ? 33 : 53) * emptyRows }}>*/}
                {/*    <TableCell colSpan={6} />*/}
                {/*  </TableRow>*/}
                {/*)}*/}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
      <Grid item xs={6}>
        <MainCard title="Qaytarish sababi">
          <FormControl component="fieldset">
            <RadioGroup aria-label="size" name="radio-buttons-group"
                        value={rejectData.reason_id}
                        onChange={(e) => handleRejectReason(e.target.value)}>
              {reason && reason.map((row) => {
                return <FormControlLabel key={row.id} value={row.id} control={<Radio />} label={row.name} />;
              })}
            </RadioGroup>
          </FormControl>
          {/*{rejectData.reason_id === 0 ?*/}
          {/*  <TextField fullWidth={true} id="helper-text-basic" /> : ''}*/}
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard contentSX={{ px: 2 }} title="Kommentariya">
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={5}
            value={rejectData.cancel_comment}
            onChange={(e) => handleCancelComment(e.target.value)}
          />
        </MainCard>
        <Stack direction="row" sx={{ mt: 2 }} justifyContent="end">
          <LoadingButton loading={isSending} onClick={() => handleProductsForReturn()} disabled={isEmpty}
                         variant="contained">Rasmiylashtirish</LoadingButton>
        </Stack>
      </Grid>
    </Grid>
    {openOtp ? <ConfirmReturnDialog openOtp={openOtp} setOpenOtp={setOpenOtp}
                                    handleConfirmReturnProduct={handleConfirmReturnProduct}
                                    handleReSendConfirmReturnProduct={handleReSendConfirmReturnProduct}
                                    resend={resend}
                                    confirmData={confirmData} setConfirmData={setConfirmData} /> : ''}

  </>;
};
export default Reject;