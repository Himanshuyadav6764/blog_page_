// Environment configuration for frontend
const config = {
  // When deployed, replace this with your Railway backend URL
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/posts'
};

export default config;
