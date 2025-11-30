import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook to alternate the color between black and green 4 times
 * at an interval of 180 milliseconds.
 * @param interval - Time in milliseconds between color changes.
 * @param times - Number of times to alternate the color.
 * use like ->     
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(setBlinkColor("red"));  
        dispatch(triggerBlink());

    };
 */

const useBlink = (
    interval: number,
    blinkColor: string,
    setColor: React.Dispatch<React.SetStateAction<string>>,
    blinks: number,
) => {
    const [trigger, setTrigger] = useState(false);
    const toggleCount = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isLocked = useRef(false); // 🔒 prevents quick re-triggers

    // ---- PUBLIC FUNCTION ----
    const startBlink = useCallback(() => {
        if (isLocked.current) return; // block rapid calls

        isLocked.current = true;
        setTrigger(true);
    }, []);

    useEffect(() => {
        if (!trigger) return;

        toggleCount.current = 0;
        setColor('black');

        const totalToggles = blinks * 2; // 4 blinks → 8 toggles

        intervalRef.current = setInterval(() => {
            toggleCount.current++;

            // toggle between black & dynamic color
            setColor((prev) => (prev === 'black' ? blinkColor : 'black'));

            // stop blinking after defined toggles
            if (toggleCount.current >= totalToggles) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setTrigger(false);

                // 🔓 release the cooldown AFTER blink finishes
                isLocked.current = false;
            }
        }, interval);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [trigger, interval, blinkColor, blinks, setColor]);

    return { startBlink };
};

export default useBlink;
