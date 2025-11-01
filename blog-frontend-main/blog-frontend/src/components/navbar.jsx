import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Bloggify
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            
            <NavLink to="/" className="nav-links" end> 
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className="nav-links">
              Create Post
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;