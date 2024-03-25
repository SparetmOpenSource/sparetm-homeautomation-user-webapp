import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalRoutes } from './Pages/GlobalRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import { getNotificationColor, setNotificationColor } from './Utils/HelperFn';
// import { useEffect, useState } from 'react';
// import { NOTIFICATIONCOLORKEY } from './Data/Constants';
// import { createContext, useState } from 'react';
const queryClient = new QueryClient();
//const appContext = createContext();

function App() {
    // const [backgroundColor, setBackgroundColor] = useState();

    // useEffect(() => {
    //     setNotificationColor('rgb(46,52,56)'); // rgb(46,52,56);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     setBackgroundColor(getNotificationColor());
    // }, [localStorage.getItem(NOTIFICATIONCOLORKEY)]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <QueryClientProvider client={queryClient}>
            {/* <appContext.Provider value={{backgroundColor,handleCallbackForBackgroundColor}}> */}
            <div
                className="App"
                style={{
                    background: 'rgb(46,52,56)',
                }}
            >
                <Router>
                    <GlobalRoutes />
                </Router>
                <ToastContainer />
            </div>
            {/* </appContext.Provider> */}
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
// export {appContext}
