import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isOnline] = useState(true);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <Shield className="w-5 h-5" />
          </div>
          <span className="logo-text">PHISH//GUARD</span>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#scanner" className="nav-link">SCANNER</a>
          <a href="#how" className="nav-link">HOW IT WORKS</a>
        </div>

        {/* Status */}
        <div className="navbar-status">
          <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
          <span className="status-text">
            SYSTEM {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Subtle top border */}
      <div className="navbar-border"></div>
    </nav>
  );
}