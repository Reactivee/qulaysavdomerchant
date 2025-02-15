import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
const CustomerListTable = Loadable(lazy(() => import('../../../components/client/ClientListTable')));
const CustomerList = () => {
  return (
    <div>
      <CustomerListTable />
    </div>
  );
};
export default CustomerList;