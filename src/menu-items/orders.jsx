// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ShoppingBag } from 'iconsax-react';

// type

// icons
const icons = {

  order: ShoppingBag

};

// ==============================|| MENU ITEMS - CHARTS & MAPS ||============================== //

const orders = {
  type: 'group',
  // title: <FormattedMessage id=" " />,

  children: [

    {
      id: 'orders',
      title: <FormattedMessage id="Buyurtmalar" />,
      type: 'collapse',
      icon: icons.order,
      children: [
        {
          id: 'user-profile',
          title: <FormattedMessage id="Mijoz buyurtmalari" />,
          type: 'item',
          link: '/orders',
          url: '/orders'
        },
        {
          id: 'account-profile',
          title: <FormattedMessage id="account-profile" />,
          type: 'item',
          url: '/apps/profiles/account/basic',
          link: '/apps/profiles/account/:tab'
        }
      ]
    }

  ]
};

export default orders;
