# Blog Backend - Railway Deployment

This backend is configured for Railway deployment with MongoDB Atlas.

## Environment Variables

Set these in Railway dashboard:

```
MONGODB_URI=mongodb+srv://new-user-1:himanshu%40%40123@cluster0.mfempxz.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
```

## Deployment Steps

1. Push code to GitHub
2. Go to Railway.app
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy!

## API Endpoints

- GET /posts - Get all posts
- POST /posts - Create post
- GET /posts/:id - Get single post
- PUT /posts/:id - Update post
- DELETE /posts/:id - Delete post
