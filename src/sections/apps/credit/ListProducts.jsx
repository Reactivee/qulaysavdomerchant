import MainCard from '../../../components/MainCard';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../../utils/functions';
import Stack from '@mui/material/Stack';

import { BiCloudDownload, BiDownload } from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';
import CircularWithPath from '../../../components/@extended/progress/CircularWithPath';


const ListProducts = ({ customer_order, downloadContract, loading }) => {
  const { products } = customer_order;
  let count = 0;
  if (products)
    count = products.reduce((acc, cur) => acc + cur.count, 0);
  return (

    <MainCard
      title={
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="bold">Mahsulotlar</Typography>
          {!loading ? <Tooltip style={{ cursor: 'pointer' }} title="Shartnomani yuklab olish">
            <BiCloudDownload onClick={() => downloadContract()} size={30} />
          </Tooltip> : <CircularWithPath size={30} />}
        </Stack>
      }
      content={false}
      contentSX={{ mb: 4 }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nomi</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Soni
              </TableCell>
              <TableCell align="center">Narxi</TableCell>
              <TableCell align="center">Summa</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell align="center">
                  <Typography variant="subtitle1">{row.product_name}</Typography>
                </TableCell>
                <TableCell align="center">{row.count}</TableCell>

                <TableCell align="center">
                  <Typography variant="h6">
                    {formatPrice(row.price)} so'm
                  </Typography>
                </TableCell>
                <TableCell variant="h6" align="center">{formatPrice(row.credit_price)} so'm</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell align="center">Jami:</TableCell>
              <TableCell align="center">

              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{formatPrice(customer_order.total_price)} so'm</TableCell>

            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </MainCard>

  );
};
export default ListProducts;