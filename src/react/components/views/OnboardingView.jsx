import React, { useState } from 'react';
import './OnboardingView.css';

const OnboardingView = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Cheating Daddy',
      content: 'Your AI assistant for interviews, meetings, and presentations.',
    },
    {
      title: 'Get Started',
      content: 'You\'ll need a Gemini API key to use this app. Click next to continue.',
    },
    {
      title: 'Ready!',
      content: 'You\'re all set! Let\'s get started.',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboardingCompleted', 'true');
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onComplete();
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <h1 className="onboarding-title">{steps[currentStep].title}</h1>
        <p className="onboarding-text">{steps[currentStep].content}</p>
        
        <div className="onboarding-buttons">
          {currentStep > 0 && (
            <button onClick={handlePrevious} className="onboarding-button secondary">
              Previous
            </button>
          )}
          <button onClick={handleNext} className="onboarding-button primary">
            {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
          </button>
          {currentStep < steps.length - 1 && (
            <button onClick={handleSkip} className="onboarding-button secondary">
              Skip
            </button>
          )}
        </div>

        <div className="onboarding-dots">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentStep ? 'active' : ''}`}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
