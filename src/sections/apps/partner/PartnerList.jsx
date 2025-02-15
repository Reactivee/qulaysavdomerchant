import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import MainCard from '../../../components/MainCard';
import ScrollX from '../../../components/ScrollX';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import { AddCircle } from 'iconsax-react';
import Stack from '@mui/material/Stack';

const PartnerListTable = ({ columns, data, striped, title }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      content={false}
      // title={'asd'}
    >
      <Stack direction="row" sx={{ py: 2, pr: 2 }} spacing={1} justifyContent="end">

        <Button variant="contained" sx={{ textTransform: 'none', paddingY: '8px', fontSize: '14px' }}
          // startIcon={<AddCircle />}
        >
          Yangi sotuvchi qo'shish
        </Button>
      </Stack>

      <ScrollX>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...(striped && { className: 'striped' })}>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
};
export default PartnerListTable;