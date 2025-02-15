import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import MainCard from '../MainCard';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { EmptyTable } from '../third-party/react-table';
import { useGetTodayCustomerOrders } from '../../api/customer';
import { useState } from 'react';

import TodayOrdersList from '../../sections/apps/credit/TodayOrdersList';
import MySkeletonTable from '../skeletons/EmptyTableSkeleton';

const TodayOrdersListTable = (props) => {

  const [page, setPage] = useState(1);
  const { orders, meta, isLoading } = useGetTodayCustomerOrders(page);
  const changePage = (page, value) => {
    setPage(value);
  };

  return (
    <MainCard
      title="Shartnomalar"
      subheader={'Bugun uchun'}
      content={false}
      secondary={
        <Button variant="outlined" component={RouterLink} shad to="/orders">
          Hammasini ko'rish
        </Button>
      }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="center">To'liq ism</TableCell>
              <TableCell align="center">Telefon raqami</TableCell>
              <TableCell align="center">
                Holati
              </TableCell>
              <TableCell>
                #
              </TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {!isLoading && orders && orders.length > 0 ? <TodayOrdersList meta={meta} orders={orders} /> : ''}
            {!isLoading && orders.length === 0 ? <TableRow hover>
              <TableCell colSpan={5} align="center">
                <EmptyTable msg="Sizning so'rovingiz bo'yicha ma'lumot topilmadi" />
              </TableCell>
            </TableRow> : ''}
          </TableBody>
        </Table>
        {isLoading ? <MySkeletonTable /> : ''}
      </TableContainer>
      {meta && meta.last_page > 1 ? <Stack direction="row" justifyContent="end">
        <Box sx={{ p: 2 }}>
          <Pagination
            count={meta?.last_page}
            page={page}
            onChange={changePage}
            color="primary"
            variant="combined"
          />
        </Box>
      </Stack> : ''}

    </MainCard>

  );
};
export default TodayOrdersListTable;