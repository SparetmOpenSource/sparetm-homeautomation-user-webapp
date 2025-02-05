import { useEffect } from 'react';

export const useRunOnce = (fn: any) => {
    useEffect(() => {
        fn();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
