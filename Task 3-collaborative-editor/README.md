# Collaborative Editor

A real-time collaborative text editor built with React and Vite that allows multiple users to edit documents simultaneously with live synchronization.

## Features

- **Real-Time Collaboration**: Multiple users can edit the same document simultaneously
- **Live Synchronization**: Changes are instantly reflected across all connected clients
- **React-Based UI**: Modern, responsive user interface built with React
- **Fast Development Experience**: Vite for rapid development and hot module replacement
- **Scalable Architecture**: Separate client and server implementations
- **Code Quality**: ESLint configuration for code consistency

## Tech Stack

### Client
- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: CSS
- **Linting**: ESLint
- **Language**: JavaScript (JSX)

### Server
- **Runtime**: Node.js
- **Framework**: Express.js
- **Communication**: WebSocket/Socket.io
- **Environment**: commonjs module system

## Installation

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd task-3-collab-editor/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd task-3-collab-editor/client
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

## Project Structure

```
task-3-collab-editor/
├── client/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # App styling
│   │   ├── main.jsx         # React entry point
│   │   ├── index.css        # Global styles
│   │   ├── styles.css       # Additional styles
│   │   ├── components/
│   │   │   └── Editor.jsx   # Editor component
│   │   └── assets/
│   ├── index.html           # HTML template
│   ├── package.json         # Client dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── eslint.config.js     # ESLint configuration
│   └── README.md
│
└── server/
    ├── server.js            # Express server
    └── package.json         # Server dependencies
```

## Usage

### Development Workflow

1. Ensure both server and client are running:
   - Server on its configured port
   - Client on Vite's development server

2. Open the client in your browser

3. Open the same URL in another browser window/tab to test collaboration

4. Start typing in the editor - your changes will be synchronized in real-time

## Available Scripts

### Client Scripts

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Server Scripts

- `node server.js` - Start the server

## Key Components

### App.jsx
Main React component that manages the collaborative editing interface and state.

### Editor.jsx
The core editor component that handles text input and document rendering.

### Server Configuration
The server manages WebSocket connections and synchronizes document updates across all connected clients.

## How Collaboration Works

1. User A opens the editor and connects to the server
2. User B opens the same editor and connects to the server
3. When User A types, the changes are sent to the server
4. The server broadcasts the changes to all connected clients
5. User B's editor is updated in real-time with User A's changes
6. The same process happens when User B types

## Configuration

### Vite Configuration
- Modern ES6+ module syntax
- React plugin enabled
- Hot module replacement (HMR) configured

### ESLint Configuration
- JavaScript and JSX support
- React hooks linting rules
- React refresh support
- Global variables support

## Building for Production

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `dist` folder to your web server

3. Ensure the server is running and accessible at the configured URL

## Environment Variables

Create a `.env` file in the client directory if needed:
```
VITE_API_URL=http://localhost:3000
```

## Future Enhancements

- User cursors/presence indicators
- Conflict resolution for simultaneous edits
- Document version history
- User authentication
- Document permissions (read/write)
- Auto-save functionality
- Rich text formatting
- Comments and suggestions
- Undo/redo functionality
- Document export (PDF, Word)

## Troubleshooting

### Port Already in Use
If the port is already in use, modify the server configuration or kill the process using that port.

### Hot Module Replacement Issues
Clear the browser cache and reload if HMR is not working properly.

### WebSocket Connection Errors
Ensure the server is running and the client is pointing to the correct server URL.

## Notes

- The editor uses real-time synchronization via WebSockets
- Changes are instant and persist across all connected clients
- No authentication is configured by default
- Data is not persisted to disk - consider adding database integration for production use
