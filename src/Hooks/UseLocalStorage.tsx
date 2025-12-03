import { useState, useEffect, useCallback, useRef } from 'react';

// --- Standalone Storage Utilities (Exported for use in helpers) ---

/**
 * Removes an item from localStorage and dispatches a 'local-storage' event
 */
export const removeItem = (key: string) => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new Event('local-storage'));
    }
};

/**
 * Sets an item in localStorage and dispatches a 'local-storage' event
 */
export const setItem = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event('local-storage'));
    }
};

/**
 * Gets an item from localStorage
 */
export const getItem = (key: string) => {
    if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        try {
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return null;
        }
    }
    return null;
};

// --- Hook Implementation ---

/**
 * Hook to persist state in local storage.
 * use like ->   const [settings, setSettings] = useLocalStorage('user-settings', { theme: 'light' });
 *...............setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
 *...............settings.theme
 * @param key The key to store the value under in local storage.
 * @param initialValue The initial value to use if no value is found in local storage.
 * @returns A tuple containing the stored value and a function to update it.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Use a ref to store the initial value to avoid re-running the effect
  // when initialValue changes (mimicking useState behavior)
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  // Get from local storage then
  // parse stored json or if none return initialValue
  const readValue = useCallback((): T => {
    const item = getItem(key);
    return item !== null ? (item as T) : initialValueRef.current;
  }, [key]); // Only re-create if key changes

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      setItem(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | Event) => {
      // Update if:
      // 1. It's a storage event from another tab for this key
      // 2. It's a custom 'local-storage' event from this tab (to sync hooks)
      if (
          (event instanceof StorageEvent && event.key === key) ||
          (event.type === 'local-storage')
      ) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, readValue]);

  const removeValue = useCallback(() => {
    try {
      removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
