import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '../../../components/@extended/IconButton';
import { Edit } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


const TodayCustomerList = ({ customers, meta }) => {
  const navigate = useNavigate();

  const navigateToEdit = (id) => {
    navigate(`/customer/edit/${id}`);
  };

  return (
    <>
      {customers && customers.map((customer, index) => {
        let rowId = 0;

        if (meta.current_page > 1) {
          const startRow = (meta?.current_page - 1) * 10;
          rowId = index + startRow + 1;
        } else {
          rowId = index + 1;
        }
        return (
          <TableRow key={customer.id} hover>
            <TableCell align="center">
              {rowId}
            </TableCell>
            <TableCell align="center">
              {customer.full_name}
            </TableCell>
            <TableCell align="center">
              {customer.phone}
            </TableCell>
            <TableCell align="center">
              {customer.status === 10 ?
                <Chip color="success" label={customer.status_name} size="small" variant="light" /> :
                <Chip color="info" label={customer.status_name} size="small" variant="light" />}
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToEdit(customer.id);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>


          </TableRow>
        );
      })}

    </>


  )

}
export default TodayCustomerList;