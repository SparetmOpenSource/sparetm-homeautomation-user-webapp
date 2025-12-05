import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './Pages/ThemeProvider';
import { useEffect, useState } from 'react';
import { GlobalRoutes } from './Pages/GlobalRoutes/GlobalRoutes';
import './App.css';
import useBlink from './Hooks/useBlink';
import { useAppDispatch, useAppSelector } from './Features/ReduxHooks';
import { resetBlink } from './Features/Blink/BlinkSlice';
import {
    BACKGROUND_BLINK_SETTING,
    BLINK_NOTIFICATIONS_ENABLED_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY,
    NOTIFICATION_POSITION_KEY,
} from './Data/Constants';
import useLocalStorage from './Hooks/UseLocalStorage';
import { WebSocketProvider } from './Context/WebSocketContext';
import { setNotificationConfig } from './Utils/NotificationConfig';

function App() {
    const [backgroundColor, setBackgroundColor] = useState<string>('black');
    const blinkTrigger = useAppSelector((state) => state.blink.trigger);
    const blinkColor = useAppSelector((state) => state.blink.color);
    const { startBlink } = useBlink(200, blinkColor, setBackgroundColor, 2);
    const dispatch = useAppDispatch();
    
    const [blinkNotificationsEnabled] = useLocalStorage(BLINK_NOTIFICATIONS_ENABLED_KEY, false);

    // Sync settings to global config for helper functions (MOVED FROM CoreApplication.tsx)
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
        <ThemeProvider>
            <div
                className="app"
                style={{
                    background: backgroundColor,
                }}
            >
                <Router>
                    <WebSocketProvider>
                        <GlobalRoutes />
                    </WebSocketProvider>
                </Router>
            </div>
        </ThemeProvider>      
    );
}

export default App;
