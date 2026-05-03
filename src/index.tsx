import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';
import { setAppTokenProvider } from './core/api/axios';
import { setProfileIdProvider } from './features/auth/utils/authhelpers';
import { persistor, store } from './core/store/store';
import './index.css';
import reportWebVitals from './reportwebvitals';

setAppTokenProvider(() => store.getState().user.token);
setProfileIdProvider(() => store.getState().user.profileId);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position="bottom-right"
                    />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
