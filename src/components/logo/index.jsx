import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import useAuth from 'hooks/useAuth';
import { APP_DEFAULT_PATH } from 'config';
import logo from '../../../src/assets/images/logo.png';
import dark from '../../../src/assets/images/logo_dark.svg';
import { useTheme } from '@mui/material/styles';
// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }) {
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  return (
    <ButtonBase disableRipple {...(isLoggedIn && { component: Link, to: !to ? APP_DEFAULT_PATH : to, sx })}>
      {/*{isIcon ? <LogoIcon /> : <Logo />}*/}
      {theme.palette.mode === 'light' ? <img src={logo} width={`${isIcon ? '50px' : '120px'}`} alt="logo" /> :
        <img src={dark} width={`${isIcon ? '50px' : '120px'}`} alt="logo" />}

    </ButtonBase>
  );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
