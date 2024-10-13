import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalRoutes } from './Pages/GlobalRoutes/GlobalRoutes';
import { ThemeProvider } from './Pages/ThemeProvider';
import { useCallback, useContext, useState } from 'react';
import { ColorNotificationContext } from './Hooks/UseContext';
import { colorNotificationStatus } from './Data/Constants';
import { getWebSocketUrl } from './Api.tsx/ProfileConfigApis';
import { addMqttInstanceUrl } from './Features/Device/DeviceSlice';
import { displayToastify } from './Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from './Data/Enum';
import { SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID } from './Data/QueryConstant';
import { useReactQuery_Get } from './Api.tsx/useReactQuery_Get';
import { useAppDispatch } from './Features/ReduxHooks';

// const queryClient = new QueryClient();

export function useColorNotification() {
    return useContext(ColorNotificationContext);
}

function App() {
    const dispatch = useAppDispatch();
    // useWebsocketReceiver(socketUrl);
    // const { sendMessage } = useWebsocketSender(socketUrl, toServerSocketTopic);
    // sendMessage({ msg: 'Hello, WebSocket!', headers: { priority: 'high' } });

    // const ddt = [
    //     {
    //         id: 'haskell',
    //         label: 'haskell',
    //         value: 480,
    //         color: 'hsl(252, 70%, 50%)',
    //     },
    //     {
    //         id: 'lisp',
    //         label: 'lisp',
    //         value: 166,
    //         color: 'hsl(263, 70%, 50%)',
    //     },
    //     {
    //         id: 'ruby',
    //         label: 'ruby',
    //         value: 360,
    //         color: 'hsl(13, 70%, 50%)',
    //     },
    //     {
    //         id: 'javascript',
    //         label: 'javascript',
    //         value: 464,
    //         color: 'hsl(191, 70%, 50%)',
    //     },
    //     {
    //         id: 'php',
    //         label: 'php',
    //         value: 8,
    //         color: 'rgb(0,0,0)',
    //     },
    // ];

    //--------------------//

    const webSocketUrlFn = () => {
        return getWebSocketUrl();
    };
    const on_WebSocket_Success = (data: any) => {
        dispatch(addMqttInstanceUrl(data?.data));
    };
    const on_WebSocket_Error = (error: any) => {
        displayToastify(
            error?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { isLoading } = useReactQuery_Get(
        SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID,
        webSocketUrlFn,
        on_WebSocket_Success,
        on_WebSocket_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );
    //---------------------//

    const [backgroundColor, setBackgroundColor] = useState<string>('black');
    const [enabled] = useState<boolean>(false);

    const handleColorNotificationChange = useCallback(
        (status: any) => {
            let statusCol = '';
            if (status === colorNotificationStatus[1]) {
                statusCol = 'rgb(251,90,90)';
            } else if (status === colorNotificationStatus[0]) {
                statusCol = 'rgb(105,188,52)';
            }
            if (!enabled) return;
            let colorSwitchCount = 0;
            const totalSwitches = 6;
            const intervalId = setInterval(() => {
                setBackgroundColor((prevColor: any) =>
                    prevColor === 'black' ? statusCol : 'black',
                );
                colorSwitchCount += 1;
                if (colorSwitchCount >= totalSwitches) {
                    clearInterval(intervalId);
                }
            }, 200);
        },
        [enabled],
    );

    // const data = useAppSelector((state: any) => state?.device?.updateDevice);

    // useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ColorNotificationContext.Provider
            value={handleColorNotificationChange}
        >
            <ThemeProvider>
                <div
                    className="App"
                    style={{
                        background: backgroundColor,
                    }}
                >
                    <Router>{!isLoading && <GlobalRoutes />}</Router>
                    {/* <Pie data={ddt} fontColor="white" /> */}
                    {/* <ColorPicker/> */}
                </div>
            </ThemeProvider>
        </ColorNotificationContext.Provider>
    );
}

export default App;
