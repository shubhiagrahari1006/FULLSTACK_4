import { useEffect, useState } from 'react';

/**
 * Syncs a React state value with browser localStorage safely.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore storage quota or private mode failures gracefully
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
