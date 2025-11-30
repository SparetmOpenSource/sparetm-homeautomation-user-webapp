import { useEffect, useState, useRef } from 'react';

/**
 * To track user activity while this web app opened
 * how to use ->  const isActive = useUserActivity({timeout: 5000,enabled: true,onActive: closeScreenSaver,onInactive: addScreenSaver});
 * @param {number} timeout - Inactivity timeout in milliseconds (5 minutes = 5 * 60 * 1000)
 * @param {Function} onActive - Callback when user becomes active
 * @param {Function} onInactive -Callback when user becomes inactive
 * @param {boolean} enabled -  Enable or disable activity tracking
 */

type UseUserActivityOptions = {
    timeout?: number;
    onActive?: () => void;
    onInactive?: () => void;
    enabled?: boolean;
};

export function useUserActivity({
    timeout,
    onActive,
    onInactive,
    enabled = true,
}: UseUserActivityOptions = {}) {
    const [isActive, setIsActive] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // --- Mark user inactive
    const markInactive = () => {
        setIsActive((prev) => {
            if (prev) {
                onInactive?.();
                return false;
            }
            return prev;
        });
    };

    // --- Reset timer & mark active
    const handleActivity = () => {
        setIsActive((prev) => {
            if (!prev) onActive?.();
            return true;
        });

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(markInactive, timeout);
    };

    useEffect(() => {
        if (!enabled) {
            if (timerRef.current) clearTimeout(timerRef.current);
            setIsActive(true); // reset to active when disabled
            return;
        }

        const events = [
            'mousemove',
            'mousedown',
            'keydown',
            'scroll',
            'touchstart',
            'wheel',
        ];

        events.forEach((e) => window.addEventListener(e, handleActivity));

        handleActivity(); // start immediately

        return () => {
            events.forEach((e) =>
                window.removeEventListener(e, handleActivity),
            );
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeout, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

    return isActive;
}
