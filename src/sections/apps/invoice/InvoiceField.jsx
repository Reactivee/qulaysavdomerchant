import PropTypes from 'prop-types';
// material-ui
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { PatternFormat } from 'react-number-format';

// ==============================|| INVOICE - TEXT FIELD ||============================== //

export default function InvoiceField({ onEditItem, cellData }) {
  return (
    <>
      {cellData.type === 'number' ? <PatternFormat
          sx={{ mt: 1 }}
          placeholder={cellData.placeholder}
          type="text"
          name={cellData.name}
          id={cellData.id}
          value={cellData.type === 'number' ? (cellData.value > 0 ? cellData.value : '') : cellData.value}
          // value={formik.values.card_number}
          // onChange={formik.handleChange}
          // error={formik.touched.card_number && Boolean(formik.errors.card_number)}
          // helperText={formik.touched.card_number && formik.errors.card_number}
          onChange={onEditItem}
          label={cellData.label}
          error={Boolean(cellData.errors && cellData.touched)}
          inputProps={{
            ...(cellData.type === 'number' && { min: 0 })
          }}
          format="#########"
          mask=""
          customInput={TextField}
        /> :

        <TextField
          type={cellData.type}
          sx={{ mt: 1 }}
          // sx={{ width: '100%' }}
          fullWidth
          placeholder={cellData.placeholder}
          name={cellData.name}
          id={cellData.id}
          value={cellData.type === 'number' ? (cellData.value > 0 ? cellData.value : '') : cellData.value}
          onChange={onEditItem}
          label={cellData.label}
          error={Boolean(cellData.errors && cellData.touched)}
          inputProps={{
            ...(cellData.type === 'number' && { min: 0 })
          }}
        />}


    </>
  );
}

InvoiceField.propTypes = { onEditItem: PropTypes.any, cellData: PropTypes.any };
