import React, { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './components/app/AppHeader';
import MainView from './components/views/MainView';
import CustomizeView from './components/views/CustomizeView';
import HelpView from './components/views/HelpView';
import HistoryView from './components/views/HistoryView';
import AssistantView from './components/views/AssistantView';
import OnboardingView from './components/views/OnboardingView';
import AdvancedView from './components/views/AdvancedView';

const App = () => {
  const [currentView, setCurrentView] = useState(
    localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding'
  );
  const [statusText, setStatusText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(
    localStorage.getItem('selectedProfile') || 'interview'
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('selectedLanguage') || 'en-US'
  );
  const [responses, setResponses] = useState([]);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(-1);
  const [selectedScreenshotInterval, setSelectedScreenshotInterval] = useState(
    localStorage.getItem('selectedScreenshotInterval') || '5'
  );
  const [selectedImageQuality, setSelectedImageQuality] = useState(
    localStorage.getItem('selectedImageQuality') || 'medium'
  );
  const [layoutMode, setLayoutMode] = useState(
    localStorage.getItem('layoutMode') || 'normal'
  );
  const [advancedMode, setAdvancedMode] = useState(
    localStorage.getItem('advancedMode') === 'true'
  );
  const [isClickThrough, setIsClickThrough] = useState(false);
  const [awaitingNewResponse, setAwaitingNewResponse] = useState(false);
  const [currentResponseIsComplete, setCurrentResponseIsComplete] = useState(true);
  const [shouldAnimateResponse, setShouldAnimateResponse] = useState(false);

  // Apply layout mode to document root
  useEffect(() => {
    updateLayoutMode();
  }, [layoutMode]);

  useEffect(() => {
    // Set up IPC listeners
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      
      const updateResponseHandler = (_, response) => {
        handleSetResponse(response);
      };
      
      const updateStatusHandler = (_, status) => {
        handleSetStatus(status);
        
        // If session failed due to invalid API key, go back to main view
        if (status && status.toLowerCase().includes('api key not valid')) {
          setCurrentView('main');
          setSessionActive(false);
          setStatusText('Invalid API key. Please check your key and try again.');
        }
      };
      
      const clickThroughHandler = (_, isEnabled) => {
        setIsClickThrough(isEnabled);
      };

      ipcRenderer.on('update-response', updateResponseHandler);
      ipcRenderer.on('update-status', updateStatusHandler);
      ipcRenderer.on('click-through-toggled', clickThroughHandler);

      return () => {
        ipcRenderer.removeAllListeners('update-response');
        ipcRenderer.removeAllListeners('update-status');
        ipcRenderer.removeAllListeners('click-through-toggled');
      };
    }
  }, []);

  // Notify main process when view changes
  useEffect(() => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('view-changed', currentView);
    }
  }, [currentView]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('selectedProfile', selectedProfile);
  }, [selectedProfile]);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem('selectedScreenshotInterval', selectedScreenshotInterval);
  }, [selectedScreenshotInterval]);

  useEffect(() => {
    localStorage.setItem('selectedImageQuality', selectedImageQuality);
  }, [selectedImageQuality]);

  useEffect(() => {
    localStorage.setItem('layoutMode', layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    localStorage.setItem('advancedMode', advancedMode.toString());
  }, [advancedMode]);

  const handleSetStatus = (text) => {
    setStatusText(text);
    
    if (text.includes('Ready') || text.includes('Listening') || text.includes('Error')) {
      setCurrentResponseIsComplete(true);
      console.log('[setStatus] Marked current response as complete');
    }
  };

  const handleSetResponse = (response) => {
    const isFillerResponse =
      response.length < 30 &&
      (response.toLowerCase().includes('hmm') ||
        response.toLowerCase().includes('okay') ||
        response.toLowerCase().includes('next') ||
        response.toLowerCase().includes('go on') ||
        response.toLowerCase().includes('continue'));

    if (awaitingNewResponse || responses.length === 0) {
      setResponses(prev => [...prev, response]);
      setCurrentResponseIndex(responses.length);
      setAwaitingNewResponse(false);
      setCurrentResponseIsComplete(false);
      console.log('[setResponse] Pushed new response:', response);
    } else if (!currentResponseIsComplete && !isFillerResponse && responses.length > 0) {
      setResponses(prev => [...prev.slice(0, prev.length - 1), response]);
      console.log('[setResponse] Updated last response:', response);
    } else {
      setResponses(prev => [...prev, response]);
      setCurrentResponseIndex(responses.length);
      setCurrentResponseIsComplete(false);
      console.log('[setResponse] Added response as new:', response);
    }
    setShouldAnimateResponse(true);
  };

  const handleCustomizeClick = () => {
    setCurrentView('customize');
  };

  const handleHelpClick = () => {
    setCurrentView('help');
  };

  const handleHistoryClick = () => {
    setCurrentView('history');
  };

  const handleAdvancedClick = () => {
    setCurrentView('advanced');
  };

  const handleClose = async () => {
    if (currentView === 'customize' || currentView === 'help' || currentView === 'history') {
      setCurrentView('main');
    } else if (currentView === 'assistant') {
      window.cheddar.stopCapture();

      if (window.require) {
        const { ipcRenderer } = window.require('electron');
        await ipcRenderer.invoke('close-session');
      }
      setSessionActive(false);
      setCurrentView('main');
      console.log('Session closed');
    } else {
      if (window.require) {
        const { ipcRenderer } = window.require('electron');
        await ipcRenderer.invoke('quit-application');
      }
    }
  };

  const handleHideToggle = async () => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      await ipcRenderer.invoke('toggle-window-visibility');
    }
  };

  const handleStart = async () => {
    const apiKey = localStorage.getItem('apiKey')?.trim();
    if (!apiKey || apiKey === '') {
      // Notify MainView to show error
      if (window.require) {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send('api-key-error');
      }
      return false;
    }

    try {
      await window.cheddar.initializeGemini(selectedProfile, selectedLanguage);
      window.cheddar.startCapture(selectedScreenshotInterval, selectedImageQuality);
      setResponses([]);
      setCurrentResponseIndex(-1);
      setStartTime(Date.now());
      setCurrentView('assistant');
      setSessionActive(true);
      return true;
    } catch (error) {
      console.error('Failed to start session:', error);
      setStatusText('Failed to start session');
      return false;
    }
  };

  const handleAPIKeyHelp = async () => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      await ipcRenderer.invoke('open-external', 'https://cheatingdaddy.com/help/api-key');
    }
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleScreenshotIntervalChange = (interval) => {
    setSelectedScreenshotInterval(interval);
  };

  const handleImageQualityChange = (quality) => {
    setSelectedImageQuality(quality);
  };

  const handleAdvancedModeChange = (mode) => {
    setAdvancedMode(mode);
  };

  const handleBackClick = () => {
    setCurrentView('main');
  };

  const handleExternalLinkClick = async (url) => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      await ipcRenderer.invoke('open-external', url);
    }
  };

  const handleSendText = async (message) => {
    const result = await window.cheddar.sendTextMessage(message);

    if (!result.success) {
      console.error('Failed to send message:', result.error);
      handleSetStatus('Error sending message: ' + result.error);
    } else {
      handleSetStatus('Message sent...');
      setAwaitingNewResponse(true);
    }
  };

  const handleResponseIndexChanged = (index) => {
    setCurrentResponseIndex(index);
    setShouldAnimateResponse(false);
  };

  const handleOnboardingComplete = () => {
    setCurrentView('main');
  };

  const updateLayoutMode = () => {
    if (layoutMode === 'compact') {
      document.documentElement.classList.add('compact-layout');
    } else {
      document.documentElement.classList.remove('compact-layout');
    }
  };

  const handleLayoutModeChange = async (mode) => {
    setLayoutMode(mode);
    
    if (window.require) {
      try {
        const { ipcRenderer } = window.require('electron');
        await ipcRenderer.invoke('update-sizes');
      } catch (error) {
        console.error('Failed to update sizes in main process:', error);
      }
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'onboarding':
        return (
          <OnboardingView
            onComplete={handleOnboardingComplete}
            onClose={handleClose}
          />
        );

      case 'main':
        return (
          <MainView
            onStart={handleStart}
            onAPIKeyHelp={handleAPIKeyHelp}
            onLayoutModeChange={handleLayoutModeChange}
            statusText={statusText}
          />
        );

      case 'customize':
        return (
          <CustomizeView
            selectedProfile={selectedProfile}
            selectedLanguage={selectedLanguage}
            selectedScreenshotInterval={selectedScreenshotInterval}
            selectedImageQuality={selectedImageQuality}
            layoutMode={layoutMode}
            advancedMode={advancedMode}
            onProfileChange={handleProfileChange}
            onLanguageChange={handleLanguageChange}
            onScreenshotIntervalChange={handleScreenshotIntervalChange}
            onImageQualityChange={handleImageQualityChange}
            onLayoutModeChange={handleLayoutModeChange}
            onAdvancedModeChange={handleAdvancedModeChange}
          />
        );

      case 'help':
        return <HelpView onExternalLinkClick={handleExternalLinkClick} />;

      case 'history':
        return <HistoryView />;

      case 'advanced':
        return <AdvancedView />;

      case 'assistant':
        return (
          <AssistantView
            responses={responses}
            currentResponseIndex={currentResponseIndex}
            selectedProfile={selectedProfile}
            onSendText={handleSendText}
            shouldAnimateResponse={shouldAnimateResponse}
            onResponseIndexChanged={handleResponseIndexChanged}
            onResponseAnimationComplete={() => {
              setShouldAnimateResponse(false);
              setCurrentResponseIsComplete(true);
              console.log('[response-animation-complete] Marked current response as complete');
            }}
          />
        );

      default:
        return <div>Unknown view: {currentView}</div>;
    }
  };

  const mainContentClass = `main-content ${
    currentView === 'assistant'
      ? 'assistant-view'
      : currentView === 'onboarding'
      ? 'onboarding-view'
      : 'with-border'
  }`;

  return (
    <div className="window-container">
      <div className="container">
        <AppHeader
          currentView={currentView}
          statusText={statusText}
          startTime={startTime}
          advancedMode={advancedMode}
          onCustomizeClick={handleCustomizeClick}
          onHelpClick={handleHelpClick}
          onHistoryClick={handleHistoryClick}
          onAdvancedClick={handleAdvancedClick}
          onCloseClick={handleClose}
          onBackClick={handleBackClick}
          onHideToggleClick={handleHideToggle}
          isClickThrough={isClickThrough}
        />
        <div className={mainContentClass}>
          <div className="view-container">{renderCurrentView()}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
