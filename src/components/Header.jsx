import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Prototipal Content Generator
              </h1>
              <p className="text-sm text-gray-500">
                AI-Powered Shopify Image & Video Creator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
