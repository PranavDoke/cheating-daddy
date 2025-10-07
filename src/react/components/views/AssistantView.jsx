import React, { useState, useEffect, useRef } from 'react';
import './AssistantView.css';

const AssistantView = ({
  responses,
  currentResponseIndex,
  selectedProfile,
  onSendText,
  shouldAnimateResponse,
  onResponseIndexChanged,
  onResponseAnimationComplete,
}) => {
  const [message, setMessage] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const responseRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendText(message);
      setMessage('');
      // Show modal when a new response comes in
      setShowResponseModal(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCloseModal = () => {
    setShowResponseModal(false);
  };

  const handlePrevious = () => {
    onResponseIndexChanged(Math.max(0, currentResponseIndex - 1));
  };

  const handleNext = () => {
    onResponseIndexChanged(Math.min(responses.length - 1, currentResponseIndex + 1));
  };

  // Auto-show modal when new response arrives
  useEffect(() => {
    if (responses.length > 0 && currentResponseIndex >= 0) {
      setShowResponseModal(true);
    }
  }, [responses.length]);

  // Scroll to top when response changes
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = 0;
    }
  }, [currentResponseIndex]);

  const currentResponse = responses[currentResponseIndex] || '';
  const hasMultipleResponses = responses.length > 1;

  return (
    <div className="assistant-view">
      {/* Listening indicator when no responses */}
      {responses.length === 0 && (
        <div className="listening-indicator">
          <div className="pulse-dot"></div>
          <p>Listening for questions... The AI will respond when it hears something.</p>
        </div>
      )}

      {/* Full-screen Response Modal */}
      {showResponseModal && responses.length > 0 && (
        <div className="response-modal-overlay">
          <div className="response-modal">
            <div className="modal-header">
              <div className="response-badge">
                <span className="ai-icon">🤖</span>
                <span>AI Response</span>
                {hasMultipleResponses && (
                  <span className="response-counter">
                    {currentResponseIndex + 1} / {responses.length}
                  </span>
                )}
              </div>
              <button className="close-modal-button" onClick={handleCloseModal} title="Close (ESC)">
                ✕
              </button>
            </div>

            <div className="modal-content" ref={responseRef}>
              <div 
                className="response-text-full" 
                dangerouslySetInnerHTML={{ __html: currentResponse }}
              />
            </div>

            {hasMultipleResponses && (
              <div className="modal-navigation">
                <button
                  onClick={handlePrevious}
                  disabled={currentResponseIndex === 0}
                  className="nav-button-modal prev"
                  title="Previous Response (Ctrl+[)"
                >
                  <span className="nav-arrow">←</span>
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentResponseIndex === responses.length - 1}
                  className="nav-button-modal next"
                  title="Next Response (Ctrl+])"
                >
                  <span>Next</span>
                  <span className="nav-arrow">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compact Response Preview (when modal is closed) */}
      {!showResponseModal && responses.length > 0 && (
        <div className="response-preview" onClick={() => setShowResponseModal(true)}>
          <div className="preview-header">
            <span className="preview-icon">💬</span>
            <span>Latest Response</span>
            <span className="preview-badge">{responses.length}</span>
          </div>
          <div className="preview-text">
            {currentResponse.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </div>
          <div className="preview-action">Click to view full response</div>
        </div>
      )}
      
      {/* Message Input Area */}
      <div className="input-area">
        <div className="input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question to the AI..."
            className="message-input"
            autoFocus
          />
          <button 
            onClick={handleSend} 
            className="send-button"
            disabled={!message.trim()}
          >
            <span className="send-icon">📤</span>
            <span>Send</span>
          </button>
        </div>
        <div className="input-hint">
          Press <kbd>Enter</kbd> to send • <kbd>Shift+Enter</kbd> for new line
        </div>
      </div>
    </div>
  );
};

export default AssistantView;
