import { Download, Copy, ExternalLink } from 'lucide-react';
import { copyToClipboard, downloadFile, generateFilename } from '../utils/helpers';

export default function VideoPlayer({ videoUrl, timestamp }) {
  if (!videoUrl) {
    return null;
  }

  const handleDownload = () => {
    const filename = generateFilename('video', 1, timestamp);
    downloadFile(videoUrl, `${filename}.mp4`);
  };

  return (
    <div className="space-y-4 animate-scale-in">
      <h3 className="text-lg font-semibold text-gray-900">Lifestyle Video</h3>

      <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        <video
          src={videoUrl}
          controls
          loop
          className="w-full h-auto"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button
          onClick={() => copyToClipboard(videoUrl, 'Video URL')}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Copy URL</span>
        </button>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open</span>
        </a>
      </div>
    </div>
  );
}
