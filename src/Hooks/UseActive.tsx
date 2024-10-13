import { useEffect, useRef, useState } from 'react';

export function useActive(timeout: any, isActive: boolean) {
    const [status, setStatus]: any = useState(false);
    const timer: any = useRef();
    const events = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];

    useEffect(() => {
        const handleEvent = () => {
            setStatus(true);
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
            timer.current = window.setTimeout(() => {
                setStatus(false);
            }, timeout);
        };

        events.forEach((event) => {
            document.addEventListener(event, handleEvent);
        });
        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, handleEvent);
            });
        };
    }, [timeout]); // eslint-disable-line react-hooks/exhaustive-deps
    return [status, isActive];
}
