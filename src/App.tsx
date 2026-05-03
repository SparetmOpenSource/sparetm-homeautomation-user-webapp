import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.css';
import { GlobalRoutes } from './core/router/globalroutes/globalroutes';
import { ThemeProvider } from './core/router/themeprovider';
import { useAppDispatch, useAppSelector } from './core/store/reduxhooks';
import {
    BACKGROUND_BLINK_SETTING,
    BLINK_NOTIFICATIONS_ENABLED_KEY,
    NOTIFICATION_POSITION_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY,
} from './data/constants';
import { resetBlink } from './features/notifications/store/blink/blinkslice';
import { WebSocketProvider } from './features/websocket/context/websocketcontext';
import useBlink from './hooks/useblink';
import useLocalStorage from './hooks/uselocalstorage';
import { setNotificationConfig } from './utils/notificationconfig';

function App() {
    const [backgroundColor, setBackgroundColor] = useState<string>('black');
    const blinkTrigger = useAppSelector((state) => state.blink.trigger);
    const blinkColor = useAppSelector((state) => state.blink.color);
    const { startBlink } = useBlink(200, blinkColor, setBackgroundColor, 2);
    const dispatch = useAppDispatch();
    const [blinkNotificationsEnabled] = useLocalStorage(BLINK_NOTIFICATIONS_ENABLED_KEY, false);
    const [notificationSoundsEnabled] = useLocalStorage(NOTIFICATION_SOUNDS_ENABLED_KEY, true);
    const [notificationPosition] = useLocalStorage(NOTIFICATION_POSITION_KEY, 'bottom-right');
    const [blinkSettings] = useLocalStorage(BACKGROUND_BLINK_SETTING, {
        SUCCESS: true,
        ERROR: true,
        WARNING: false,
        INFO: false,
    });

    useEffect(() => {
        setNotificationConfig({
            soundEnabled: notificationSoundsEnabled,
            position: notificationPosition,
            blinkSettings: blinkSettings
        });
    }, [notificationSoundsEnabled, notificationPosition, blinkSettings]);

    useEffect(() => {
        if (blinkTrigger) {
            if (blinkNotificationsEnabled) {
                startBlink();
            }
            dispatch(resetBlink());
        }
    }, [blinkTrigger, startBlink, dispatch, blinkNotificationsEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Router>
            <ThemeProvider>
                <div
                    className="app"
                    style={{
                        background: backgroundColor,
                    }}
                >
                    <WebSocketProvider>
                        <GlobalRoutes />
                    </WebSocketProvider>
                </div>
            </ThemeProvider>
            {/* <CubeMonitor/> */}
        </Router>
    );
}

export default App;
