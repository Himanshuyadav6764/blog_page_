# Railway Deployment - Quick Start

## 🚀 Deploy to Railway in 3 Steps

### 1. Deploy Backend

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `blog_page_` repository
4. Choose **`blog-backend`** folder
5. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://new-user-1:himanshu%40%40123@cluster0.mfempxz.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   NODE_ENV=production
   ```
6. Generate domain → Copy backend URL

### 2. Deploy Frontend

1. In Railway, click "New" → "Deploy from GitHub repo"
2. Select `blog_page_` repository again
3. Choose **`blog-frontend-main/blog-frontend`** folder
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/posts
   ```
5. Generate domain → Your blog is live!

### 3. Test

- Visit your frontend URL
- Try creating a post
- Verify everything works!

## 📚 Full Documentation

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete guide.

## ⚡ Files Configured for Railway

- ✅ `blog-backend/railway.json` - Backend config
- ✅ `blog-backend/nixpacks.toml` - Build settings
- ✅ `blog-backend/server.js` - CORS configured
- ✅ Frontend uses environment variables
- ✅ All API URLs use `VITE_API_URL`

## 🎯 What's Deployed

**Backend:** Node.js + Express + MongoDB
**Frontend:** React + Vite
**Database:** MongoDB Atlas (cloud)

Ready to deploy! 🚂✨
