import { useState, useEffect } from 'react';
import { Image, Key, Mail, Sparkles, AlertCircle } from 'lucide-react';
import { validateImageUrl, validateApiKey, validateEmail } from '../utils/validation';
import { loadApiKey, saveApiKey } from '../utils/storage';

export default function InputForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    imageUrl: '',
    apiKey: '',
    email: '',
    generateVideo: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const savedApiKey = loadApiKey();
    if (savedApiKey) {
      setFormData(prev => ({ ...prev, apiKey: savedApiKey }));
    }
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'apiKey' && value) {
      saveApiKey(value);
    }

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let validation;

    switch (field) {
      case 'imageUrl':
        validation = validateImageUrl(value);
        break;
      case 'apiKey':
        validation = validateApiKey(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      default:
        return;
    }

    setErrors(prev => ({
      ...prev,
      [field]: validation.valid ? null : validation.error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {
      imageUrl: true,
      apiKey: true,
      email: true
    };
    setTouched(allTouched);

    const urlValidation = validateImageUrl(formData.imageUrl);
    const apiKeyValidation = validateApiKey(formData.apiKey);
    const emailValidation = validateEmail(formData.email);

    const newErrors = {
      imageUrl: urlValidation.valid ? null : urlValidation.error,
      apiKey: apiKeyValidation.valid ? null : apiKeyValidation.error,
      email: emailValidation.valid ? null : emailValidation.error
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== null);

    if (!hasErrors) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Input Form</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Image className="w-4 h-4 inline mr-2" />
          Shopify Image URL
        </label>
        <input
          type="text"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          onBlur={() => handleBlur('imageUrl')}
          placeholder="https://cdn.shopify.com/product-image.jpg"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
            errors.imageUrl && touched.imageUrl
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.imageUrl && touched.imageUrl && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.imageUrl}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 inline mr-2" />
          Prototipal API Key
        </label>
        <input
          type="password"
          value={formData.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          onBlur={() => handleBlur('apiKey')}
          placeholder="Enter your API key"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
            errors.apiKey && touched.apiKey
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.apiKey && touched.apiKey && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.apiKey}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 inline mr-2" />
          Email (optional)
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="your@email.com"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
            errors.email && touched.email
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="generateVideo"
          checked={formData.generateVideo}
          onChange={(e) => handleChange('generateVideo', e.target.checked)}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          disabled={loading}
        />
        <label htmlFor="generateVideo" className="ml-2 text-sm text-gray-700">
          Generate Video Too
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5" />
        <span>{loading ? 'Generating...' : 'Generate Content'}</span>
      </button>
    </form>
  );
}
