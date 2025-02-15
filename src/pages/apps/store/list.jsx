import MerchantListTable from '../../../components/store/MerchantListTable';
import { useStoreContext } from '../../../contexts/StoreContext';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { AddCircle } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import MainCard from '../../../components/MainCard';

const Merchant = () => {
  const { data, pagination, fetchMerchants, isLoading } = useStoreContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMerchants({ currentPage });
  }, [currentPage]);

  const changePage = (page, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <MainCard
        title="Xodimlar ro'yhati"
        content={false}
        secondary={
          // <Button variant="outlined" component={RouterLink} shad to="/customer/list">
          //   Hammasini ko'rish
          // </Button>
          <Button component={RouterLink} variant="outlined" had to="/store/merchant/add"
                  sx={{ textTransform: 'none', paddingY: '7px', fontSize: '16px' }}
                  startIcon={<AddCircle />} size="large">
            Yangi xodim qo'shish
          </Button>
        }
      >
        <MerchantListTable data={data} isLoading={isLoading} pagination={pagination} />

        <Stack direction="row" justifyContent="end">
          <Box sx={{ p: 2 }}>
            <Pagination
              count={pagination?.last_page}
              page={currentPage}
              onChange={changePage}
              color="primary"
              variant="combined"
            />
          </Box>
        </Stack>
      </MainCard>
    </>
  );
};
export default Merchant;