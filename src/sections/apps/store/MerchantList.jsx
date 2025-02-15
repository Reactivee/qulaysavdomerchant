import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '../../../components/@extended/IconButton';
import { Edit } from 'iconsax-react';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';


const MerchantList = ({ data, pagination }) => {
  const navigate = useNavigate();

  const navigateToEdit = (id) => {
    navigate(`/store/merchant/edit/${id}`);
  };
  const { current_page } = pagination;

  return (
    <>
      {
        data.map((item, index) => {
            let rowId = 0;
            const { id, full_name, phone, status_name, username, email, status } = item;

            if (current_page > 1) {
              const startRow = (current_page - 1) * 10;
              rowId = index + startRow + 1;
            } else {
              rowId = index + 1;
            }

            return (
              <TableRow hover>

                <TableCell align="center">
                  {rowId}
                </TableCell>
                <TableCell align="center">
                  {full_name}
                </TableCell>
                <TableCell align="center">
                  {username}
                </TableCell>
                <TableCell align="center">
                  <PatternFormat displayType="text" format="+##### ### ## ##" mask="_"
                                 defaultValue={phone} />

                </TableCell>
                <TableCell align="center">
                  {status === 10 ? <Chip color="success" label={status_name} size="small" variant="light" />
                    : <Chip color="error" label={status_name} size="small" variant="light" />}

                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToEdit(id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>

              </TableRow>
            );
          }
        )
      }
    </>
  );
};
export default MerchantList;