import { useState, useEffect } from 'react';

export function useSavedItems(storageKey) {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setSavedItems(JSON.parse(stored));
    }
  }, [storageKey]);

  const toggleItem = (id) => {
    setSavedItems((prev) => {
      const updated = prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id];
      
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  return { savedItems, toggleItem };
}