import { useMemo } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
// project-imports

import Profile from './Profile';
import Localization from './Localization';
import MobileSection from './MobileSection';
import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import SwitchTheme from './SwitchTheme';
import Support from './Support';
import Stack from '@mui/material/Stack';
import { useGetUser } from '../../../../api/user';
import CompanyName from './Search';

// ==============================|| HEADER - CONTENT ||============================== //


export default function HeaderContent() {
  const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localization = useMemo(() => <Localization />, [i18n]);

  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      <Stack direction="row" alignItems="center" justifyContent="end" sx={{ width: '100%' }}>
        {<CompanyName />}

        {/*{!downLG && megaMenu}*/}
        <Support />
        <SwitchTheme />
        {!downLG && localization}
        {/*{downLG && <Box sx={{ width: '100%', ml: 1 }} />}*/}
        {/*<Notification />*/}
        {/*<FullScreen />*/}
        {/*<Message />*/}

        {!downLG && <Profile />}
        {downLG && <MobileSection />}
      </Stack>
    </>
  );
}


