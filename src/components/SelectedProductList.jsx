import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Chip from '@mui/material/Chip';
import MainCard from './MainCard';
import { EmptyTable } from './third-party/react-table';

// table data
const createData = (badgeText, badgeType, subject, dept, date) => ({
  badgeText,
  badgeType,
  subject,
  dept,
  date
});

const rows = [
  createData('Open', 'default', 'Website down for one week', 'Support', 'Today 2:00'),
  createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
  createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
  createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
  createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
  createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
  createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
  createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug')
];

const SelectedProductList = ({ products = [] }) => {
  return (
    <MainCard
      title="Mahsulotlar"
      content={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nomi</TableCell>
              <TableCell>Narxi</TableCell>
              <TableCell>Soni</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products && products.map((row, index) => {
              return (
                <TableRow hover key={index} sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                  <TableCell sx={{ pl: 3 }}>{row.subject}</TableCell>
                  <TableCell>{row.dept}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {products.length === 0 ? <EmptyTable /> : ''}
      </TableContainer>
    </MainCard>

  );
};
export default SelectedProductList;