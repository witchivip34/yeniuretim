export const validateImageUrl = (url) => {
  if (!url || url.trim() === '') {
    return { valid: false, error: 'Image URL is required' };
  }

  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    return { valid: false, error: 'URL must start with https:// or http://' };
  }

  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const hasValidExtension = validExtensions.some(ext =>
    url.toLowerCase().includes(ext)
  );

  if (!hasValidExtension) {
    return {
      valid: false,
      error: 'URL must contain a valid image extension (.jpg, .png, .webp, .gif)'
    };
  }

  try {
    new URL(url);
    return { valid: true, error: null };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
};

export const validateApiKey = (key) => {
  if (!key || key.trim() === '') {
    return { valid: false, error: 'API Key is required' };
  }

  if (key.length < 10) {
    return { valid: false, error: 'API Key must be at least 10 characters long' };
  }

  return { valid: true, error: null };
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: true, error: null };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true, error: null };
};

export const validateInputs = (formData) => {
  const urlValidation = validateImageUrl(formData.imageUrl);
  if (!urlValidation.valid) {
    return urlValidation;
  }

  const apiKeyValidation = validateApiKey(formData.apiKey);
  if (!apiKeyValidation.valid) {
    return apiKeyValidation;
  }

  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    return emailValidation;
  }

  return { valid: true, error: null };
};
