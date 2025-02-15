import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { EmptyTable } from '../third-party/react-table';
import MySkeletonTable from '../skeletons/EmptyTableSkeleton';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import SalesList from '../../sections/apps/analytics/SalesList';
import ReturnedList from '../../sections/apps/analytics/ReturnedList';

const ReturnedTable = ({ changePage, products, meta, isLoading, page }) => {


  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="center">Shartnoma raqami</TableCell>
              <TableCell align="center">To'liq ism</TableCell>
              <TableCell align="center">Mahsulot nomi</TableCell>
              <TableCell align="center">Soni</TableCell>
              <TableCell align="center">
                Miqdori
              </TableCell>
              <TableCell align="center">
                Sababi
              </TableCell>
            </TableRow>

          </TableHead>

          <TableBody>
            {!isLoading && products && products.length > 0 ?
              <ReturnedList meta={meta} products={products} /> : ''}
            {!isLoading && products && products.length === 0 ? <TableRow hover>
              <TableCell colSpan={7} align="center">
                <EmptyTable msg="Sizning so'rovingiz bo'yicha ma'lumot topilmadi" />
              </TableCell>
            </TableRow> : ''}
          </TableBody>
        </Table>
        {isLoading ? <MySkeletonTable /> : ''}
      </TableContainer>

      {
        meta && meta.last_page > 1 ? <Stack sx={{ p: 2 }} direction="row" justifyContent="end">
          <Pagination
            count={meta?.last_page}
            page={page}
            onChange={changePage}
            color="primary"
            variant="combined"
          />
        </Stack> : ''}

    </>
  );
};
export default ReturnedTable;