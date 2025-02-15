// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { DebouncedInput, EmptyTable } from './third-party/react-table';
import Stack from '@mui/material/Stack';
import { useContractContext } from '../contexts/ContractContext';
import { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Avatar from './@extended/Avatar';
import { formatPrice } from '../utils/functions';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { AddCircle } from 'iconsax-react';
import IconButton from './@extended/IconButton';

// ==============================|| REACT TABLE ||============================== //
const ProductsListTable = ({ products = [], pagination, currentPage, changePage, search, queryData }) => {

  return (
    <MainCard
      title="Mahsulotlar"
      content={false}>
      <Stack
        spacing={2}
        justifyContent="start"
        sx={{ padding: 2.5 }}
      >
        <DebouncedInput
          value={queryData}
          onFilterChange={(value) => search(value)}
          placeholder={`Mahsulot qidirish...`}
        />
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rasm</TableCell>
              <TableCell>Nomi</TableCell>
              <TableCell>Narx</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products && products.map((row, index) => {
              return (
                <TableRow hover key={index} sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                  <TableCell sx={{ pl: 3 }}>
                    <Avatar
                      alt="Avatar 1"
                      size="lg"
                      variant="rounded"
                      src={row?.images ? row?.images[0]?.path : ''}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{formatPrice(row.price)} so'm</TableCell>
                  <TableCell>
                    <IconButton
                      alt="add-product"
                      size="md"
                      variant="rounded"
                      color="primary"
                    >
                      <AddCircle />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {products.length === 0 ? <EmptyTable /> : ''}
      </TableContainer>
      <Stack direction="row" justifyContent="end" sx={{ p: 2 }}>
        <Pagination
          count={pagination?.last_page}
          page={currentPage}
          onChange={changePage}
          color="primary"
          variant="combined"
        />
      </Stack>
    </MainCard>
  );
};

export default function ProductsList() {
  const { products, getProducts, pagination } = useContractContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [queryData, setQueryData] = useState('');
  const { id } = useParams();

  useMemo(() => {
    getProducts(1, queryData);
  }, [id, queryData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const setQuery = (query) => {
    setQueryData(query);
  };

  return (
    <MainCard content={false}>
      <ScrollX>
        <ProductsListTable products={products}
                           pagination={pagination}
                           queryData={queryData}
                           search={setQuery}
                           currentPage={currentPage}
                           changePage={handlePageChange} />
      </ScrollX>
    </MainCard>
  );
}

// ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, title: PropTypes.string };
