import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from '~/redux/store.js';
import { persistor } from '~/redux/store';
import { OrderProvider, UserProvider } from '~/context';
import { ToastProvider } from '~/context';
import PropTypes from 'prop-types';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Providers({ children }) {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return (
        <Provider store={store}>
            <UserProvider>
                <GoogleOAuthProvider clientId={clientId}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ToastProvider>
                            <OrderProvider>{children}</OrderProvider>
                        </ToastProvider>
                    </PersistGate>
                </GoogleOAuthProvider>
            </UserProvider>
        </Provider>
    );
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;
