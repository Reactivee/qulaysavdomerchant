import PropTypes from 'prop-types';
import { useMemo, useState, Fragment, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';


// third-party
import { PatternFormat } from 'react-number-format';
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';


import {
  DebouncedInput
} from 'components/third-party/react-table';

// assets
import { Add, AddCircle, Edit, EthereumClassic, Eye } from 'iconsax-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import MySkeletonTable from '../skeletons/EmptyTableSkeleton';
import Pagination from '@mui/material/Pagination';
import { useClientContext } from '../../contexts/ClientContext';
import { setUpDate } from '../../utils/functions';
import { CustomProvider, DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import * as locales from 'rsuite/locales';
import CustomerList from '../../sections/apps/customer/CustomerList';
// ==============================|| REACT TABLE - LIST ||============================== //


function ReactTable({
                      data = [],
                      columns,
                      meta,
                      loading,
                      handleChangePagination,
                      currentPage,
                      setupSortDate,
                      statusInfo,
                      setActiveTab,
                      activeTab,
                      setGlobalFilter,
                      globalFilter
                    }) {

  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection
    },
    enableRowSelection: true,
    // onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
  };

  const changePage = (page, value) => {
    handleChangePagination(value);
  };

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.5, pb: 0, width: '100%' }}>
        <Tabs value={activeTab} onChange={(e, value) => {
          setActiveTab(value);
          // handleStatusClient(value);
        }}
              sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab
            label={'Hammasi'}
            value={0}
            iconPosition="end"
          />

          {statusInfo && statusInfo.map((item, index) => (
            <Tab
              key={index}
              label={item.status_name}
              value={item.status}
              icon={

                <Chip
                  label={item.count}
                  color={item.status === 1 ? 'info' : item.status === 10 ? 'success' : 'error'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>


      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 3 }}>
        <DebouncedInput
          sx={{ paddingY: '8px' }}
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
              showWeekNumbers={false} showMeridiem={false} block={false} isoWeek={false}
              placeholder="Muddat tanlang"
              onChange={setupSortDate}
              size="lg" />
          </CustomProvider>
          <Button variant="contained" sx={{ textTransform: 'none', paddingY: '7px', fontSize: '16px' }}
                  startIcon={<AddCircle />}
                  onClick={() => changeToCreateCustomer()} size="large">
            Yangi mijoz qo'shish
          </Button>
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          <TableContainer>
            {loading ? <MySkeletonTable /> : <CustomerList table={table} />}
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
  )

}

// ==============================|| CUSTOMER LIST ||============================== //

export default function CustomerListTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getClientList, error, isLoading, data, getClientStatusInfo, sendToScoring } = useClientContext();
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusInfo, setStatusInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [sortDate, setSortDate] = useState({
    start_date: '',
    end_date: ''
  });

  const navigateToEdit = (id) => {
    navigate(`/customer/edit/${id}`);
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
            const current = data?.meta?.current_page;
            const startRow = (current - 1) * 10;
            return cell.row.index + startRow + 1;

          } else {
            return cell.row.index + 1;
          }

        }
      },
      {
        header: 'To\'liq ism',
        accessorKey: 'full_name',
        meta: {
          className: 'cell-center'
        }
        //
        // cell: ({ row, getValue }) => (
        //   <Stack direction="row" spacing={1.5} alignItems="center">
        //     <Stack spacing={0}>
        //       <Typography variant="subtitle1">{getValue()}</Typography>
        //       <Typography color="text.secondary">{row.original.email}</Typography>
        //     </Stack>
        //   </Stack>
        // )
      },
      {
        header: 'Telefon raqam',
        accessorKey: 'phone',
        meta: {
          className: 'cell-center'
        },
        cell: ({ getValue }) => <PatternFormat displayType="text" format="+##### ###-####" mask="_"
                                               defaultValue={getValue()} />
      },
      {
        header: 'Passport seriya',
        accessorKey: 'passport_full_serial',
        meta: {
          className: 'cell-center'
        }
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
        cell: ({ row, getValue }) => {

          switch (getValue()) {
            case 1:
              return <Chip color="info" label={row?.original?.status_name} size="small" variant="light" />;
            case 10:
              return <Chip color="success" label={row?.original?.status_name} size="small" variant="light" />;
            default:
              return <Chip color="error" label={row?.original?.status_name} size="small" variant="light" />;
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
          const collapseIcon =
            row.getCanExpand() && row.getIsExpanded() ? (
              <Add style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} />
            ) : (
              <Eye />
            );
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton color="secondary" onClick={row.getToggleExpandedHandler()}>
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToEdit(row.original.id);
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
    [theme, data]
  );


  const handleChangePagination = (value) => {
    setCurrentPage(value);
    fetchGetCustomers(value);

  };

  const handleSearchValueChange = (event) => {
    setGlobalFilter(event);
  };

  // const handleStatusClient = (statusInfo) => {
  //   getClientList({ currentPage, globalFilter, sortDate, statusInfo }).then((response) => {
  //   });
  // };

  const fetchClientInfoStatus = async () => {
    await getClientStatusInfo().then(
      (data) => {
        setStatusInfo(data?.data);
      }
    );
  };

  const setupSortDate = (dates) => {
    if (dates && dates.length > 0) {
      const start = setUpDate(dates[0]);
      const end = setUpDate(dates[1]);
      const start_date = start;
      const end_date = end;

      setSortDate(prev => {
        return {
          start_date,
          end_date
        };
      });
    } else {
      setSortDate({
        start_date: '',
        end_date: ''
      });
    }
  };

  useMemo(() => {
    fetchClientInfoStatus();
  }, []);

  const fetchGetCustomers = async (currentPage = 1) => {
    await getClientList({ currentPage, activeTab, globalFilter, sortDate }).then(response => {
      if (response.data) {
        setCurrentPage(response?.meta?.current_page);
      }
    });
  };


  useEffect(() => {
    fetchGetCustomers();
  }, [globalFilter, activeTab, sortDate]);

  // if (isLoading) return <MySkeletonTable />;

  if (error) return (
    <Alert color="error" variant="filled" icon={<EthereumClassic variant="Bold" />}>
      Error Text
    </Alert>
  );


  return (
    <>
      <ReactTable
        {...{
          data: data?.data,
          columns,
          loading: isLoading,
          meta: data?.meta,
          currentPage,
          handleSearchValueChange,
          globalFilter,
          handleChangePagination,
          setupSortDate,
          sortDate,
          statusInfo,
          setActiveTab,
          activeTab,
          setGlobalFilter

        }}
      />

      {/*<AlertCustomerDelete id={Number(customerDeleteId)} title={customerDeleteId} open={open}*/}
      {/*                     handleClose={handleClose} />*/}
      {/*<CustomerModal open={customerModal} modalToggler={setCustomerModal} customer={selectedCustomer} />*/}
    </>
  );

}

ReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array, modalToggler: PropTypes.func };
