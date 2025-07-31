# Instagram Insights OCR Platform

A modern web application that extracts and analyzes Instagram Stories insights from screenshots using AI-powered OCR technology. Upload multiple screenshots and get organized, aggregated metrics in a clean table format.

## Features

- 📱 **Multiple Screenshot Support** - Upload and process multiple Instagram insights screenshots at once
- 🤖 **AI-Powered OCR** - Uses OpenAI's GPT-4 Vision API for accurate text and number extraction
- 📊 **Automatic Aggregation** - Automatically sums up metrics across multiple screenshots
- 🎨 **Modern UI** - Clean, responsive interface built with Next.js and Tailwind CSS
- 📋 **Organized Results** - View extracted metrics in a sortable, formatted table
- ⚡ **Fast Processing** - Efficient batch processing with detailed progress feedback
- 🔒 **Secure** - Client-side file handling with secure API processing

## Supported Metrics

The platform can extract various Instagram Stories insights metrics including:

- Impressions
- Reach
- Profile visits
- Website clicks
- Link clicks
- Follows
- Shares
- Replies
- Story exits
- Story completion rate
- Forward taps
- Back taps
- Next story taps
- Sticker taps

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with GPT-4 Vision access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instagram-insights-ocr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:8000](http://localhost:8000) in your browser.

## Usage

### Web Interface

1. **Navigate to the OCR page** - Click "Start Analyzing Screenshots" on the homepage
2. **Upload screenshots** - Select one or more Instagram insights screenshots (JPEG, PNG, WebP)
3. **Process images** - Click "Analyze Screenshots" to start OCR processing
4. **View results** - Review the extracted and aggregated metrics in the results table

### API Usage

You can also use the OCR functionality programmatically via the REST API:

```bash
curl -X POST http://localhost:8000/api/ocr \
     -F "files=@screenshot1.jpg" \
     -F "files=@screenshot2.jpg" \
     -H "Content-Type: multipart/form-data"
```

**Response format:**
```json
{
  "success": true,
  "filesProcessed": 2,
  "totalFilesUploaded": 2,
  "metrics": {
    "impressions": 2500,
    "reach": 1800,
    "profile_visits": 45,
    "website_clicks": 12,
    "link_clicks": 15
  }
}
```

## API Reference

### POST /api/ocr

Processes Instagram insights screenshots and extracts metrics.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `files` field containing one or more image files

**Response:**
```typescript
{
  success: boolean;
  filesProcessed: number;
  totalFilesUploaded: number;
  metrics: Record<string, number>;
  warnings?: string;
  failedFiles?: Array<{
    filename: string;
    error: string;
  }>;
}
```

**Error Response:**
```typescript
{
  error: string;
  details?: string;
}
```

## File Requirements

- **Supported formats:** JPEG, PNG, WebP
- **Maximum file size:** 10MB per file
- **Image content:** Clear Instagram Stories insights screenshots
- **Multiple files:** Supported - metrics will be automatically aggregated

## Technology Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **OCR Processing:** OpenAI GPT-4 Vision API
- **File Handling:** Native Web APIs with FormData
- **Deployment:** Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── api/ocr/route.ts      # OCR API endpoint
│   ├── ocr/page.tsx          # OCR upload interface
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/ui/            # shadcn/ui components
├── lib/
│   ├── ocr.ts               # OCR processing utilities
│   └── utils.ts             # General utilities
└── hooks/                   # Custom React hooks
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key with GPT-4 Vision access | Yes |

## Error Handling

The application includes comprehensive error handling:

- **Client-side:** File validation, network error handling, user-friendly error messages
- **Server-side:** API error handling, file processing errors, detailed logging
- **API errors:** Structured error responses with appropriate HTTP status codes

## Deployment

### Deploy with Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign up for a free account at [vercel.com](https://vercel.com)
3. Import your Git repository
4. Add your OpenAI API key as an environment variable:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
5. Deploy!

If you encounter browser storage limitations when publishing, see [GITHUB_PUBLISHING.md](GITHUB_PUBLISHING.md) for a manual command-line approach.

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## License

This project is licensed under the MIT License.
