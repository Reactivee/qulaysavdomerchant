import { useState, Fragment, useMemo } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import 'rsuite/DateRangePicker/styles/index.css';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import {
  DebouncedInput
} from 'components/third-party/react-table';

// assets
import { AddCircle, Edit } from 'iconsax-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import MySkeletonTable from '../skeletons/EmptyTableSkeleton';
import Pagination from '@mui/material/Pagination';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '../@extended/IconButton';
import { CustomProvider, DateRangePicker } from 'rsuite';
import * as locales from 'rsuite/locales';
import OrderList from '../../sections/apps/credit/OrderList';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../utils/functions';
import { PatternFormat } from 'react-number-format';

// ==============================|| REACT TABLE - LIST ||============================== //

export function OrdersListTable({
                                  data = [],
                                  meta,
                                  loading,
                                  handleChangePagination,
                                  currentPage,
                                  statusName,
                                  globalFilter,
                                  setGlobalFilter,
                                  setupSortDate,
                                  setActiveTab,
                                  activeTab
                                }) {
  const theme = useTheme();
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const navigate = useNavigate();

  const navigateToEdit = (id) => {
    navigate(`/orders/${id}`);
  };


  const columns = useMemo(
    () => [
      {
        header: '№',
        accessorKey: 'id',
        meta: {
          className: 'cell-center'
        },
        cell: ({ cell }) => {
          if (currentPage > 1) {
            const current = meta?.current_page;
            const startRow = (current - 1) * 10;
            return cell.row.index + startRow + 1;

          } else {
            return cell.row.index + 1;
          }

        }
      },
      {
        header: 'Shartnoma raqami',
        accessorKey: 'code',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Mijoz',
        accessorKey: 'full_name',
        cell: ({ getValue }) => {
          return getValue();
        },
        meta: {
          className: 'cell-center'
        }

      },


      {
        header: 'Telefon raqam',
        accessorKey: 'client',
        meta: {
          className: 'cell-center'
        },
        cell: ({ getValue }) => <PatternFormat displayType="text" format="+##### ###-####" mask="_"
                                               defaultValue={getValue()?.phone} />
      },
      {
        header: 'Summa',
        accessorKey: 'total_price',
        meta: {
          className: 'cell-center'
        },
        cell: ({ getValue }) => <Typography>{formatPrice(getValue())} so'm</Typography>
      },
      {
        header: 'Yaratilgan vaqt',
        accessorKey: 'created_at',
        meta: {
          className: 'cell-center'
        }
      },

      {
        header: 'Holati',
        accessorKey: 'status',
        meta: {
          className: 'cell-center'
        },
        cell: ({ getValue, row }) => {

          switch (getValue()) {
            case -1:
              return <Chip color="error" label={row.original.status_name} size="small" variant="light" />;
            case 2:
              return <Chip color="warning" label={row.original.status_name} size="small" variant="light" />;
            case 4:
              return <Chip color="success" label={row.original.status_name} size="small" variant="light" />;
            case -2:
              return <Chip color="error" label={row.original.status_name} size="small" variant="light" />;
            default:
              return <Chip color="info" label={row.original.status_name} size="small" variant="light" />;
          }
        }
      },

      {
        header: '#',
        meta: {
          className: 'cell-center'
        },
        disableSortBy: true,
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Tahrirlash">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToEdit(row.original.id);
                    // setCustomerModal(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>

            </Stack>
          );
        }
      }
    ], // eslint-disable-next-line
    [theme, currentPage, data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
      globalFilter
    },
    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  });

  let headers = [];
  columns.map(
    (columns) =>
      // @ts-ignore
      columns.accessorKey &&
      headers.push({
        label: typeof columns.header === 'string' ? columns.header : '#',
        // @ts-ignore
        key: columns.accessorKey
      })
  );

  const changeToCreateCustomer = () => {
    navigate('/customer/check');
    // handleClose(true);
  };

  const changePage = (page, value) => {
    handleChangePagination(value);
  };

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.5, pb: 0, width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}

          sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab
            label={'Hammasi'}
            value={0}
            iconPosition="end"
          />
          {statusName.map((item, index) => (
            <Tab
              key={index}
              label={item.status_name}
              value={item.status}
              iconPosition="end"
              icon={

                <Chip
                  label={item.count}
                  color={item.status === 2 ? 'warning' : item.status === 4 ? 'success' : item.status === -1 ? 'error' : item.status === -2 ? 'error' : 'info'}
                  variant="light"
                  size="small"
                />
              }
            />
          ))}

        </Tabs>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 3 }}>

        <DebouncedInput
          value={globalFilter ?? ''}
          size={'small'}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Qidirish...`}
        />

        <Stack direction="row" alignItems="end" spacing={2}>
          <CustomProvider locale={locales['ruRU']}>
            <DateRangePicker
              showHeader={false}
              compact
              editable={false}
              showWeekNumbers={false} showMeridiem={false} block={false} isoWeek={false}
              placeholder="Muddat tanlang"
              onChange={setupSortDate}
              size="lg" />
          </CustomProvider>
          {/*<SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />*/}
          <Button variant="contained" sx={{ paddingY: '8px', fontSize: '14px' }}
                  startIcon={<AddCircle />}
                  onClick={() => changeToCreateCustomer()}>
            Yangi Buyurtma qo'shish
          </Button>
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          {/*<RowSelection selected={Object.keys(rowSelection).length} />*/}
          <TableContainer>
            {loading ? <MySkeletonTable /> : <OrderList table={table} />}

          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Pagination
                count={meta?.last_page}
                page={currentPage}
                onChange={changePage}
                color="primary"
                variant="combined"
              />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}
