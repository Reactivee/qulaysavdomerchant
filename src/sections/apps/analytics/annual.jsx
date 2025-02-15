import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import { ThemeMode } from 'config';

// chart options
const areaChartOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  grid: {
    strokeDashArray: 4
  }
};

// ==============================|| CHART - REPEAT CUSTOMER CHART ||============================== //

export default function AnnualChart({ slot, data }) {
  const theme = useTheme();

  let key = data && data.map(item => item.key);
  let count = data && data.map(item => item.count);
  let total = data && data.map(item => item.total_price);

  const mode = theme.palette.mode;
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: key,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        axisTicks: {
          show: true
        },
        tickAmount: 30
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, data]);


  const [series, setSeries] = useState([
    {
      name: 'Soni',
      data: count
    }
  ]);

  useEffect(() => {
    switch (slot) {
      case 'count':
        setSeries([
          {
            name: 'Soni',
            data: count
          }
        ]);
        break;
      case 'total':
        setSeries([
          {
            name: 'Summa',
            data: total
          }
        ]);
        break;
      default:
        break;

    }
  }, [slot, data]);

  return <ReactApexChart options={options} series={series} type="area" height={300} />;
}
