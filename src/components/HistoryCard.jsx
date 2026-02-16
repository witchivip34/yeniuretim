import { CheckCircle, XCircle, Trash2, Clock, Image, Video } from 'lucide-react';
import { formatTimestamp } from '../utils/helpers';

export default function HistoryCard({ item, onDelete, onClick }) {
  const isSuccess = item.status === 'success';

  return (
    <div
      onClick={() => onClick(item)}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 rounded-lg ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
            {isSuccess ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.input.imageUrl.length > 40
                ? item.input.imageUrl.substring(0, 40) + '...'
                : item.input.imageUrl}
            </p>

            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatTimestamp(item.timestamp)}
              </span>
              {isSuccess && item.results && (
                <>
                  {item.results.images && item.results.images.length > 0 && (
                    <span className="flex items-center">
                      <Image className="w-3 h-3 mr-1" />
                      {item.results.images.length}
                    </span>
                  )}
                  {item.results.video && (
                    <span className="flex items-center">
                      <Video className="w-3 h-3 mr-1" />
                      1
                    </span>
                  )}
                </>
              )}
            </div>

            {!isSuccess && item.error && (
              <p className="text-xs text-red-600 mt-1 truncate">
                {item.error}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
