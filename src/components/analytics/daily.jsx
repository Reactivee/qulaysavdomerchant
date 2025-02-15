import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';


// project-imports
import MainCard from 'components/MainCard';
import AnnualChart from '../../sections/apps/analytics/annual';
import { useGetAnalytics } from '../../api/analytics';
import DailyChart from '../../sections/apps/analytics/daily';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import CircularLoader from '../CircularLoader';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { FormattedMessage } from 'react-intl';
import { useGetMerchantList } from '../../api/user';
import FormControl from '@mui/material/FormControl';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}


// ==============================|| CHART WIDGET - PROJECT ANALYTICS ||============================== //

export default function DailyAnalytics() {
  const DAY = 1;
  const ANNUAL = 2;
  const [query, setQuery] = useState({
    'month': '',
    'type': DAY,
    'year': new Date().getFullYear(),
    'consultant': ''
  });
  const [slot, setSlot] = useState('count');

  const { merchant } = useGetMerchantList();
  const { report, isLoading } = useGetAnalytics(query);
  const [value, setValue] = useState(0);
  const [pastYears, setPastYears] = useState([]);
  const BEGIN_YEAR = 2024;
  const CURRENT_YEAR = new Date().getFullYear();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setQuery(prevState => {
        return { ...prevState, 'type': DAY };
      });
    } else if (newValue === 1) {
      setQuery(prevState => {
        return { ...prevState, 'type': ANNUAL, 'month': 0 };
      });
    }
  };
  const handleSlot = (event, value) => {
    setSlot(value);
  };
  const handleChangeMonth = (e, value) => {
    setQuery(prevState => ({
      ...prevState,
      month: e.target.value
    }));
  };

  const handleChangeYear = (e, value) => {

    setQuery(prevState => ({
      ...prevState,
      year: e.target.value
    }));
  };

  const handleConsultant = (data) => {
    setQuery(prevState => ({ ...prevState, consultant: data.target.value }));
  };

  const collectPastYears = () => {
    const values = [];
    for (let i = BEGIN_YEAR; i <= CURRENT_YEAR; i++) {
      values.push(i);
    }
    setPastYears(values);
  };

  useEffect(() => {
    collectPastYears();
  }, []);

  return (
    <MainCard content={false}>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>

              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    sx={{ px: 3, pt: 1, '& .MuiTab-root': { mb: 0.5 } }}>
                <Tab label="Kunlik" {...a11yProps(0)} />
                <Tab label="Yillik" {...a11yProps(1)} />
              </Tabs>

            </Grid>

            <Grid item xs={8}>
              <Stack direction="row" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-end' }}
                     sx={{ mr: 2 }}>
                <ToggleButtonGroup exclusive onChange={handleSlot} value={slot}>
                  <ToggleButton disabled={slot === 'count'} value="count" sx={{ px: 2, py: 0.5 }}>
                    Soni
                  </ToggleButton>
                  <ToggleButton disabled={slot === 'total'} value="total" sx={{ px: 2, py: 0.5 }}>
                    Summa
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>
          </Grid>

        </Stack>

        <Box sx={{ p: 3 }}>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="consultant_id">Konsulant</InputLabel>
                  <Select onChange={handleConsultant} sx={{ paddingY: '3px' }} size={'small'} labelId="consultant_id"
                          id="consultant_id-helper" value={query.consultant}>
                    <MenuItem value={0}>
                      <>Hammasi</>
                    </MenuItem>
                    {merchant && merchant.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.full_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {query.type == DAY ?
                  <>    <FormControl sx={{ width: '200px' }}>
                    <InputLabel id="month_id">Oy</InputLabel>
                    <Select
                      sx={{ paddingY: '3px' }}
                      value={query?.month}
                      size="small"
                      name="month"
                      labelId="month_id"
                      onChange={(e) => handleChangeMonth(e)}
                    >
                      <MenuItem value={0}>Hammasi</MenuItem>
                      <MenuItem value="1"><FormattedMessage id="jan" /></MenuItem>
                      <MenuItem value="2"><FormattedMessage id="fev" /></MenuItem>
                      <MenuItem value="3"><FormattedMessage id="mar" /></MenuItem>
                      <MenuItem value="4"><FormattedMessage id="aprl" /></MenuItem>
                      <MenuItem value="5"><FormattedMessage id="may" /></MenuItem>
                      <MenuItem value="6"><FormattedMessage id="jun" /></MenuItem>
                      <MenuItem value="7"><FormattedMessage id="jul" /></MenuItem>
                      <MenuItem value="8"><FormattedMessage id="aug" /></MenuItem>
                      <MenuItem value="9"><FormattedMessage id="sep" /></MenuItem>
                      <MenuItem value="10"><FormattedMessage id="oct" /></MenuItem>
                      <MenuItem value="11"><FormattedMessage id="nov" /></MenuItem>
                      <MenuItem value="12"><FormattedMessage id="dec" /></MenuItem>
                    </Select>
                  </FormControl>
                  </>

                  : ''}

                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="year_id">Yil</InputLabel>
                  <Select onChange={handleChangeYear}
                          sx={{ paddingY: '3px' }}
                          size="small"
                          labelId="year_id"
                          id="year-helper"
                          value={query.year}>
                    {pastYears && pastYears.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

              </Stack>
              <Stack spacing={2}>
                {isLoading ? <CircularLoader /> : ''}
                {report && value === 0 ? <DailyChart slot={slot} data={report} /> : ''}
                {report && value === 1 ? <AnnualChart slot={slot} data={report} /> : ''}
                {/*<RepeatCustomerRate />*/}
                {/*<EcommerceDataChart data={data} />*/}
              </Stack>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </MainCard>
  );
}

DailyAnalytics.propTypes = {
  data: PropTypes.array
};
