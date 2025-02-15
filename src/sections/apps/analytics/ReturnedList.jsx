import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { formatPrice } from '../../../utils/functions';
import { FormattedMessage } from 'react-intl';

const ReturnedList = ({ meta, products }) => {

  return (
    <>
      {products && products.map((customer, index) => {
        let rowId = 0;

        if (meta.current_page > 1) {
          const startRow = (meta?.current_page - 1) * 12;
          rowId = index + startRow + 1;
        } else {
          rowId = index + 1;
        }

        return (
          <TableRow key={index} hover>
            <TableCell align="center">
              {rowId}
            </TableCell>
            <TableCell align="center">
              {customer.credit_code}
            </TableCell>
            <TableCell align="center">
              {customer.full_name}
            </TableCell>
            <TableCell align="center">
              {customer.product_name}
            </TableCell>
            <TableCell align="center">
              {customer.cancel_count}
            </TableCell>
            <TableCell align="center">
              {`${formatPrice(customer.cancel_total_price)} `} <FormattedMessage id="currency" />
            </TableCell>
            <TableCell align="center">
              {`${customer.reason_name}: ${customer.cancel_comment}`}
            </TableCell>

          </TableRow>
        );
      })}
    </>
  );

};
export default ReturnedList;