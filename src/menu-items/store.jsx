// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Shop, UserAdd, User, Money2, Back } from 'iconsax-react';
import { TbReport } from 'react-icons/tb';
import { SiGoogleanalytics } from 'react-icons/si';
// icons
const icons = {
  shop: Shop,
  add: UserAdd,
  user: User,
  sale: Money2,
  report: TbReport,
  analytics: SiGoogleanalytics,
  return: Back

};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const store = {
  id: 'store',
  type: 'group',
  children: [
    {
      id: 'dashboard1',
      title: <FormattedMessage id="management" />,
      type: 'collapse',
      icon: icons.shop,
      children: [
        {
          id: 'add',
          title: <FormattedMessage id="add_merchant" />,
          type: 'item',
          url: '/store/merchant/add',
          icon: icons.add,
          breadcrumbs: true
        },
        {
          id: 'userList',
          title: <FormattedMessage id="merchants" />,
          type: 'item',
          url: '/store/merchant/list',
          icon: icons.user,
          breadcrumbs: true
        },
        {
          id: 'daily',
          title: <FormattedMessage id="analytics" />,
          type: 'item',
          url: '/store/analytics/daily',
          icon: icons.analytics,
          breadcrumbs: true
        },
        {
          id: 'sales',
          title: <FormattedMessage id="sales" />,
          type: 'item',
          url: '/store/analytics/sales',
          icon: icons.sale,
          breadcrumbs: true
        },
        {
          id: 'return',
          title: <FormattedMessage id="return_products" />,
          type: 'item',
          url: '/store/analytics/return',
          icon: icons.return,
          breadcrumbs: true
        },
        {
          id: 'excel',
          title: <FormattedMessage id="Hisobotlar" />,
          type: 'item',
          url: '/store/analytics/excel',
          icon: icons.report,
          breadcrumbs: true
        }

      ]
    }
  ]
};

export default store;
