import Breadcrumbs from '../../../components/@extended/Breadcrumbs';
import PartnerListTable from '../../../sections/apps/partner/PartnerList';
import makeData from '../../../data/react-table';
import { useMemo } from 'react';
import Chip from '@mui/material/Chip';
import LinearWithLabel from '../../../components/@extended/progress/LinearWithLabel';

const Partners = ({ striped, title }) => {
  const data = makeData(10);

  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName'
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName'
      },
      {
        header: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        header: 'Profile Progress',
        accessorKey: 'progress',
        cell: (cell) => <LinearWithLabel value={cell.getValue()} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  return (
    <>
      <Breadcrumbs icon />
      {/*<ReactTable {...{ data, columns, title, striped }} />*/}
      <PartnerListTable {...{ data, columns, title, striped }} />
    </>
  );
};
export default Partners;