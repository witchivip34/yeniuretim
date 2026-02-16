export const STORAGE_KEYS = {
  API_KEY: 'prototipal_api_key',
  HISTORY: 'prototipal_history',
  STATS: 'prototipal_stats'
};

export const saveApiKey = (key) => {
  try {
    const encoded = btoa(key);
    localStorage.setItem(STORAGE_KEYS.API_KEY, encoded);
    return true;
  } catch (error) {
    console.error('Failed to save API key:', error);
    return false;
  }
};

export const loadApiKey = () => {
  try {
    const encoded = localStorage.getItem(STORAGE_KEYS.API_KEY);
    return encoded ? atob(encoded) : '';
  } catch (error) {
    console.error('Failed to load API key:', error);
    return '';
  }
};

export const saveToHistory = (result) => {
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    history.unshift(result);
    const trimmed = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
    return true;
  } catch (error) {
    console.error('Failed to save to history:', error);
    return false;
  }
};

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
};

export const deleteHistoryItem = (id) => {
  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete history item:', error);
    return false;
  }
};

export const clearHistory = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
};

export const getStats = () => {
  try {
    const defaultStats = {
      totalGenerations: 0,
      averageTime: 0,
      totalVideos: 0,
      successRate: 100,
      lastGeneration: null,
      todayGenerations: 0
    };
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS) || JSON.stringify(defaultStats));
  } catch (error) {
    console.error('Failed to get stats:', error);
    return {
      totalGenerations: 0,
      averageTime: 0,
      totalVideos: 0,
      successRate: 100,
      lastGeneration: null,
      todayGenerations: 0
    };
  }
};

export const updateStats = (processingTime, hasVideo, isSuccess = true) => {
  try {
    const stats = getStats();
    const history = getHistory();

    const totalSuccessful = history.filter(h => h.status === 'success').length;
    const totalFailed = history.filter(h => h.status === 'failed').length;
    const totalAttempts = totalSuccessful + totalFailed;

    const successfulItems = history.filter(h => h.status === 'success' && h.processingTime);
    const avgTime = successfulItems.length > 0
      ? successfulItems.reduce((sum, h) => sum + h.processingTime, 0) / successfulItems.length
      : 0;

    const totalVideos = history.filter(h => h.status === 'success' && h.results?.video).length;

    const today = new Date().toDateString();
    const todayGenerations = history.filter(h => {
      const itemDate = new Date(h.timestamp).toDateString();
      return itemDate === today && h.status === 'success';
    }).length;

    const newStats = {
      totalGenerations: totalSuccessful,
      averageTime: Math.round(avgTime * 10) / 10,
      totalVideos,
      successRate: totalAttempts > 0 ? Math.round((totalSuccessful / totalAttempts) * 100) : 100,
      lastGeneration: new Date().toISOString(),
      todayGenerations
    };

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.error('Failed to update stats:', error);
    return getStats();
  }
};
