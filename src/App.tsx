import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalRoutes } from './Pages/GlobalRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HOME_COLOR } from './Data/ColorConstant';
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div
                className="App"
                style={{
                    background: HOME_COLOR.OUTER,
                }}
            >
                <Router>
                    <GlobalRoutes />
                </Router>
                <ToastContainer />
            </div>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
