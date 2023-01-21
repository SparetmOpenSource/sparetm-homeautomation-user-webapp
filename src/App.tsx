import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import GlobalRoutes from './Components/Others/GlobalRoutes';
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App" style={{ background: '#1F2123' }}>
                <Router>
                    <GlobalRoutes />
                </Router>
            </div>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
