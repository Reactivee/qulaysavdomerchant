import SalesTable from '../../../components/analytics/SalesTable';
import { useState } from 'react';
import { useGetSales } from '../../../api/analytics';
import MainCard from '../../../components/MainCard';
import Stack from '@mui/material/Stack';
import { DebouncedInput } from '../../../components/third-party/react-table';
import { CustomProvider, DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import * as locales from 'rsuite/locales';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { setUpDate } from '../../../utils/functions';
import { useGetMerchantList } from '../../../api/user';

const Sales = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    'search': '',
    'start_date': '',
    'end_date': '',
    'consultant': ''
  });
  const { merchant } = useGetMerchantList();

  const { products, meta, isLoading } = useGetSales({ page, filters });
  const changePage = (page, value) => {
    setPage(value);
  };


  const selectUpDate = (date) => {
    if (date && date.length > 0) {
      const start_date = setUpDate(date[0]);
      const end_date = setUpDate(date[1]);
      setFilters(prev => ({
        ...prev,
        start_date,
        end_date
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        start_date: '',
        end_date: ''
      }));
    }
  };
  const setFilterQuery = (value) => {
    setFilters(prevState => ({ ...prevState, search: value }));
  };

  const handleConsultant = (data) => {
    setFilters(prevState => ({ ...prevState, consultant: data.target.value }));
  };

  const clearAllFields = () => {
    setFilters({
      'search': '',
      'start_date': '',
      'end_date': '',
      'consultant': ''
    });
  };


  return (
    <MainCard
      content={false}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="start" sx={{ padding: 3 }}>
        <DebouncedInput
          value={filters.query ?? ''}
          size={'small'}
          onFilterChange={setFilterQuery}
          placeholder={`Qidirish...`}
        />
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="consultant_id">Konsulant</InputLabel>
          <Select onChange={handleConsultant} sx={{ paddingY: '3px' }} size={'small'} labelId="consultant_id"
                  id="consultant_id-helper" value={filters.consultant}>
            <MenuItem value={0}>
              <>Barchasi</>
            </MenuItem>
            {merchant && merchant.map((item, index) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.full_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <CustomProvider locale={locales['ruRU']}>
          <DateRangePicker
            showHeader={false}
            compact
            // value={[new Date(filters.start_date), new Date(filters.end_date)]}
            editable={false}
            showWeekNumbers={false} showMeridiem={false} block={false} isoWeek={false}
            placeholder="Muddat tanlang"
            style={{ borderColor: 'red', borderWidth: '1px' }}
            onChange={selectUpDate}
            size="lg" />
        </CustomProvider>
        {/*<Button variant="contained" color="warning" sx={{ paddingX: '30px', paddingY: '7px' }}*/}
        {/*        startIcon={<ClearIcon />}*/}
        {/*        onClick={() => clearAllFields()}*/}
        {/*>*/}
        {/*  Tozalash*/}
        {/*</Button>*/}
      </Stack>
      <SalesTable page={page} changePage={changePage} products={products} meta={meta} isLoading={isLoading} />

    </MainCard>
  );
};

export default Sales;