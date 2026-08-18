import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import '../styles/EmailScanner.css';

export default function EmailScanner({ onScan, loading }) {
  const [email, setEmail] = useState('');

  const handleScan = () => {
    if (email.trim()) {
      onScan(email);
    }
  };

  const handleClear = () => {
    setEmail('');
  };

  return (
    <section id="scanner" className="email-scanner">
      <div className="scanner-container">
        {/* Scanner Header */}
        <div className="scanner-header">
          <div className="scanner-title">
            <span className="title-bracket">[</span>
            <span> SECURE ANALYSIS TERMINAL </span>
            <span className="title-bracket">]</span>
          </div>
          <div className="scanner-status">
            <div className="status-dot"></div>
            <span className="status-label">READY FOR INPUT</span>
          </div>
        </div>

        {/* Scanner Content */}
        <div className="scanner-content">
          {/* Email Input */}
          <div className="input-group">
            <div className="input-label">
              <Mail className="w-4 h-4" />
              EMAIL CONTENT
            </div>
            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="&gt; PASTE SUSPICIOUS EMAIL CONTENT HERE..."
              className="email-textarea"
              rows={12}
              disabled={loading}
            />
            
            {/* Character Count */}
            <div className="input-footer">
              <span className="char-count">
                {email.length > 0 ? `${email.length} CHARACTERS` : ''}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="scanner-actions">
            <button
              onClick={handleScan}
              disabled={!email.trim() || loading}
              className="btn btn-primary"
              aria-label="Scan email for threats"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  ANALYZING...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  SCAN EMAIL
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="btn btn-secondary"
              aria-label="Clear email input"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* Scanner Border Accent */}
        <div className="scanner-accent"></div>
      </div>
    </section>
  );
}