import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    {/* Logo on the left, clickable */}
    <Link to="/" className="logo-link">
      <img src="/logo_name.png" alt="Logo" className="logo" />
    </Link>

    {/* Navigation links on the right */}
    <div className="nav-links">
      <Link to="/">Upload</Link>
      <Link to="/comparison">Comparison</Link>
      <Link to="/summary">Summary</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  </nav>
);

export default Navbar;
