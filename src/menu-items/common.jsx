// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2 } from 'iconsax-react';
import { FaCalculator, FaQuestionCircle, FaShoppingBasket } from 'react-icons/fa';
import { BsQrCodeScan } from 'react-icons/bs';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  faq: FaQuestionCircle,
  order: FaShoppingBasket,
  qr: BsQrCodeScan,
  calc:FaCalculator

};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const common = {
  id: 'faq',

  type: 'group',

  icon: icons.samplePage,
  children: [

    {
      id: 'user-profile',
      title: <FormattedMessage id="credits" />,
      type: 'item',
      link: '/orders',
      icon: icons.order,
      url: '/orders',
      breadcrumbs: true

    },
    {
      id: 'FAQ',
      title: <FormattedMessage id="faq" />,
      type: 'item',
      url: '/faq',
      icon: icons.faq,
      breadcrumbs: false

    },
    {
      id: 'qr',
      title: <FormattedMessage id="qr" />,
      type: 'item',
      url: '/qr',
      icon: icons.qr,
      breadcrumbs: false
    },
    {
      id: 'calculator',
      title: <FormattedMessage id="calculator" />,
      type: 'item',
      url: '/calculator',
      icon: icons.calc,
      breadcrumbs: false

    }
  ]
};

export default common;
