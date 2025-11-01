# Blog Backend API

A RESTful API for managing blog posts with MongoDB integration.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ MongoDB database integration
- ✅ Search and filter functionality
- ✅ View counter for posts
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Environment variable configuration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

   - Copy `.env` file and update the MongoDB connection string
   - For local MongoDB: `mongodb://localhost:27017/blogDB`
   - For MongoDB Atlas: Get connection string from your Atlas dashboard

3. Make sure MongoDB is running (if using local MongoDB):

```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Get all posts

```
GET /posts
Query parameters:
  - author: Filter by author name
  - search: Search in title and content
  - sort: Sort order (default: -createdAt)
  - limit: Maximum number of posts (default: 100)
```

### Get single post

```
GET /posts/:id
```

### Create new post

```
POST /posts
Body: {
  "title": "Post Title",
  "content": "Post content...",
  "author": "Author Name" (optional)
}
```

### Update post

```
PUT /posts/:id
Body: {
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Updated Author"
}
```

### Delete post

```
DELETE /posts/:id
```

### Get posts by author

```
GET /posts/author/:authorName
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from mongodb.com
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/blogDB`

### Option 2: MongoDB Atlas (Cloud)

1. Create free account at mongodb.com/cloud/atlas
2. Create a cluster
3. Create database user
4. Whitelist IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update .env file

## Project Structure

```
blog-backend/
├── models/
│   └── Post.js          # MongoDB Post schema
├── routes/
│   └── posts.js         # API routes
├── server.js            # Main server file
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md           # Documentation
```

## Testing the API

You can test the API using:

- Postman
- Thunder Client (VS Code extension)
- curl commands
- Frontend application

Example curl commands:

```bash
# Get all posts
curl http://localhost:5000/posts

# Create a post
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"This is amazing!","author":"John"}'

# Get single post
curl http://localhost:5000/posts/POST_ID

# Update post
curl -X PUT http://localhost:5000/posts/POST_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete post
curl -X DELETE http://localhost:5000/posts/POST_ID
```

## Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## License

ISC
