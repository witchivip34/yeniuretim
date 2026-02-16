# Prototipal Content Generator

AI-powered SaaS application that transforms Shopify product images into professional lifestyle images and videos.

## Features

- Generate 3 professional lifestyle images from any Shopify product image
- Optional lifestyle video generation
- Real-time progress tracking with detailed status updates
- Image gallery with download, copy URL, and preview options
- Video player with full controls
- Generation history (last 50 items)
- Quick statistics dashboard
- Responsive design (mobile, tablet, desktop)
- localStorage for data persistence
- Form validation and error handling
- Retry mechanism for failed requests

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- React Hot Toast (notifications)
- Nanoid (unique IDs)

## API Integration

The app integrates with N8n webhook API:
- Endpoint: `https://z0pe9jgn.rcld.app/webhook/generate-content`
- Timeout: 90 seconds
- Methods: POST
- Expected processing time: 8-60 seconds

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. Enter a valid Shopify product image URL
2. Provide your Prototipal API key (saved securely in localStorage)
3. Optionally add your email for notifications
4. Check "Generate Video Too" if you want a lifestyle video
5. Click "Generate Content"
6. Wait for the generation process (8-60 seconds)
7. View, download, or share your generated content

## Features Detail

### Form Validation
- URL must be HTTPS and contain valid image extension
- API key must be at least 10 characters
- Email validation (optional field)

### Progress Tracking
- Real-time progress bar
- Step-by-step status updates
- Estimated time remaining

### Results Display
- 3 generated images in responsive grid
- Hover effects with action buttons
- Video player with controls
- Download all content
- Copy URLs to clipboard
- Open in new tab

### History Management
- Last 50 generations saved
- Click to reload previous results
- Delete individual items
- Clear all history
- Success/failure status indicators

### Statistics
- Total successful generations
- Average processing time
- Total videos generated
- Success rate percentage
- Last generation timestamp
- Today's generation count

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge