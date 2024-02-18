import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalRoutes } from './Pages/GlobalRoutes';
import { NotificationColor } from './Data/Constants';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import { createContext, useState } from 'react';
const queryClient = new QueryClient();
//const appContext = createContext();

function App() {
  // const [backgroundColor, setBackgroundColor] = useState('black');
  //   const handleCallbackForBackgroundColor = (childData:any) => {
  //       setBackgroundColor(childData);
  //   };
// {()=>displayToastify('hello shubham',TOASTIFYCOLOR.DARK,TOASTIFYSTATE.INFO)}  'rgb(8, 18, 41)' NotificationColor
  return (
    <QueryClientProvider client={queryClient}>
          {/* <appContext.Provider value={{backgroundColor,handleCallbackForBackgroundColor}}> */}
            <div className="App" style={{ background: NotificationColor}}>
                <Router>
                    <GlobalRoutes />
                </Router>
               <ToastContainer/>
        </div>
        {/* </appContext.Provider> */}
       <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
  );
}

export default App;
// export {appContext}
