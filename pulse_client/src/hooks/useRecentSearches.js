import { useState, useEffect } from 'react';

export function useRecentSearches() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('pulse_recent_searches');
    if (stored) setSearches(JSON.parse(stored));
  }, []);

  const addSearch = (query) => {
    if (!query || query.trim() === '') return;
    const updated = [query, ...searches.filter(s => s !== query)].slice(0, 4);
    setSearches(updated);
    localStorage.setItem('pulse_recent_searches', JSON.stringify(updated));
  };

  return { searches, addSearch };
}