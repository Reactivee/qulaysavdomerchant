// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Profile2User, UserSquare, ShoppingBag, Additem, Home } from 'iconsax-react';

import { IoPersonAdd } from 'react-icons/io5';
import { RiUserSearchFill } from 'react-icons/ri';

// type

// icons
const icons = {
  customer: Profile2User,
  profile: UserSquare,
  team: RiUserSearchFill,
  order: ShoppingBag,
  add: IoPersonAdd,
  home: Home
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const customer = {
  id: 'group-customer',
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="main" />,
      type: 'item',
      url: '/main',
      icon: icons.home,
      breadcrumbs: false
    }
  ]
};

export default customer;
