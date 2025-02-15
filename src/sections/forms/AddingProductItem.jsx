import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// third-party
import { getIn } from 'formik';


import { ThemeMode } from 'config';
import { openSnackbar } from 'api/snackbar';

// assets
import { Trash } from 'iconsax-react';
import AlertProductDelete from '../apps/invoice/AlertProductDelete';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { formatPrice } from '../../utils/functions';
import { clearCardNumber } from '../../utils/clearPhone';

// ==============================|| INVOICE - ITEMS ||============================== //

export default function AddingProductItem({
                                            id,
                                            item,
                                            onDeleteItem,
                                            onEditItem,
                                            index,
                                            errors,
                                            touched,
                                            setFieldValue
                                          }) {
  const {
    product_name,
    count,
    price,
    is_imei,
    imei_2,
    imei_1,
  } = item;

  const theme = useTheme();
  const mode = theme.palette.mode;

  const [open, setOpen] = useState(false);
  const handleModalClose = (status) => {
    setOpen(false);
    if (status) {
      onDeleteItem(index);
      openSnackbar({
        open: true,
        message: 'Product Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  };

  const Name = `products[${index}].product_name`;
  const Count = `products[${index}].count`;
  const Price = `products[${index}].price`;
  const imei1 = `products[${index}].imei_1`;
  const touchedName = getIn(touched, Name);
  const touchedCount = getIn(touched, Count);
  const touchedPrice = getIn(touched, Price);
  const touchedImei_1 = getIn(touched, imei1);
  const errorName = getIn(errors, Name);
  const errorImei_1 = getIn(errors, imei1);
  const errorCount = getIn(errors, Count);
  const errorPrice = getIn(errors, Price);

  const textFieldItem = [

    {
      placeholder: 'Mahsulot nomi kiriting',
      label: 'Mahsulot nomi',
      name: `products.${index}.product_name`,
      type: 'text',
      id: id + '_description',
      value: name,
      errors: errorName,
      touched: touchedName
    },
    {
      placeholder: '0',
      label: 'Soni',
      type: 'number',
      name: `products.${index}.count`,
      id: id + 'count',
      errors: errorCount,
      touched: touchedCount,
      value: count
    },
    {
      placeholder: '0',
      label: 'Narx',
      type: 'number',
      name: `products.${index}.price`,
      id: id + '_price',
      value: price,
      errors: errorPrice,
      touched: touchedPrice
    }
  ];

  return (
    <>

      <Grid item xs={3}>
        <InputLabel>Nomi*</InputLabel>
        <TextField
          type="text"
          placeholder="Mahsulot nomi kiriting"
          sx={{ mt: 1 }}
          fullWidth={true}
          // label="Mahsulot nomi"
          name={`products.${index}.product_name`}
          //       id= id + '_description',
          value={product_name}
          error={errorName}
          touched={touchedName}
          onChange={onEditItem}
        />

        {/*{item.type == 'number' ? (*/}
        {/*  <PatternFormat*/}
        {/*    sx={{ mt: 1 }}*/}
        {/*    placeholder={item.placeholder}*/}
        {/*    type="text"*/}
        {/*    name={item.name}*/}
        {/*    id={item.id}*/}
        {/*    value={item.type === 'number' ? (item.value > 0 ? item.value : '') : item.value}*/}
        {/*    // value={formik.values.card_number}*/}
        {/*    // onChange={formik.handleChange}*/}
        {/*    // error={formik.touched.card_number && Boolean(formik.errors.card_number)}*/}
        {/*    // helperText={formik.touched.card_number && formik.errors.card_number}*/}
        {/*    onChange={onEditItem}*/}
        {/*    error={Boolean(item.errors && item.touched)}*/}
        {/*    inputProps={{*/}
        {/*      ...(item.type === 'number' && { min: 0 })*/}
        {/*    }}*/}
        {/*    format="#########"*/}
        {/*    mask=""*/}
        {/*    customInput={TextField}*/}
        {/*  />*/}
        {/*) : }*/}

        {/*<InvoiceField*/}
        {/*  onEditItem={(event) => onEditItem(event)}*/}
        {/*  onBlur={(event) => Blur(event)}*/}
        {/*  cellData={{*/}
        {/*    placeholder: item.placeholder,*/}
        {/*    name: item.name,*/}
        {/*    type: item.type,*/}
        {/*    id: item.id,*/}
        {/*    value: item.value,*/}
        {/*    errors: item.errors,*/}
        {/*    touched: item.touched*/}
        {/*  }}*/}
        {/*  key={index}*/}
        {/*/>*/}
      </Grid>
      {is_imei && is_imei === 1 ? <>
        <Grid item xs={3}>
          <InputLabel>IMEI 1*</InputLabel>
          <PatternFormat
            sx={{ mt: 1 }}
            placeholder={'0'}
            fullWidth={true}
            name={`products.${index}.imei_1`}
            // id={item.id}
            value={imei_1}
            required={true}
            min={12}
            // value={formik.values.card_number}
            // onChange={formik.handleChange}
            // error={is_imei}
            // helperText={formik.touched.card_number && formik.errors.card_number}
            onChange={onEditItem}
            // error={true}
            format="##################"
            mask=""
            customInput={TextField}
          />
        </Grid>
        <Grid item xs={3}>
          <InputLabel>IMEI 2</InputLabel>
          <PatternFormat
            sx={{ mt: 1 }}
            placeholder={'0'}
            fullWidth={true}
            name={`products.${index}.imei_2`}
            // id={item.id}
            value={imei_2}
            min={12}
            // value={formik.values.card_number}
            // onChange={formik.handleChange}
            // error={formik.touched.card_number && Boolean(formik.errors.card_number)}
            // helperText={formik.touched.card_number && formik.errors.card_number}
            onChange={onEditItem}
            format="##################"
            mask=""
            customInput={TextField}
          />
        </Grid>
      </> : ''}


      <Grid item xs={3}>
        <InputLabel>Soni*</InputLabel>
        <PatternFormat
          sx={{ mt: 1 }}
          placeholder={'0'}
          fullWidth={true}
          name={`products.${index}.count`}
          // id={item.id}
          value={count}
          onChange={onEditItem}
          error={Boolean(errorCount && touchedCount)}
          format="#########"
          mask=""
          customInput={TextField}
        />
      </Grid>
      <Grid item xs={3}>
        <InputLabel>Narxi*</InputLabel>
        <NumericFormat
          sx={{ mt: 1 }}
          allowLeadingZeros
          thousandSeparator=" "
          placeholder={'0'}
          fullWidth={true}
          name={`products.${index}.price`}
          // id={item.id}
          value={price}
          // value={formik.values.card_number}
          // onChange={formik.handleChange}
          // error={formik.touched.card_number && Boolean(formik.errors.card_number)}
          // helperText={formik.touched.card_number && formik.errors.card_number}
          onChange={(e) => {
            const newPrice = clearCardNumber(e.target.value);
            setFieldValue(`products.${index}.price`, newPrice);
          }}
          error={Boolean(errorPrice && touchedPrice)}
          format="#########"
          mask=""
          customInput={TextField}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row">
          <Typography variant="h4">Jami: {price && count ? formatPrice(count * price) : 0} so'm</Typography>
        </Stack>
      </Grid>


      <Grid item xs={12}>
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                opacity: 0.9
              }
            }
          }}
          title="Mahsulot o'chirish"
        >
          {index > 0 ? <Button variant="contained" color="error" onClick={() => setOpen(true)}>
            <Trash sx={{ marginRight: 2 }} />
            <Typography sx={{ ml: 1 }}>O'chirish</Typography>
          </Button> : ''}

        </Tooltip>
      </Grid>

      {index > 0 ? <AlertProductDelete title={name} open={open} handleClose={handleModalClose} /> : ''}

    </>
  );
}

AddingProductItem.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  description: PropTypes.any,
  qty: PropTypes.any,
  price: PropTypes.any,
  onDeleteItem: PropTypes.any,
  onEditItem: PropTypes.any,
  index: PropTypes.any,
  Blur: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any
};
