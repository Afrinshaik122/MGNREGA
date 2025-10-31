import { useState } from 'react';
import Header from './components/Header';
import SelectionForm from './components/SelectionForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Dashboard from './components/Dashboard';
import StatusBar from './components/StatusBar';
import { usePerformanceData } from './hooks/usePerformanceData';

export default function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const {
    loading,
    error,
    performanceData,
    dataSource,
    lastUpdated,
    fetchPerformance
  } = usePerformanceData();

  const handleSubmit = () => {
    if (selectedState && selectedDistrict) {
      fetchPerformance(selectedState, selectedDistrict);
    }
  };

  return (
    <>
      <Header />

      <SelectionForm
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        onStateChange={setSelectedState}
        onDistrictChange={setSelectedDistrict}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {loading && <LoadingSpinner />}

      {!loading && error && <ErrorMessage error={error} />}

      {!loading && !error && performanceData && (
        <>
          <Dashboard performanceData={performanceData} dataSource={dataSource} />
          <StatusBar lastUpdated={lastUpdated} dataSource={dataSource} />
        </>
      )}
    </>
  );
}
