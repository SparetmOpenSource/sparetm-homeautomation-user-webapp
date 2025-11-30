import { useState, useEffect } from 'react';

/**
 * To track window size (width, height) for this web app opened
 * to use -> const { width, height } = useWindowSize();
 */

export function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Trigger once immediately (in case hook mounts after resize)
        handleResize();

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}
