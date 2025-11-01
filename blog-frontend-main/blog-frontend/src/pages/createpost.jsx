
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './createpost.css'; 

const API_URL = 'http://localhost:5000/posts';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Frontend validation
    if (title.trim().length < 3) {
      alert('⚠️ Title must be at least 3 characters long');
      return;
    }
    
    if (content.trim().length < 10) {
      alert('⚠️ Content must be at least 10 characters long');
      return;
    }
    
    const newPost = { 
      title: title.trim(), 
      content: content.trim(), 
      author: author.trim() || 'Anonymous'
    };

    setIsLoading(true);
    axios.post(API_URL, newPost)
      .then(() => {
        setIsLoading(false);
        alert('🎉 Post published successfully!');
        setTimeout(() => {
          navigate('/'); 
        }, 200); 
    
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error creating post:', error);
        
        // Better error message
        const errorMsg = error.response?.data?.error || error.response?.data?.details || error.message;
        alert(`❌ Error creating post: ${errorMsg}`);
      });
  };


  return (
    <div className="create-post-container">
      <div className="form-wrapper">
        <h1 className="form-title">Create New Post</h1>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="title">Title (minimum 3 characters)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title..."
              minLength={3}
              required
            />
            <small className="char-count">{title.length} characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content (minimum 10 characters)</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your amazing blog post here..."
              rows="10"
              minLength={10}
              required
            />
             
            <small className="char-count">{content.length} / 10000 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name (optional)..."
            />
          </div>

          <button type="submit" className="btn-publish" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;