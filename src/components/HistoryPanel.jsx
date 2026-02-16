import { History, Trash2 } from 'lucide-react';
import HistoryCard from './HistoryCard';

export default function HistoryPanel({ history, onDeleteItem, onClearAll, onItemClick }) {
  if (history.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Recent History
          </h2>
        </div>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No history yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Your generated content will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <History className="w-5 h-5 mr-2" />
          Recent History
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {history.slice(0, 10).map((item) => (
          <HistoryCard
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
