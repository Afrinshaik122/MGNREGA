import { useState } from 'react';

export function usePerformanceData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPerformance = async (state, district) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/performance?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`
      );

      if (response.ok) {
        const result = await response.json();
        setPerformanceData(result.data);
        setDataSource(result.dataSource);
        setLastUpdated(result.lastUpdated);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Unable to fetch data. Please try again later.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    performanceData,
    dataSource,
    lastUpdated,
    fetchPerformance
  };
}
