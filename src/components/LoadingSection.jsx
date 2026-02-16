import { Loader2 } from 'lucide-react';

export default function LoadingSection({ progress, currentStep }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />

        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{currentStep}</span>
            <span className="text-sm font-semibold text-primary-600">{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out shimmer"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Please wait while we generate your content...
          </p>
          <p className="text-xs text-gray-400 mt-1">
            This may take up to 60 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
