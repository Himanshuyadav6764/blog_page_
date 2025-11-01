# Blog Application - Full Stack

A complete full-stack blog application with React frontend and Node.js + MongoDB backend.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Option 1: Using Individual Commands

#### Start Backend Server:

```powershell
cd blog-backend
npm install
npm run dev
```

Backend will run on: `http://localhost:5000`

#### Start Frontend Development Server:

```powershell
cd blog-frontend-main\blog-frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Option 2: Using Startup Script

```powershell
.\start-app.ps1
```

## 📁 Project Structure

```
blog-frontend-main/
├── blog-backend/              # Backend API Server
│   ├── models/
│   │   └── Post.js           # MongoDB Post model
│   ├── routes/
│   │   └── posts.js          # API routes
│   ├── server.js             # Main server file
│   ├── .env                  # Environment variables
│   └── package.json
│
└── blog-frontend-main/
    └── blog-frontend/         # React Frontend
        ├── src/
        │   ├── components/
        │   │   ├── navbar.jsx
        │   │   └── navbar.css
        │   ├── pages/
        │   │   ├── home.jsx & home.css
        │   │   ├── createpost.jsx & createpost.css
        │   │   └── blogpost.jsx & blogpost.css
        │   ├── App.jsx
        │   ├── App.css
        │   └── main.jsx
        └── package.json
```

## 🎨 Features

### Frontend Features:

- ✅ **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- ✅ **Modern UI** - Beautiful pastel gradient backgrounds
- ✅ **Smooth Animations** - Glass-morphism effects and transitions
- ✅ **Home Page** - Grid layout of all blog posts
- ✅ **Create Post** - Form with validation
- ✅ **Post Detail Page** - View, edit, and delete posts
- ✅ **Navigation** - Sticky navbar with active link highlighting

### Backend Features:

- ✅ **RESTful API** - Full CRUD operations
- ✅ **MongoDB Integration** - Persistent data storage
- ✅ **Input Validation** - Server-side validation
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Search & Filter** - Query posts by author or search term
- ✅ **View Counter** - Track post views
- ✅ **CORS Enabled** - Cross-origin requests allowed

## 🔧 Configuration

### Backend Configuration (.env file)

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/blogDB
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogDB

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:5000`

To change this, update the `API_URL` in:

- `src/pages/home.jsx`
- `src/pages/createpost.jsx`
- `src/pages/blogpost.jsx`

## 📡 API Endpoints

### GET /posts

Get all blog posts

- Query params: `author`, `search`, `sort`, `limit`

### GET /posts/:id

Get a single post by ID

### POST /posts

Create a new post

```json
{
  "title": "Post Title",
  "content": "Post content...",
  "author": "Author Name"
}
```

### PUT /posts/:id

Update a post

```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

### DELETE /posts/:id

Delete a post

## 🗄️ MongoDB Setup

### Local MongoDB:

1. Install MongoDB Community Edition
2. Start MongoDB service:

```powershell
net start MongoDB
```

3. Use connection string: `mongodb://localhost:27017/blogDB`

### MongoDB Atlas (Cloud):

1. Create free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string
6. Update `.env` file in blog-backend folder

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- **Mobile**: < 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

All components adapt to screen size with:

- Flexible grid layouts
- Touch-friendly buttons
- Readable font sizes
- Optimized spacing

## 🎯 Technologies Used

### Frontend:

- React 19
- React Router DOM
- Axios
- Vite
- CSS3 (with animations)

### Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## 🐛 Troubleshooting

### Backend won't start:

- Make sure MongoDB is running
- Check `.env` file has correct MongoDB connection string
- Run `npm install` in blog-backend folder

### Frontend won't connect to backend:

- Make sure backend server is running on port 5000
- Check browser console for CORS errors
- Verify API_URL in frontend pages

### MongoDB connection errors:

- Local MongoDB: Make sure service is running
- Atlas: Check connection string, credentials, and IP whitelist

## 📝 Development

### Add new features:

1. Backend: Create routes in `routes/posts.js`
2. Frontend: Create components in `src/components/` or pages in `src/pages/`
3. Styling: Add CSS files alongside components

### Debug:

- Backend logs: Check terminal running `npm run dev` in blog-backend
- Frontend: Use browser DevTools console
- MongoDB: Use MongoDB Compass to view database

## 🚢 Deployment

### Frontend (Netlify/Vercel):

```powershell
cd blog-frontend-main\blog-frontend
npm run build
```

Deploy the `dist` folder

### Backend (Render/Railway/Heroku):

1. Set environment variables on hosting platform
2. Use MongoDB Atlas for production database
3. Update frontend API_URL to production backend URL

## 📄 License

ISC

## 👨‍💻 Support

For issues or questions, check:

- MongoDB connection string is correct
- Both servers are running
- Ports 5000 and 5173 are not blocked by firewall
