import React from 'react';

const HelpView = ({ onExternalLinkClick }) => {
  return (
    <div style={{ padding: '20px', color: 'var(--text-color)' }}>
      <h2 style={{ marginBottom: '20px' }}>Help & Shortcuts</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Keyboard Shortcuts</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Ctrl/Cmd + Arrow Keys:</strong> Move window
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Ctrl/Cmd + M:</strong> Toggle click-through mode
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Ctrl/Cmd + \:</strong> Close window or go back
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Enter:</strong> Send message to AI
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Getting Started</h3>
        <p style={{ lineHeight: 1.6, color: 'var(--description-color)' }}>
          1. Get your Gemini API key from{' '}
          <span
            onClick={() => onExternalLinkClick('https://aistudio.google.com/apikey')}
            style={{ color: 'var(--link-color)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Google AI Studio
          </span>
        </p>
        <p style={{ lineHeight: 1.6, color: 'var(--description-color)' }}>
          2. Enter your API key in the main screen
        </p>
        <p style={{ lineHeight: 1.6, color: 'var(--description-color)' }}>
          3. Choose your profile and language in settings
        </p>
        <p style={{ lineHeight: 1.6, color: 'var(--description-color)' }}>
          4. Click "Start Session" to begin
        </p>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>About</h3>
        <p style={{ lineHeight: 1.6, color: 'var(--description-color)' }}>
          Cheating Daddy is a real-time AI assistant that provides contextual help during video calls,
          interviews, presentations, and meetings using screen capture and audio analysis.
        </p>
      </div>
    </div>
  );
};

export default HelpView;
