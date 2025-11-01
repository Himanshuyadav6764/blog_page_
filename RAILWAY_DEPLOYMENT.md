# 🚂 Railway Deployment Guide - Blog Application

Complete guide to deploy your full-stack blog application on Railway.

## 📋 Prerequisites

- GitHub account with your code pushed
- Railway account (sign up at railway.app)
- MongoDB Atlas connection string

## 🎯 Deployment Strategy

We'll deploy the backend and frontend as **two separate services** on Railway:

1. **Backend API** (Node.js + Express + MongoDB)
2. **Frontend** (React + Vite)

---

## 🔧 Part 1: Deploy Backend API

### Step 1: Prepare Backend for Railway

Your backend is already configured with:

- ✅ `railway.json` - Railway configuration
- ✅ `nixpacks.toml` - Build configuration
- ✅ Node.js version specified in `package.json`
- ✅ `start` script that runs `node server.js`

### Step 2: Deploy Backend to Railway

1. **Go to Railway:** https://railway.app
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Authenticate with GitHub** if needed
5. **Select repository:** `Himanshuyadav6764/blog_page_`
6. **Select root directory:** Choose `blog-backend` folder
7. **Click "Deploy"**

### Step 3: Configure Backend Environment Variables

In Railway dashboard for your backend service:

1. Click on your backend service
2. Go to **"Variables"** tab
3. Add these environment variables:

```
MONGODB_URI=mongodb+srv://new-user-1:himanshu%40%40123@cluster0.mfempxz.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
```

4. Click **"Deploy"** to restart with new variables

### Step 4: Get Backend URL

1. In Railway, go to your backend service
2. Click **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://blog-backend-production-xxxx.up.railway.app`)

**Important:** Save this URL! You'll need it for the frontend.

---

## 🎨 Part 2: Deploy Frontend

### Step 1: Update Frontend Configuration

Before deploying frontend, you need to update it with your backend URL.

**Option A: Using Environment Variables (Recommended)**

1. In Railway, create a new service for frontend
2. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/posts
   ```

**Option B: Direct Update (Simpler for Railway)**

Update these files locally and push to GitHub:

**File 1:** `blog-frontend-main/blog-frontend/src/pages/home.jsx`

```javascript
const API_URL = "https://your-backend-url.railway.app/posts";
```

**File 2:** `blog-frontend-main/blog-frontend/src/pages/createpost.jsx`

```javascript
const API_URL = "https://your-backend-url.railway.app/posts";
```

**File 3:** `blog-frontend-main/blog-frontend/src/pages/blogpost.jsx`

```javascript
const API_URL = "https://your-backend-url.railway.app/posts";
```

Then commit and push:

```bash
git add .
git commit -m "Update API URL for Railway deployment"
git push origin main
```

### Step 2: Deploy Frontend to Railway

1. **In Railway dashboard, click "New"**
2. **Select "Deploy from GitHub repo"** again
3. **Select same repository:** `blog_page_`
4. **Select root directory:** Choose `blog-frontend-main/blog-frontend`
5. **Click "Deploy"**

### Step 3: Configure Frontend Build

Railway will automatically detect it's a Vite project and:

- Run `npm install`
- Run `npm run build`
- Serve the `dist` folder

If needed, you can manually set:

- **Build Command:** `npm run build`
- **Start Command:** `npx vite preview --host --port $PORT`

### Step 4: Generate Frontend Domain

1. Go to frontend service in Railway
2. Click **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Your blog will be live at that URL!

---

## ✅ Verification Checklist

### Backend Checks:

- [ ] Backend service is deployed and running
- [ ] Environment variables are set (MONGODB_URI, PORT, NODE_ENV)
- [ ] Public domain is generated
- [ ] API endpoint responds: `https://your-backend-url.railway.app/posts`
- [ ] MongoDB Atlas connection is working (check logs)

### Frontend Checks:

- [ ] Frontend service is deployed and running
- [ ] Build completed successfully
- [ ] Public domain is generated
- [ ] Website loads at the URL
- [ ] Can view posts (test backend connection)
- [ ] Can create new posts
- [ ] Can edit and delete posts

---

## 🔍 Testing Your Deployment

### Test Backend API:

```bash
# Get all posts
curl https://your-backend-url.railway.app/posts

# Create a test post
curl -X POST https://your-backend-url.railway.app/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Testing Railway deployment","author":"Railway User"}'
```

### Test Frontend:

1. Open your Railway frontend URL
2. Check if posts load on homepage
3. Try creating a new post
4. Try editing a post
5. Try deleting a post

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem:** "Cannot connect to MongoDB"

- **Solution:** Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify MONGODB_URI is correct in Railway environment variables

**Problem:** "Port already in use"

- **Solution:** Make sure `PORT` environment variable is set in Railway

**Problem:** "Application failed to start"

- **Solution:** Check Railway logs, verify `start` script in package.json

### Frontend Issues:

**Problem:** "Network Error" or "CORS Error"

- **Solution:**
  1. Verify backend URL is correct in frontend code
  2. Check backend CORS settings allow your frontend domain
  3. Update backend `server.js` to allow your Railway frontend domain

**Problem:** "404 on page refresh"

- **Solution:** Railway should handle this automatically, but verify build settings

**Problem:** "Environment variable not found"

- **Solution:** Set `VITE_API_URL` in Railway frontend service variables

---

## 🔄 Update Deployment

### Update Backend:

```bash
git add blog-backend/
git commit -m "Update backend"
git push origin main
```

Railway will automatically redeploy.

### Update Frontend:

```bash
git add blog-frontend-main/blog-frontend/
git commit -m "Update frontend"
git push origin main
```

Railway will automatically redeploy.

---

## 💰 Cost

Railway offers:

- **Free tier:** $5 credit/month (enough for small projects)
- **Pro plan:** $20/month for more resources

Your blog application should run fine on the free tier for development/testing.

---

## 🎉 Success!

Once both services are deployed:

1. **Backend URL:** `https://blog-backend-production-xxxx.up.railway.app`
2. **Frontend URL:** `https://blog-frontend-production-xxxx.up.railway.app`
3. **Database:** MongoDB Atlas (always running)

Your blog is now live and accessible to anyone! 🚀

---

## 📝 Quick Reference

### Railway CLI (Optional)

Install Railway CLI for easier deployment:

```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

### Useful Commands:

```bash
# View logs
railway logs

# Open in browser
railway open

# Add environment variable
railway variables set KEY=value
```

---

## 🆘 Need Help?

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check Railway logs for detailed error messages
- Verify MongoDB Atlas connection
- Ensure GitHub repository is up to date

---

**Happy Deploying! 🚂✨**
