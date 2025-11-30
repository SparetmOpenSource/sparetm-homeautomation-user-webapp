import { useEffect, useRef } from 'react';

/**
 * @param {any} state - The state whose changes trigger the function.
 * @param {Function} callback - The function to be triggered.
 * @param {number} n - Number of times to trigger the function.
 * @param {boolean} active - Flag to control whether the hook is active.
 */
export function useTrigger(
    state: any,
    callback: () => any,
    n: number,
    active: boolean,
) {
    const prevStateRef = useRef<any>(state);

    useEffect(() => {
        if (!active || n <= 0) return;
        if (prevStateRef.current !== state) {
            for (let i = 0; i < n; i++) {
                setTimeout(() => {
                    callback();
                }, i * 0);
            }
            prevStateRef.current = state;
        }
    }, [state, callback, n, active]);
}
