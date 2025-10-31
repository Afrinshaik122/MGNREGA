# MGNREGA Performance Dashboard

A web application that displays MGNREGA performance data by district, with offline capability through data caching and an accessible interface for rural users.

## Features

- State and district selection interface
- Real-time MGNREGA performance metrics:
  - Households Employed
  - Total Workdays Generated
  - Payments Completed
  - Pending Payments
- Integration with data.gov.in API
- Offline mode with automatic caching
- Responsive design for mobile, tablet, and desktop
- Accessible interface with large icons and clear indicators

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Vercel Serverless Functions (Node.js)
- **Deployment**: Vercel
- **Data Source**: data.gov.in API
- **Caching**: JSON file storage

## Project Structure

```
MGNREGA/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── Header.jsx             # Application header
│   │   ├── SelectionForm.jsx      # State/district selection
│   │   ├── Dashboard.jsx          # Performance metrics display
│   │   ├── StatusBar.jsx          # Data source indicator
│   │   ├── LoadingSpinner.jsx     # Loading state
│   │   └── ErrorMessage.jsx       # Error display
│   └── hooks/
│       └── usePerformanceData.js  # Data fetching hook
├── api/
│   ├── performance.js             # Main API endpoint
│   └── health.js                  # Health check endpoint
├── public/                        # Static assets
├── index.html                     # HTML entry point
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel deployment config
└── .env.example                   # Environment variables template
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- data.gov.in API key (register at https://data.gov.in/user/register)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

   This will start:
   - Express API server on `http://localhost:3000`
   - Vite frontend on `http://localhost:5173`

3. **Open in browser**
   - Go to `http://localhost:5173`
   - The frontend will automatically proxy API requests to port 3000

That's it! No environment variables or additional setup needed for development.

### Deployment to Vercel

#### Option 1: Automatic Deployment (GitHub)

1. Push code to GitHub repository
2. Connect repository to Vercel at https://vercel.com
3. Add environment variable in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `DATA_GOV_API_KEY` with your API key
   - Set for Production, Preview, and Development
4. Deploy automatically on every push to main branch

#### Option 2: Manual Deployment

1. Install Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. Link project
   ```bash
   vercel link
   ```

3. Add environment variable
   ```bash
   vercel env add DATA_GOV_API_KEY
   ```

4. Deploy to production
   ```bash
   vercel --prod
   ```

5. Get your deployment URL (e.g., `https://mgnrega-{random}.vercel.app`)

## Usage

1. **Select State**: Choose from dropdown (Andhra Pradesh, Karnataka, Tamil Nadu, etc.)
2. **Select District**: District dropdown populates based on selected state
3. **View Performance**: Click button to fetch and display data
4. **Data Source Indicator**:
   - Green indicator: Live data from API
   - Orange indicator: Cached data (offline mode)

## Offline Mode

The application automatically caches data from successful API calls. When the API is unavailable, cached data is served automatically, ensuring the application works even offline.

## API Endpoints

### GET /api/performance

Fetch MGNREGA performance data for a specific state and district.

**Query Parameters:**
- `state` (required): State name (e.g., "Karnataka")
- `district` (required): District name (e.g., "Bangalore Rural")

**Response:**
```json
{
  "success": true,
  "dataSource": "live",
  "lastUpdated": "2025-10-30T10:30:00Z",
  "data": {
    "householdsEmployed": 25430,
    "totalWorkdays": 154200,
    "paymentsCompleted": 24000000,
    "pendingPayments": 4500000
  }
}
```

### GET /api/health

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-30T10:30:00Z"
}
```

## API Integration Status

**Working with Real Data!** The application is integrated with data.gov.in's MGNREGA API endpoint:
- **Dataset**: District-wise MGNREGA Data at a Glance
- **Resource ID**: `ee03643a-ee4c-48c2-ac30-9f2ff26ab722`
- **Data Coverage**: Multiple states with monthly updated data

**Three-Tier Data Strategy:**
1. **Live API**: Attempts to fetch real-time data from data.gov.in
2. **Cache**: Falls back to cached data if API is unavailable
3. **Generated Data**: Creates realistic fallback data if neither API nor cache is available

**Current Status:**
- ✅ Successfully fetching real data for available states (Madhya Pradesh, Maharashtra, Manipur, Meghalaya, etc.)
- ✅ Caching working correctly for offline access
- ✅ Fallback data generation for states not yet in API dataset

## Design Decisions

- **Serverless Architecture**: Vercel serverless functions for easy scaling and no infrastructure management
- **Automatic Caching**: Ensures data availability even when API is down
- **Mock Data Generation**: Creates realistic, consistent data for demonstration until real API is available
- **API-Ready Structure**: Code designed to seamlessly switch to real API when available
- **Rural Accessibility**: Large icons, clear numbers, simple interface designed for users with limited tech experience
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Indian Number Format**: Uses lakhs and crores for currency display

## License

MIT