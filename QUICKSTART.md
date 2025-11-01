# Quick Start Guide - Blog Application

## 🚀 First Time Setup

### 1. Install MongoDB (Choose one option):

**Option A - Local MongoDB (Recommended for Development):**

1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service:
   ```powershell
   net start MongoDB
   ```

**Option B - MongoDB Atlas (Cloud Database):**

1. Sign up free at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create database user and password
4. Whitelist IP: 0.0.0.0/0 (for development)
5. Get connection string
6. Update `blog-backend\.env` file with your connection string

### 2. Install Dependencies

**Backend:**

```powershell
cd blog-backend
npm install
```

**Frontend:**

```powershell
cd blog-frontend-main\blog-frontend
npm install
```

## 🎯 Running the Application

### Method 1: Automatic Startup (Easy)

```powershell
.\start-app.ps1
```

This will:

- Start the backend server on port 5000
- Start the frontend server on port 5173
- Open the app in your browser automatically

### Method 2: Manual Startup

**Terminal 1 - Backend:**

```powershell
cd blog-backend
npm run dev
```

**Terminal 2 - Frontend:**

```powershell
cd blog-frontend-main\blog-frontend
npm run dev
```

Then open: http://localhost:5173

## 🧪 Testing the Application

1. **View Posts**: Homepage shows all blog posts in a grid
2. **Create Post**: Click "Create Post" in navbar
3. **View Single Post**: Click any post card to view details
4. **Edit Post**: Click "Edit" button on post detail page
5. **Delete Post**: Click "Delete" button (with confirmation)

## 📱 Features to Test

### Desktop View:

- Multi-column grid layout
- Hover effects on cards
- Smooth animations
- Full navigation bar

### Mobile View (resize browser):

- Single column layout
- Touch-friendly buttons
- Responsive navigation
- Optimized spacing

### Tablet View:

- Two-column grid
- Adjusted font sizes
- Comfortable spacing

## 🔍 Troubleshooting

### Backend won't start?

```powershell
# Check if MongoDB is running
net start MongoDB

# Or check MongoDB service status
Get-Service -Name MongoDB
```

### Frontend can't connect?

- Make sure backend is running (http://localhost:5000)
- Check browser console (F12) for errors
- Verify no firewall blocking ports 5000 or 5173

### Port already in use?

```powershell
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### MongoDB connection error?

- **Local**: Make sure MongoDB service is running
- **Atlas**: Check connection string in `.env` file
- **Atlas**: Verify IP address is whitelisted (0.0.0.0/0)
- **Atlas**: Confirm username and password are correct

## 📊 MongoDB Data

### View your data:

1. Download MongoDB Compass (GUI tool)
2. Connect to: `mongodb://localhost:27017`
3. Browse `blogDB` database
4. View `posts` collection

### Sample data structure:

```json
{
  "_id": "ObjectId...",
  "title": "My First Post",
  "content": "This is the content...",
  "author": "John Doe",
  "views": 0,
  "createdAt": "2025-11-01T...",
  "updatedAt": "2025-11-01T..."
}
```

## 🎨 Customization

### Change colors:

Edit CSS files in:

- `blog-frontend/src/App.css` - Global styles
- `blog-frontend/src/pages/*.css` - Page-specific styles

### Change backend port:

1. Edit `blog-backend\.env` - Change PORT value
2. Update frontend API_URL in all page files

### Add features:

- **Backend**: Edit `blog-backend/routes/posts.js`
- **Frontend**: Create new components in `src/components/`

## 📝 API Testing

Test API directly with PowerShell:

```powershell
# Get all posts
Invoke-RestMethod -Uri "http://localhost:5000/posts" -Method Get

# Create a post
$body = @{
    title = "Test Post"
    content = "This is a test"
    author = "Tester"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/posts" -Method Post -Body $body -ContentType "application/json"
```

## ✅ Checklist

Before running the app, make sure:

- [ ] MongoDB is installed and running (or Atlas connection string is set)
- [ ] Node.js is installed (v16+)
- [ ] Dependencies installed for both backend and frontend
- [ ] Ports 5000 and 5173 are available
- [ ] `.env` file exists in blog-backend folder

## 🎉 Success!

If you see:

- Backend: "✅ Connected to MongoDB successfully!"
- Frontend: "VITE ... ready in ... ms"
- Browser opens to: http://localhost:5173

**You're all set! Enjoy your blog application! 🚀**

## 🆘 Need Help?

Common issues:

1. **Can't connect to MongoDB**: Check service is running
2. **Port in use**: Kill the process using that port
3. **Module not found**: Run `npm install` again
4. **CORS error**: Make sure backend is running first

For more details, see the main README.md file.
