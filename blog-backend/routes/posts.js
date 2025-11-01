import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const { author, search, sort = '-createdAt', limit = 100 } = req.query;
    
    let query = {};
    
    // Filter by author if provided
    if (author) {
      query.author = author;
    }
    
    // Search in title and content if search query provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await Post.find(query)
      .sort(sort)
      .limit(parseInt(limit));
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch posts',
      message: error.message 
    });
  }
});

// GET single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        error: 'Post not found',
        id: req.params.id 
      });
    }
    
    // Increment views
    await post.incrementViews();
    
    res.json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        error: 'Invalid post ID format',
        id: req.params.id 
      });
    }
    res.status(500).json({ 
      error: 'Failed to fetch post',
      message: error.message 
    });
  }
});

// POST create new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Title and content are required' 
      });
    }
    
    // Additional validation
    if (title.trim().length < 3) {
      return res.status(400).json({ 
        error: 'Title must be at least 3 characters long' 
      });
    }
    
    if (content.trim().length < 10) {
      return res.status(400).json({ 
        error: 'Content must be at least 10 characters long' 
      });
    }
    
    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      author: author?.trim() || 'Anonymous',
      tags: tags || []
    });
    
    const savedPost = await newPost.save();
    
    res.status(201).json({
      message: 'Post created successfully!',
      post: savedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Validation failed',
        details: messages.join(', ')
      });
    }
    res.status(500).json({ 
      error: 'Failed to create post',
      message: error.message 
    });
  }
});

// PUT update post by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    
    const updateData = {
      updatedAt: Date.now()
    };
    
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (author) updateData.author = author;
    if (tags) updateData.tags = tags;
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ 
        error: 'Post not found',
        id: req.params.id 
      });
    }
    
    res.json({
      message: 'Post updated successfully!',
      post: updatedPost
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        error: 'Invalid post ID format',
        id: req.params.id 
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.message 
      });
    }
    res.status(500).json({ 
      error: 'Failed to update post',
      message: error.message 
    });
  }
});

// DELETE post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      return res.status(404).json({ 
        error: 'Post not found',
        id: req.params.id 
      });
    }
    
    res.json({
      message: 'Post deleted successfully!',
      post: deletedPost
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        error: 'Invalid post ID format',
        id: req.params.id 
      });
    }
    res.status(500).json({ 
      error: 'Failed to delete post',
      message: error.message 
    });
  }
});

// GET posts by author
router.get('/author/:author', async (req, res) => {
  try {
    const posts = await Post.findByAuthor(req.params.author);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch posts by author',
      message: error.message 
    });
  }
});

export default router;
