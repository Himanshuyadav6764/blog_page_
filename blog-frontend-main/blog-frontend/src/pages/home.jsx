

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css'; 

const API_URL = 'http://localhost:5000/posts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchAllPosts = () => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

 const handleDelete = (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    axios.delete(`${API_URL}/${postId}`)
      .then(() => {
    
        alert('✅ Post successfully deleted!'); 
        // -----------------------------------
        fetchAllPosts(); 
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        alert(`Error deleting post: ${error.message}`);
      });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Posts</h1>

      
      {loading && <div className="loader"></div>}

      
      {!loading && posts.length > 0 && (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="post-card-home">
              <button className="delete-btn-home" onClick={() => handleDelete(post._id)}>
                &times;
              </button>
              <Link to={`/post/${post._id}`} className="post-link">
                <h2>{post.title}</h2>
                <p>{post.content.substring(0, 100)}...</p> 
                <small>By: {post.author || 'Anonymous'}</small>
              </Link>
            </div>
          ))}
        </div>
      )}
      {!loading && posts.length === 0 && (
        <div className="no-posts"> 
          <h2>No Posts Yet</h2>
          <p>Be the first to create a post!</p>
          <Link to="/create" className="btn-primary">
            Create a Post
          </Link>
        </div>
      )}
    </div>
  );
};
export default Home;