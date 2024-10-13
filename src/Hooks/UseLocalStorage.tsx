import { useEffect, useState } from 'react';

export function useGetItem(key: string | null) {
    const [items, setItems] = useState<string | null>(null);
    useEffect(() => {
        if (key === null) {
            setItems(null);
            return;
        }
        const storedItem = localStorage.getItem(key);
        if (storedItem) {
            try {
                const item = JSON.parse(storedItem);

                if (typeof item === 'string') {
                    setItems(item);
                } else {
                    console.warn('Stored item is not a string');
                    setItems(null);
                }
            } catch (error) {
                console.error('Error parsing JSON from localStorage', error);
                setItems(null);
            }
        } else {
            setItems(null);
        }
    }, [key]);

    return items;
}

export function useSetItem(key: string | null, value: string | null) {
    useEffect(() => {
        if (key !== null && value !== null) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);
}

export function useRemoveItem(key: string | null) {
    useEffect(() => {
        if (key !== null) {
            localStorage.removeItem(key);
        }
    }, [key]);
}

export function useClearItem() {
    useEffect(() => {
        localStorage.clear();
    }, []);
}
