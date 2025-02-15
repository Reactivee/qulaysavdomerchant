
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const PrivateRoute = ({children}) => {
  const { isLoggedIn } = useAuth();
  console.log('asd');



  // const {token, user} = useSelector((state) => state.auth);
  const serviceToken = window.localStorage.getItem('serviceToken');
  console.log(serviceToken);
  const history = useLocation();
  const navigate = useNavigate();
  // if (serviceToken) {
  //   navigate('dashboard');
  // } else {
  //   navigate('/login');
  // }
  return children;

};

export default PrivateRoute;
