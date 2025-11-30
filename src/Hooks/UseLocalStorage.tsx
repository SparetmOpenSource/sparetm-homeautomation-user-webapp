import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook to persist state in local storage.
 * use like ->   const [settings, setSettings] = useLocalStorage('user-settings', { theme: 'light' });
 *...............setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
 *...............settings.theme
 * @param key The key to store the value under in local storage.
 * @param initialValue The initial value to use if no value is found in local storage.
 * @returns A tuple containing the stored value and a function to update it.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Use a ref to store the initial value to avoid re-running the effect
  // when initialValue changes (mimicking useState behavior)
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  // Get from local storage then
  // parse stored json or if none return initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValueRef.current;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValueRef.current;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValueRef.current;
    }
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
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch a custom event so other hooks in the same tab update
        window.dispatchEvent(new Event('local-storage'));
      }
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

  return [storedValue, setValue];
}

export default useLocalStorage;
