import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import GlobalRoutes from './Components/Others/GlobalRoutes';
//import ProfileConfig from './Pages/ProfileConfig';
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App" style={{ background: '#1F2123' }}>
                <Router>
                    <GlobalRoutes />
                </Router>
                {/* <ProfileConfig/> */}
            </div>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
