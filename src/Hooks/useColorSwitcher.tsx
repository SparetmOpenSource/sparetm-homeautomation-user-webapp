import { useState, useEffect } from 'react';

/**
 * Custom hook to alternate the color between black and green 3 times
 * at an interval of 180 milliseconds.
 * @param interval - Time in milliseconds between color changes.
 * @param times - Number of times to alternate the color.
 */
const useColorSwitcher = (interval: number, times: number, setColor: any) => {
    const [count, setCount] = useState<number>(0); // Track number of changes

    useEffect(() => {
        // Exit if `times` is less than or equal to 0
        if (times <= 0) return;

        // Interval ID to clear later
        const intervalId = setInterval(() => {
            setColor((prevColor: any) => {
                // Toggle color
                const newColor = prevColor === 'black' ? 'green' : 'black';
                setCount((prevCount) => {
                    // Stop interval after 3 color changes (6 toggles)
                    if (prevCount + 1 >= times * 2) {
                        clearInterval(intervalId);
                    }
                    return prevCount + 1;
                });
                return newColor;
            });
        }, interval);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [interval, times]);

    return { count };
};

export default useColorSwitcher;
