import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for asynchronous data fetching with lifecycle and abort management.
 * @param {string|Function} urlOrFetcher - URL string or an async fetcher function
 * @param {object} options - Options including immediate execution flag and default data
 */
export function useFetch(urlOrFetcher, options = {}) {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (...args) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      let result;
      if (typeof urlOrFetcher === 'function') {
        result = await urlOrFetcher(...args, { signal: abortControllerRef.current.signal });
      } else if (typeof urlOrFetcher === 'string') {
        const response = await fetch(urlOrFetcher, { signal: abortControllerRef.current.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        result = await response.json();
      } else {
        throw new Error('Invalid fetcher provided to useFetch');
      }

      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was aborted, don't update state
      }
      setError(err.message || 'An error occurred while fetching data');
      setLoading(false);
      throw err;
    }
  }, [urlOrFetcher]);

  useEffect(() => {
    if (immediate && urlOrFetcher) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, execute, urlOrFetcher]);

  return { data, loading, error, refetch: execute, setData };
}

export default useFetch;
