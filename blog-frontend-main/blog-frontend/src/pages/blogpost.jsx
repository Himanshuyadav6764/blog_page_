import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './blogpost.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/posts';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedAuthor, setEditedAuthor] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = () => {
    setLoading(true);
    axios.get(`${API_URL}/${id}`)
      .then(response => {
        setPost(response.data);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
        setEditedAuthor(response.data.author || '');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        alert('✅ Post successfully deleted!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        alert(`Error deleting post: ${error.message}`);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedPost = {
      title: editedTitle,
      content: editedContent,
      author: editedAuthor
    };

    axios.put(`${API_URL}/${id}`, updatedPost)
      .then(() => {
        alert('✅ Post updated successfully!');
        setIsEditing(false);
        fetchPost();
      })
      .catch(error => {
        console.error('Error updating post:', error);
        alert(`Error updating post: ${error.message}`);
      });
  };

  if (loading) {
    return (
      <div className="blogpost-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blogpost-container">
        <div className="error-message">
          <h2>Oops! Post not found</h2>
          <p>{error || 'The post you are looking for does not exist.'}</p>
          <Link to="/" className="btn-back">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blogpost-container">
      <div className="blogpost-wrapper">
        {!isEditing ? (
          <>
            <div className="blogpost-header">
              <Link to="/" className="btn-back">← Back to Home</Link>
              <div className="action-buttons">
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  ✏️ Edit
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                  🗑️ Delete
                </button>
              </div>
            </div>

            <article className="blogpost-content">
              <h1 className="blogpost-title">{post.title}</h1>
              
              <div className="blogpost-meta">
                <span className="author">
                  👤 {post.author || 'Anonymous'}
                </span>
                {post.createdAt && (
                  <span className="date">
                    📅 {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>

              <div className="blogpost-body">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          </>
        ) : (
          <div className="edit-form-wrapper">
            <h2 className="edit-title">Edit Post</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  type="text"
                  id="edit-title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-content">Content</label>
                <textarea
                  id="edit-content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows="15"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-author">Author</label>
                <input
                  type="text"
                  id="edit-author"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                />
              </div>

              <div className="edit-buttons">
                <button type="submit" className="btn-save">
                  💾 Save Changes
                </button>
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setIsEditing(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
