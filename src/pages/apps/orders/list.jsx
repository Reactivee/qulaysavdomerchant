import { useEffect, useMemo, useState } from 'react';

import { Warning2 } from 'iconsax-react';

import Alert from '@mui/material/Alert';

import { OrdersListTable } from '../../../components/orders/OrdersListTable';
import { useOrdersContext } from '../../../contexts/OrdersContext';
import CreateOrderModal from '../../../sections/apps/credit/CreateOrderModal';
import Breadcrumbs from '../../../components/@extended/Breadcrumbs';
import { setUpDate } from '../../../utils/functions';

const Orders = () => {

  const { getInstallmentOrders, error, isLoading, orders, getCreditsStatusInfo } = useOrdersContext();
  const [open, setOpen] = useState(false);
  const [statusName, setStatusName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const [sortDate, setSortDate] = useState({
    start_date: '',
    end_date: ''
  });

  const handleClose = () => {
    setOpen(!open);
  };

  const handleChangePagination = async (value) => {
    setCurrentPage(value);
    await fetchGetInstallmentOrders(value);
  };

  const fetchCreditsStatus = async () => {
    await getCreditsStatusInfo().then(response => {
      setStatusName(response.data);
    });
  };

  useMemo(() => {
    fetchCreditsStatus();
  }, []);

  const fetchGetInstallmentOrders = async (currentPage = 1) => {
    await getInstallmentOrders({ currentPage, activeTab, globalFilter, sortDate }).then(response => {
      if (response.data) {
        setCurrentPage(response?.meta?.current_page);
      }
    });
  };


  useEffect(() => {
    fetchGetInstallmentOrders();
  }, [activeTab, globalFilter, sortDate]);

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

  if (error) return (
    <Alert color="error" variant="filled" icon={<Warning2 variant="Bold" />}>
      Serverda xatolik
    </Alert>
  );

  return (
    <>
      <OrdersListTable
        {...{
          data: orders?.data,
          loading: isLoading,
          meta: orders?.meta,
          currentPage,
          globalFilter,
          setGlobalFilter,
          sortDate,
          setupSortDate,
          handleChangePagination,
          handleClose,
          statusName,
          setActiveTab,
          activeTab
        }}
      />
      {/*<CreateOrderModal open={false} selectedOrder={''} onClose={handleClose} />*/}
    </>

  );
};

export default Orders;