import { useEffect, useRef, useState } from 'react';

export function useActive(timeout: any) {
    const [active, setActive]: any = useState(false);
    const timer: any = useRef();
    const events = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];

    useEffect(() => {
        const handleEvent = () => {
            setActive(true);
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
            timer.current = window.setTimeout(() => {
                setActive(false);
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
    return active;
}
