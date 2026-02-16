import ImageGallery from './ImageGallery';
import VideoPlayer from './VideoPlayer';

export default function ResultsSection({ results }) {
  if (!results || !results.results) {
    return null;
  }

  const { images, video } = results.results;
  const hasImages = images && images.length > 0;
  const hasVideo = video !== null;

  if (!hasImages && !hasVideo) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Results</h2>
        <span className="text-sm text-gray-500">
          Generated in {results.processingTime}s
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hasImages && (
          <div className="lg:col-span-2">
            <ImageGallery images={images} timestamp={results.timestamp} />
          </div>
        )}

        {hasVideo && (
          <div className="lg:col-span-2">
            <VideoPlayer videoUrl={video} timestamp={results.timestamp} />
          </div>
        )}
      </div>
    </div>
  );
}
