import { nanoid } from 'nanoid';

const API_URL = 'https://z0pe9jgn.rcld.app/webhook/generate-content';
const TIMEOUT_MS = 90000;

export const generateContent = async (formData, onProgress) => {
  const startTime = Date.now();

  try {
    onProgress(0, 'Validating input...');
    await new Promise(resolve => setTimeout(resolve, 500));

    onProgress(10, 'Sending request to API...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: formData.imageUrl,
        api_key: formData.apiKey,
        generate_video: formData.generateVideo,
        email: formData.email || undefined
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    onProgress(20, 'Processing response...');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || data.message || 'Generation failed');
    }

    onProgress(40, 'Generating images...');
    await simulateProgress(onProgress, 40, 70, 8000);

    if (formData.generateVideo && data.video) {
      onProgress(70, 'Generating video...');
      await simulateProgress(onProgress, 70, 95, 15000);
    } else {
      onProgress(95, 'Finalizing...');
    }

    onProgress(100, 'Complete!');

    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;

    return {
      id: nanoid(),
      timestamp: new Date().toISOString(),
      input: {
        imageUrl: formData.imageUrl,
        email: formData.email,
        generatedVideo: formData.generateVideo
      },
      results: {
        images: extractImages(data.image),
        video: extractVideo(data.video),
        raw: data
      },
      processingTime: Math.round(processingTime * 10) / 10,
      status: 'success',
      error: null
    };

  } catch (error) {
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;

    let errorMessage = error.message;

    if (error.name === 'AbortError') {
      errorMessage = 'Request timed out after 90 seconds. Please try again.';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = 'Network connection failed. Please check your internet connection and try again.';
    }

    return {
      id: nanoid(),
      timestamp: new Date().toISOString(),
      input: {
        imageUrl: formData.imageUrl,
        email: formData.email,
        generatedVideo: formData.generateVideo
      },
      results: null,
      processingTime: Math.round(processingTime * 10) / 10,
      status: 'failed',
      error: errorMessage
    };
  }
};

const simulateProgress = (onProgress, start, end, duration) => {
  return new Promise((resolve) => {
    const steps = 20;
    const increment = (end - start) / steps;
    const delay = duration / steps;

    let current = start;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = start + (increment * step);

      if (current >= end || step >= steps) {
        clearInterval(interval);
        onProgress(end);
        resolve();
      } else {
        onProgress(Math.floor(current));
      }
    }, delay);
  });
};

const extractImages = (imageData) => {
  if (!imageData) return [];

  const images = [];

  if (imageData.gorsel_1 && Array.isArray(imageData.gorsel_1)) {
    imageData.gorsel_1.forEach(item => {
      if (item.type === 'image' && item.url) {
        images.push(item.url);
      }
    });
  }

  return images;
};

const extractVideo = (videoData) => {
  if (!videoData) return null;

  if (videoData.video_1 && Array.isArray(videoData.video_1)) {
    const videoItem = videoData.video_1.find(item => item.type === 'video' && item.url);
    return videoItem ? videoItem.url : null;
  }

  return null;
};

export const retryGeneration = async (formData, onProgress, maxRetries = 3) => {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      onProgress(0, `Attempt ${attempt}/${maxRetries}...`);
      const result = await generateContent(formData, onProgress);

      if (result.status === 'success') {
        return result;
      }

      lastError = result.error;

      if (attempt < maxRetries) {
        onProgress(0, `Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

    } catch (error) {
      lastError = error.message;

      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  throw new Error(lastError || 'All retry attempts failed');
};
