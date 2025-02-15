import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '../../../components/@extended/IconButton';
import { Edit } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';


const TodayOrdersList = ({ orders, meta }) => {
  const navigate = useNavigate();

  const navigateToEdit = (id) => {
    navigate(`/orders/${id}`);
  };

  const orderStatus = (order) => {
    switch (order.status) {
      case -1:
        return <Chip color="error" label={order.status_name} size="small" variant="light" />;
      case 2:
        return <Chip color="warning" label={order.status_name} size="small" variant="light" />;
      case 4:
        return <Chip color="success" label={order.status_name} size="small" variant="light" />;
      case -2:
        return <Chip color="error" label={order.status_name} size="small" variant="light" />;
      default:
        return <Chip color="info" label={order.status_name} size="small" variant="light" />;
    }
  };

  return (
    <>
      {orders && orders.map((order, index) => {
        let rowId = 0;
        if (meta.current_page > 1) {
          const startRow = (meta?.current_page - 1) * 10;
          rowId = index + startRow + 1;
        } else {
          rowId = index + 1;
        }
        return (
          <TableRow key={order.id} hover>
            <TableCell align="center">
              {rowId}
            </TableCell>
            <TableCell align="center">
              {order.full_name}
            </TableCell>
            <TableCell align="center">
              {order.phone}
            </TableCell>
            <TableCell align="center">
              {orderStatus(order)}
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToEdit(order.id);
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

  );
};
export default TodayOrdersList;