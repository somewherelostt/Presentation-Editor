# Modern Presentation Editor

A modern, feature-rich presentation editor built with React and Express.js.

## Features

- Real-time slide editing
- Markdown support
- Modern UI with animations
- Responsive design
- Slide navigation
- Auto-save functionality
- Beautiful landing page

## Tech Stack

- Frontend: React.js, React Router, React Icons
- Backend: Express.js, Sequelize
- Database: SQLite
- Styling: CSS3 with modern animations

## Local Development

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-name>
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

### Backend Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     - `PORT`: 3001
     - `NODE_ENV`: production

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure the project:
   - Framework Preset: Create React App
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/build`
   - Environment Variables:
     - `REACT_APP_API_URL`: Your Render.com backend URL

## Environment Variables

### Backend (.env)

```
PORT=3001
NODE_ENV=production
```

### Frontend (.env)

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
