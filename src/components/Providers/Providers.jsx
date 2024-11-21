import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from '~/redux/store.js';
import { persistor } from '~/redux/store';
import { OrderProvider } from '~/context';
import { ToastProvider } from '~/context';

function Providers({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastProvider>
                    <OrderProvider>{children}</OrderProvider>
                </ToastProvider>
            </PersistGate>
        </Provider>
    );
}

export default Providers;
