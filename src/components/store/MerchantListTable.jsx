import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { EmptyTable } from '../third-party/react-table';

import ScrollX from '../ScrollX';
import Loadable from '../Loadable';
import { lazy } from 'react';

const MerchantList = Loadable(lazy(() => import('../../sections/apps/store/MerchantList')));
const MySkeletonTable = Loadable(lazy(() => import('../skeletons/EmptyTableSkeleton')));


const MerchantListTable = ({ data, pagination, isLoading }) => {
  return (
    <ScrollX>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="center">To'liq ism</TableCell>
              <TableCell align="center">Login</TableCell>
              <TableCell align="center">Telefon raqami</TableCell>

              <TableCell align="center">
                Holati
              </TableCell>
              <TableCell align="center">
                #
              </TableCell>
            </TableRow>

          </TableHead>

          <TableBody>
            {data && pagination ? <MerchantList pagination={pagination} data={data} /> : ''}
            {!isLoading && data && data.length === 0 ? <TableRow hover>
              <TableCell colSpan={6} align="center">
                {/*<MerchantList/>*/}
                <EmptyTable msg="Ma'lumot topilmadi" />
              </TableCell>
            </TableRow> : ''}
          </TableBody>

        </Table>
        {isLoading ? <MySkeletonTable /> : ''}

      </TableContainer>

    </ScrollX>


  );
};
export default MerchantListTable;