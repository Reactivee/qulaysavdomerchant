import Modal from '@mui/material/Modal';
import MainCard from '../../../components/MainCard';
import SimpleBar from '../../../components/third-party/SimpleBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularWithPath from '../../../components/@extended/progress/CircularWithPath';
import NewOrderForm from '../../forms/NewOrderForm';


const CreateOrderModal = ({ open, selectedOrder, onClose }) => {
  // const { getInstallmentOrders, error, isLoading, orders, customer_order,getInstallmentOrderSingleCustomer } = useOrdersContext();
  // const { id } = useParams();
  // console.log(id);
  // useEffect(() => {
  //   getInstallmentOrderSingleCustomer(id)
  // }, [id]);
  //
  // console.log(customer_order);

  const handleClose = () => {
    onClose(false);
  };

  return (<>
    {open && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-customer-add-label"
        aria-describedby="modal-customer-add-description"
        sx={{ '& .MuiPaper-root:focus': { outline: 'none' } }}
      >
        <MainCard
          title="Yangi buyurtma"
          sx={{
            width: `calc(100% - 48px)`,
            minWidth: 340,
            maxWidth: 880,
            height: 'auto',
            maxHeight: 'calc(100vh - 48px)'
          }}
          modal
          content={false}
        >
          <SimpleBar sx={{
            maxHeight: `calc(100vh - 48px)`,
            '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
          }}>
            <NewOrderForm closeModal={onClose} />
          </SimpleBar>
        </MainCard>
      </Modal>
    )}
  </>);
};
export default CreateOrderModal;