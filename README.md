# Modern Presentation Editor

A modern, feature-rich presentation editor built with React and Express.js, allowing users to create and manage presentations with a beautiful UI and real-time editing capabilities.

## Features

- Real-time slide editing with Markdown support
- Modern UI with smooth animations and 3D effects
- Responsive design for all devices
- Intuitive slide navigation
- Auto-save functionality
- Beautiful landing page

## Tech Stack

- **Frontend:** React.js, React Router, React Icons
- **Backend:** Express.js, Sequelize
- **Database:** SQLite
- **Styling:** CSS3 with modern animations

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Start the development servers:

```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
```

The application will be available at:

- Client: <http://localhost:3000>
- Server: <http://localhost:3001>

## Deployment

### Backend (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     - `PORT`: 3001
     - `NODE_ENV`: production

### Frontend (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure:
   - Framework Preset: Create React App
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/build`
   - Environment Variables:
     - `REACT_APP_API_URL`: Your Render.com backend URL

## Environment Setup

### Backend (.env)

```
PORT=3001
NODE_ENV=production
```

### Frontend (.env)

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## License

This project is licensed under the MIT License.
