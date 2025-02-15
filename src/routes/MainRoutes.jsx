import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import CustomerLayout from '../layout/Customer';
import FileReports from '../pages/apps/analytics/fileReports';
import Returned from '../pages/apps/analytics/cancel';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const Check = Loadable(lazy(() => import('../pages/apps/customer/check')));
const Orders = Loadable(lazy(() => import('../pages/apps/orders/list')));
const CustomerListPage = Loadable(lazy(() => import('../pages/apps/customer/list')));
const CustomerAdd = Loadable(lazy(() => import('../pages/apps/customer/customer-add')));
const CustomerOrder = Loadable(lazy(() => import('../pages/apps/customer/customer-order')));
const OrderEdit = Loadable(lazy(() => import('../pages/apps/orders/edit')));
const Account = Loadable(lazy(() => import('../pages/apps/customer/account')));
const CreateOrder = Loadable(lazy(() => import('../pages/apps/customer/create-order')));
const Partners = Loadable(lazy(() => import('../pages/apps/partner/list')));
const Search = Loadable(lazy(() => import('../pages/apps/customer/search')));
const Reject = Loadable(lazy(() => import('../pages/apps/orders/reject')));
const Faq = Loadable(lazy(() => import('../pages/apps/common/faq')));
const QR = Loadable(lazy(() => import('../pages/apps/common/qr')));
const Calculator = Loadable(lazy(() => import('../pages/apps/common/calculator')));
const Merchant = Loadable(lazy(() => import('../pages/apps/store/list')));
const AddMerchant = Loadable(lazy(() => import('../pages/apps/store/add-merchant')));
const EditMerchant = Loadable(lazy(() => import('../pages/apps/store/edit-merchant')));
const Daily = Loadable(lazy(() => import('../pages/apps/analytics/daily')));
const Sales = Loadable(lazy(() => import('../pages/apps/analytics/sale')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/apps/common/main')));
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/main',
          element: <SamplePage />
        },
        {
          path: '/customer/list',
          element: <CustomerListPage />
        },
        // {
        //   path: '/customer/add',
        //   element: <CustomerAdd />
        // },
        {
          path: 'customer',
          element: <CustomerLayout />,
          children: [
            {
              element: <Account />,
              children: [
                {
                  path: 'edit/:id',
                  element: <CustomerAdd />
                },
                {
                  path: 'orders/:id',
                  element: <CustomerOrder />
                }
              ]
            },
            {
              path: 'create/:id',
              element: <CreateOrder />
            }
          ]
        },
        {
          path: '/customer/check',
          element: <Check />
        },
        {
          path: '/customer/search',
          element: <Search />
        },
        {
          path: '/orders',
          element: <Orders />
        },
        {
          path: '/orders/:id',
          element: <OrderEdit />
        },
        {
          path: '/orders/reject/:id',
          element: <Reject />
        },
        {
          path: '/partners',
          element: <Partners />
        },
        {
          path: '/search',
          element: <Search />
        },
        {
          path: '/faq',
          element: <Faq />
        },
        {
          path: '/qr',
          element: <QR />
        },
        {
          path: '/calculator',
          element: <Calculator />
        },
        {
          path: '/store/merchant/add',
          element: <AddMerchant />
        },
        {
          path: '/store/merchant/list',
          element: <Merchant />
        },
        {
          path: '/store/merchant/edit/:id',
          element: <EditMerchant />
        },
        {
          path: '/store/analytics/daily',
          element: <Daily />
        },
        {
          path: '/store/analytics/sales',
          element: <Sales />
        },
        {
          path: '/store/analytics/return',
          element: <Returned />
        },
        {
          path: '/store/analytics/excel',
          element: <FileReports />
        }

      ]
    },

    // {
    //   path: '/maintenance',
    //   element: <PagesLayout />,
    //   children: [
    //     {
    //       path: '404',
    //       element: <MaintenanceError />
    //     },
    //     {
    //       path: '500',
    //       element: <MaintenanceError500 />
    //     },
    //     {
    //       path: 'under-construction',
    //       element: <MaintenanceUnderConstruction />
    //     },
    //     {
    //       path: 'coming-soon',
    //       element: <MaintenanceComingSoon />
    //     }
    //   ]
    // },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;
