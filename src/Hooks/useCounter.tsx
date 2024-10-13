import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that runs a counter `n` times at `m` millisecond intervals and restarts the count.
 * @param {number} n - Number of times to run the counter before resetting.
 * @param {number} m - Interval in milliseconds between each execution.
 */
export function useCounter(n: number, m: number) {
    const [count, setCount] = useState(0); // Current execution count
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID

    useEffect(() => {
        if (n <= 0 || m <= 0) {
            // If `n` or `m` is invalid, do not set the interval
            return;
        }

        // Function to increment the counter
        const runCounter = () => {
            setCount((prevCount) => (prevCount + 1) % n); // Reset count to 0 after reaching `n`
        };

        // Set the interval
        intervalRef.current = setInterval(runCounter, m);

        // Cleanup function to clear the interval
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [n, m]); // Effect dependencies

    return { count };
}
