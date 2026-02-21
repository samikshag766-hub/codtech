# Productivity & Time Tracking Dashboard

A comprehensive productivity management and time tracking application with a React-based dashboard, Node.js backend, and Chrome extension. Track events, generate reports, and monitor your productivity across all your activities.

## Overview

This full-stack application consists of three main components:

1. **Backend**: RESTful API server built with Express.js and MongoDB
2. **Dashboard**: React-based web interface for tracking and reporting
3. **Extension**: Chrome extension for seamless browser integration

## Features

- **Event Tracking**: Log and track your daily activities and events
- **Time Tracking**: Monitor time spent on different tasks
- **Weekly Reports**: Generate detailed productivity reports
- **Dashboard Analytics**: Visual representation of productivity metrics
- **Chrome Extension**: Quick access to tracking features from your browser
- **Database Integration**: MongoDB for persistent data storage
- **CORS Support**: Secure API communication

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv
- **Module System**: CommonJS

### Dashboard
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: CSS
- **HTTP Client**: Custom API integration (src/api.js)
- **Linting**: ESLint

### Extension
- **Technology**: Chrome Web Extension
- **Scripts**: Popup UI, Background processing
- **Styling**: CSS
- **Manifest**: V2 or V3 compatible

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd task-4-productivity/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/productivity
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev        # Development with nodemon
   npm start          # Production
   ```

### Dashboard Setup

1. Navigate to the dashboard directory:
   ```bash
   cd task-4-productivity/dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided by Vite (typically `http://localhost:5173`)

### Chrome Extension Setup

1. Navigate to `task-4-productivity/extension`

2. Open Chrome and go to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top right)

4. Click "Load unpacked" and select the `extension` folder

5. The extension will now appear in your Chrome toolbar

## Project Structure

```
task-4-productivity/
├── backend/
│   ├── server.js              # Main Express server
│   ├── package.json           # Backend dependencies
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── models/
│   │   ├── Event.js           # Event data model
│   │   └── WeeklyReport.js    # Report data model
│   └── routes/
│       ├── track.js           # Event tracking endpoints
│       └── reports.js         # Reporting endpoints
│
├── dashboard/
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # App styling
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Global styles
│   │   ├── styles.css         # Additional styles
│   │   ├── api.js             # API client functions
│   │   └── assets/
│   ├── index.html             # HTML template
│   ├── package.json           # Dashboard dependencies
│   ├── vite.config.js         # Vite configuration
│   └── eslint.config.js       # ESLint configuration
│
└── extension/
    ├── manifest.json          # Extension configuration
    ├── popup.html             # Popup UI
    ├── popup.js               # Popup functionality
    ├── popup.css              # Popup styling
    └── background.js          # Background service worker
```

## API Endpoints

### Event Tracking - `/api/track`

#### POST - Create Event
```
POST /api/track
Content-Type: application/json

{
  "name": "Coding",
  "duration": 120,
  "category": "work"
}
```

#### GET - Get All Events
```
GET /api/track
```

#### GET - Get Event by ID
```
GET /api/track/:id
```

#### PUT - Update Event
```
PUT /api/track/:id
```

#### DELETE - Delete Event
```
DELETE /api/track/:id
```

### Reports - `/api/reports`

#### POST - Generate Weekly Report
```
POST /api/reports
Content-Type: application/json

{
  "week": "2026-01-20",
  "totalHours": 40,
  "categories": {...}
}
```

#### GET - Get All Reports
```
GET /api/reports
```

#### GET - Get Report by ID
```
GET /api/reports/:id
```

## Database Models

### Event Model
- `name` (String): Activity name
- `duration` (Number): Time in minutes
- `category` (String): Activity category
- `timestamp` (Date): When the event occurred
- `notes` (String): Additional notes

### WeeklyReport Model
- `week` (Date): Week starting date
- `totalHours` (Number): Total hours tracked
- `categories` (Object): Breakdown by category
- `generatedAt` (Date): Report generation time

## Available Scripts

### Backend
- `npm run dev` - Start with nodemon (auto-restart on changes)
- `npm start` - Start the server

### Dashboard
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Backend Configuration
Edit `config/db.js` to configure MongoDB connection:
```javascript
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/productivity');
```

### API Client
The dashboard uses `src/api.js` for all backend communication. Update the base URL if needed:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Environment Variables
Backend `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/productivity
PORT=5000
NODE_ENV=development
```

## How to Use

### Dashboard

1. Navigate to the dashboard application
2. View your tracked events and productivity metrics
3. Add new events through the UI
4. Generate weekly reports to analyze productivity
5. View detailed breakdowns by category

### Chrome Extension

1. Click the extension icon in your Chrome toolbar
2. Log your current activity
3. Specify the duration and category
4. Click save to track the event
5. Data syncs automatically with the dashboard and backend

## Future Enhancements

- User authentication and authorization
- Real-time synchronization between dashboard and extension
- Advanced analytics and visualization
- Goal setting and progress tracking
- Team collaboration features
- Mobile app support
- Cloud storage integration
- Notifications and reminders
- Export reports (PDF, CSV)
- Dark mode
- Integrations with Slack, Todoist, etc.

## Troubleshooting

### MongoDB Connection Error
Ensure MongoDB is running:
```bash
mongod
```

### Port Already in Use
Change the PORT in `.env` or kill the process using the port.

### Extension Not Loading
- Ensure Developer mode is enabled in Chrome
- Check that the manifest.json is valid
- Reload the extension after making changes

### API Connection Issues
- Verify backend is running on the configured port
- Check CORS is enabled
- Verify the API base URL in `src/api.js`

## Development Workflow

1. Start MongoDB service
2. Start the backend server
3. Start the dashboard development server
4. Load/reload the Chrome extension
5. Make changes and test across all components

## Production Deployment

### Backend
```bash
npm start
```
Deploy to a server (Heroku, AWS, etc.)

### Dashboard
```bash
npm run build
```
Deploy the `dist` folder to a static hosting service

### Extension
Publish to Chrome Web Store through your developer account

## Notes

- The application uses MongoDB for data persistence
- CORS is enabled for secure cross-origin communication
- The Chrome extension requires popup permissions
- No authentication is configured by default - add for production
- Database connection details should be secured with environment variables
