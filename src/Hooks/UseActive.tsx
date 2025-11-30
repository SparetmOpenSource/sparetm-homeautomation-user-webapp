import { useEffect, useRef, useState } from 'react';

/*used in Pages/Home/Home.tsx */
export function useActive(timeout: any, isActive: boolean, events:any) {
    const [status, setStatus]: any = useState(false);
    const timer: any = useRef();

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
        events.forEach((event:any) => {
            document.addEventListener(event, handleEvent);
        });
        return () => {
            events.forEach((event:any) => {
                document.removeEventListener(event, handleEvent);
            });
        };
    }, [timeout]); // eslint-disable-line react-hooks/exhaustive-deps
    return [status, isActive];
}
