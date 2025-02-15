import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { flexRender } from '@tanstack/react-table';
import { EmptyTable, HeaderSort } from '../../../components/third-party/react-table';
import TableBody from '@mui/material/TableBody';
import { Fragment } from 'react';
import CustomerView from '../customer/CustomerView';

const OrderList = ({ table }) => {
  console.log(table);
  return (<>
    <Table>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                Object.assign(header.column.columnDef.meta, {
                  className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                });
              }

              return (
                <TableCell
                  key={header.id}
                  {...header.column.columnDef.meta}
                  onClick={header.column.getToggleSortingHandler()}
                  {...(header.column.getCanSort() &&
                    header.column.columnDef.meta === undefined && {
                      className: 'cursor-pointer prevent-select'
                    })}
                >
                  {header.isPlaceholder ? null : (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                      {header.column.getCanSort() && <HeaderSort column={header.column} />}
                    </Stack>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            {row.getIsExpanded() && (
              <TableRow sx={{
                bgcolor: backColor,
                '&:hover': { bgcolor: `${backColor} !important` },
                overflow: 'hidden'
              }}>
                <TableCell colSpan={row.getVisibleCells().length} sx={{ p: 2.5, overflow: 'hidden' }}>
                  <CustomerView data={row.original} />
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
        {table.getRowModel() && table.getRowModel().rows.length === 0 ? <TableCell colSpan={8} align="center">
          <EmptyTable msg="Sizning so'rovingiz bo'yicha ma'lumot topilmadi" />
        </TableCell> : ''}

      </TableBody>


    </Table>
  </>);
};
export default OrderList;