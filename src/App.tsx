import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './Pages/ThemeProvider';
import { useEffect, useState } from 'react';
import { GlobalRoutes } from './Pages/GlobalRoutes/GlobalRoutes';
import './App.css';
import useBlink from './Hooks/useBlink';
import { useAppDispatch, useAppSelector } from './Features/ReduxHooks';
import { resetBlink } from './Features/Blink/BlinkSlice';
import { BACKGROUND_BLINK_SETTING } from './Data/Constants';
import useLocalStorage from './Hooks/UseLocalStorage';
import { WebSocketProvider } from './Context/WebSocketContext';

function App() {
    const [backgroundColor, setBackgroundColor] = useState<string>('black');
    const blinkTrigger = useAppSelector((state) => state.blink.trigger);
    const blinkColor = useAppSelector((state) => state.blink.color);
    const { startBlink } = useBlink(200, blinkColor, setBackgroundColor, 2);
    const dispatch = useAppDispatch();
    const [, setBackgroundBlinkSettings] = useLocalStorage(BACKGROUND_BLINK_SETTING, {
            SUCCESS: true,
            ERROR: true,
            WARNING: false,
            INFO: false,
        });

    useEffect(() => {
        setBackgroundBlinkSettings({
            SUCCESS: true,
            ERROR: true,
            WARNING: false,
            INFO: false,
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (blinkTrigger) {
            startBlink();
            dispatch(resetBlink());
        }
    }, [blinkTrigger, startBlink, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ThemeProvider>
            <WebSocketProvider>
                <div
                    className="app"
                    style={{
                        background: backgroundColor,
                    }}
                >
                    <Router>
                        <GlobalRoutes />
                    </Router>
                </div>
            </WebSocketProvider>
        </ThemeProvider>
    );
}

export default App;
