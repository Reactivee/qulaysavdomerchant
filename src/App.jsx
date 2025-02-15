import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { CLientProvider } from './contexts/ClientContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { ContractProvider } from './contexts/ContractContext';
import { StoreProvider } from './contexts/StoreContext';
// import Customization from './components/Customization';
import './index.css';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //


export default function App() {
  return (
    <ThemeCustomization>
      <Locales>
        <ScrollTop>
          <AuthProvider>
            <CLientProvider>
              <OrdersProvider>
                <ContractProvider>
                  <StoreProvider>
                    <Notistack>
                      <RouterProvider router={router} />
                      {/*<Customization />*/}
                      <Snackbar />
                    </Notistack>
                  </StoreProvider>
                </ContractProvider>
              </OrdersProvider>
            </CLientProvider>
          </AuthProvider>
        </ScrollTop>
      </Locales>
    </ThemeCustomization>
  );
}
