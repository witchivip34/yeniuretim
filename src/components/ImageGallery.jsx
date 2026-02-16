import { Download, Copy, ExternalLink } from 'lucide-react';
import { copyToClipboard, downloadFile, generateFilename } from '../utils/helpers';

export default function ImageGallery({ images, timestamp }) {
  if (!images || images.length === 0) {
    return null;
  }

  const handleDownload = (url, index) => {
    const filename = generateFilename('image', index + 1, timestamp);
    const extension = url.split('.').pop().split('?')[0];
    downloadFile(url, `${filename}.${extension}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        Generated Images ({images.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div
            key={index}
            className="group relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              src={url}
              alt={`Generated ${index + 1}`}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(url, index)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => copyToClipboard(url, 'Image URL')}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Copy URL"
                >
                  <Copy className="w-5 h-5 text-gray-700" />
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
