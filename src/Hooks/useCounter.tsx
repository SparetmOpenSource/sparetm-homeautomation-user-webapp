import { useState, useEffect, useRef } from 'react';

// **********************used in signIn/signUp page*********************** //
export function useCounter(loop_len: number, interval: number) {
    const [count, setCount] = useState(0); 
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (loop_len <= 0 || interval <= 0) {
            return;
        }

        const runCounter = () => {
            setCount((prevCount) => (prevCount + 1) % loop_len);
        };

        intervalRef.current = setInterval(runCounter, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };

    }, [loop_len, interval]);

    return { count };
}
