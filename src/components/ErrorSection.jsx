import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorSection({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 animate-fade-in">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Generation Failed
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
