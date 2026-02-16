import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Header from './components/Header';
import QuickStats from './components/QuickStats';
import InputForm from './components/InputForm';
import LoadingSection from './components/LoadingSection';
import ResultsSection from './components/ResultsSection';
import ErrorSection from './components/ErrorSection';
import HistoryPanel from './components/HistoryPanel';
import { generateContent } from './utils/api';
import { validateInputs } from './utils/validation';
import { getHistory, getStats, saveToHistory, updateStats, deleteHistoryItem, clearHistory } from './utils/storage';

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalGenerations: 0,
    averageTime: 0,
    totalVideos: 0,
    successRate: 100,
    lastGeneration: null,
    todayGenerations: 0
  });
  const [lastFormData, setLastFormData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedHistory = getHistory();
    const loadedStats = getStats();
    setHistory(loadedHistory);
    setStats(loadedStats);
  };

  const handleProgressUpdate = (progressValue, step) => {
    setProgress(progressValue);
    if (step) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async (formData) => {
    const validation = validateInputs(formData);

    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setLoading(true);
    setProgress(0);
    setCurrentStep('Starting...');
    setError(null);
    setResults(null);
    setLastFormData(formData);

    try {
      const result = await generateContent(formData, handleProgressUpdate);

      if (result.status === 'success') {
        setResults(result);
        saveToHistory(result);
        const newStats = updateStats(
          result.processingTime,
          formData.generateVideo,
          true
        );
        setStats(newStats);
        setHistory(getHistory());
        toast.success('Content generated successfully!');
      } else {
        setError(result.error);
        saveToHistory(result);
        updateStats(result.processingTime, formData.generateVideo, false);
        setHistory(getHistory());
        toast.error('Generation failed');
      }
    } catch (err) {
      setError(err.message);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
      setProgress(0);
      setCurrentStep('');
    }
  };

  const handleRetry = () => {
    if (lastFormData) {
      handleSubmit(lastFormData);
    }
  };

  const handleDeleteHistoryItem = (id) => {
    deleteHistoryItem(id);
    const newHistory = getHistory();
    setHistory(newHistory);
    const newStats = updateStats(0, false, true);
    setStats(newStats);
    toast.success('Item deleted');
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
      setStats({
        totalGenerations: 0,
        averageTime: 0,
        totalVideos: 0,
        successRate: 100,
        lastGeneration: null,
        todayGenerations: 0
      });
      toast.success('History cleared');
    }
  };

  const handleHistoryItemClick = (item) => {
    if (item.status === 'success') {
      setResults(item);
      setError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <InputForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {loading && (
              <LoadingSection progress={progress} currentStep={currentStep} />
            )}

            {error && !loading && (
              <ErrorSection error={error} onRetry={handleRetry} />
            )}

            {results && !loading && !error && (
              <ResultsSection results={results} />
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <QuickStats stats={stats} />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <HistoryPanel
                history={history}
                onDeleteItem={handleDeleteHistoryItem}
                onClearAll={handleClearAllHistory}
                onItemClick={handleHistoryItemClick}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">
              Prototipal Content Generator v1.0.0
            </p>
            <p className="text-sm text-gray-500 mt-2 sm:mt-0">
              Powered by AI - Transform your Shopify products
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
