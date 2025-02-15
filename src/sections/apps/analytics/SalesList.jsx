import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { formatPrice } from '../../../utils/functions';
import { FormattedMessage } from 'react-intl';

const SalesList = ({ meta, products }) => {

  return (
    <>
      {products && products.map((customer, index) => {
        let rowId = 0;

        if (meta.current_page > 1) {
          const startRow = (meta?.current_page - 1) * 10;
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
              {customer.client_full_name}
            </TableCell>
            <TableCell align="center">
              {customer.product_name}
            </TableCell>
            <TableCell align="center">
              {customer.count}
            </TableCell>
            <TableCell align="center">
              {`${formatPrice(customer.credit_price)} `} <FormattedMessage id="currency" />

            </TableCell>
          </TableRow>
        );
      })}

    </>


  );

};
export default SalesList;