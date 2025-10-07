import React, { useState, useEffect, useRef } from 'react';
import './MainView.css';

const MainView = ({ onStart, onAPIKeyHelp, onLayoutModeChange, statusText }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
  const [isInitializing, setIsInitializing] = useState(false);
  const [showApiKeyError, setShowApiKeyError] = useState(false);
  const [isMacOS, setIsMacOS] = useState(false);

  useEffect(() => {
    setIsMacOS(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    // Load layout mode
    const savedLayoutMode = localStorage.getItem('layoutMode');
    if (savedLayoutMode && savedLayoutMode !== 'normal') {
      onLayoutModeChange(savedLayoutMode);
    }

    // Listen for session initializing
    if (window.electron?.ipcRenderer) {
      const handler = (event, isInit) => {
        setIsInitializing(isInit);
      };
      window.electron.ipcRenderer.on('session-initializing', handler);

      return () => {
        window.electron.ipcRenderer.removeAllListeners('session-initializing');
      };
    }
  }, [onLayoutModeChange]);

  useEffect(() => {
    const handleKeydown = (e) => {
      const isStartShortcut = isMacOS
        ? e.metaKey && e.key === 'Enter'
        : e.ctrlKey && e.key === 'Enter';

      if (isStartShortcut) {
        e.preventDefault();
        handleStartClick();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isMacOS, isInitializing]);

  const handleInput = (e) => {
    setApiKey(e.target.value);
    localStorage.setItem('apiKey', e.target.value);
    if (showApiKeyError) {
      setShowApiKeyError(false);
    }
  };

  const handleStartClick = async () => {
    if (isInitializing) return;
    
    const apiKey = localStorage.getItem('apiKey')?.trim();
    if (!apiKey || apiKey === '') {
      triggerApiKeyError();
      return;
    }
    
    const result = await onStart();
    if (!result) {
      triggerApiKeyError();
    }
  };

  const triggerApiKeyError = () => {
    setShowApiKeyError(true);
    setTimeout(() => {
      setShowApiKeyError(false);
    }, 1000);
  };

  const getStartButtonContent = () => {
    const cmdIcon = (
      <svg width="14px" height="14px" viewBox="0 0 24 24" strokeWidth="2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H18C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const enterIcon = (
      <svg width="14px" height="14px" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.25 19.25L6.75 15.75L10.25 12.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.75 15.75H12.75C14.9591 15.75 16.75 13.9591 16.75 11.75V4.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <>
        Start Session{' '}
        <span className="shortcut-icons">
          {isMacOS ? (
            <>
              {cmdIcon}
              {enterIcon}
            </>
          ) : (
            <>
              Ctrl
              {enterIcon}
            </>
          )}
        </span>
      </>
    );
  };

  return (
    <div className="main-view-container">
      <div className="welcome-header">
        <h1 className="welcome-title">Welcome to Cheating Daddy</h1>
        <p className="welcome-subtitle">Your AI-powered assistant for real-time help</p>
      </div>

      <div className="getting-started">
        <div className="step-indicator">
          <div className="step">
            <span className="step-number">1</span>
            <span className="step-text">Get API Key</span>
          </div>
          <div className="step-divider">→</div>
          <div className="step">
            <span className="step-number">2</span>
            <span className="step-text">Enter Below</span>
          </div>
          <div className="step-divider">→</div>
          <div className="step">
            <span className="step-number">3</span>
            <span className="step-text">Start Session</span>
          </div>
        </div>
      </div>

      <div className="input-section">
        <label htmlFor="api-key-input" className="input-label">
          Gemini API Key
          <span className="required-indicator">*</span>
        </label>
        <div className="input-group">
          <input
            id="api-key-input"
            type="password"
            placeholder="AIzaSy... (paste your API key here)"
            value={apiKey}
            onChange={handleInput}
            className={showApiKeyError ? 'api-key-error' : ''}
            autoFocus
          />
          {apiKey && (
            <button 
              className="clear-button" 
              onClick={() => {
                setApiKey('');
                localStorage.removeItem('apiKey');
              }}
              title="Clear API key"
            >
              ✕
            </button>
          )}
        </div>
        {statusText && statusText.toLowerCase().includes('invalid') && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{statusText}</span>
          </div>
        )}
        {apiKey && !statusText?.toLowerCase().includes('invalid') && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            <span>API key saved. Ready to start!</span>
          </div>
        )}
      </div>

      <button
        onClick={handleStartClick}
        className={`start-button-modern ${isInitializing ? 'initializing' : ''} ${!apiKey ? 'disabled' : ''}`}
        disabled={!apiKey || isInitializing}
      >
        {isInitializing ? (
          <>
            <span className="spinner"></span>
            <span>Initializing...</span>
          </>
        ) : (
          <>
            <span className="button-icon">🚀</span>
            <span>Start Session</span>
            <span className="keyboard-hint">{getStartButtonContent()}</span>
          </>
        )}
      </button>

      <div className="help-section">
        <div className="divider">
          <span>Need Help?</span>
        </div>
        <div className="help-cards">
          <div className="help-card" onClick={onAPIKeyHelp}>
            <span className="card-icon">🔑</span>
            <div className="card-content">
              <h3>Get API Key</h3>
              <p>Free Gemini API key from Google</p>
            </div>
            <span className="card-arrow">→</span>
          </div>
          <div className="help-card" onClick={() => window.open('https://cheatingdaddy.com/docs', '_blank')}>
            <span className="card-icon">📖</span>
            <div className="card-content">
              <h3>Documentation</h3>
              <p>Learn how to use the app</p>
            </div>
            <span className="card-arrow">→</span>
          </div>
          <div className="help-card" onClick={() => window.open('https://cheatingdaddy.com/faq', '_blank')}>
            <span className="card-icon">❓</span>
            <div className="card-content">
              <h3>FAQ</h3>
              <p>Common questions answered</p>
            </div>
            <span className="card-arrow">→</span>
          </div>
        </div>
      </div>

      <div className="features-preview">
        <h3>What You'll Get</h3>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🎥</span>
            <span>Screen Capture</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎤</span>
            <span>Audio Recording</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span>AI Assistance</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <span>Google Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainView;
