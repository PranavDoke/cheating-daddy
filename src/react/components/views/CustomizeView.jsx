import React from 'react';

const CustomizeView = ({
  selectedProfile,
  selectedLanguage,
  selectedScreenshotInterval,
  selectedImageQuality,
  layoutMode,
  advancedMode,
  onProfileChange,
  onLanguageChange,
  onScreenshotIntervalChange,
  onImageQualityChange,
  onLayoutModeChange,
  onAdvancedModeChange,
}) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Customize Settings</h2>
      
      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-color)' }}>
          Profile:
        </label>
        <select 
          value={selectedProfile} 
          onChange={(e) => onProfileChange(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            background: 'var(--input-background)',
            color: 'var(--text-color)',
            border: '1px solid var(--button-border)'
          }}
        >
          <option value="interview">Interview</option>
          <option value="sales">Sales Call</option>
          <option value="meeting">Meeting</option>
          <option value="presentation">Presentation</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-color)' }}>
          Language:
        </label>
        <select 
          value={selectedLanguage} 
          onChange={(e) => onLanguageChange(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            background: 'var(--input-background)',
            color: 'var(--text-color)',
            border: '1px solid var(--button-border)'
          }}
        >
          <option value="en-US">English (US)</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-color)' }}>
          Screenshot Interval (seconds):
        </label>
        <input
          type="number"
          value={selectedScreenshotInterval}
          onChange={(e) => onScreenshotIntervalChange(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            background: 'var(--input-background)',
            color: 'var(--text-color)',
            border: '1px solid var(--button-border)'
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-color)' }}>
          Image Quality:
        </label>
        <select 
          value={selectedImageQuality} 
          onChange={(e) => onImageQualityChange(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            background: 'var(--input-background)',
            color: 'var(--text-color)',
            border: '1px solid var(--button-border)'
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-color)' }}>
          Layout Mode:
        </label>
        <select 
          value={layoutMode} 
          onChange={(e) => onLayoutModeChange(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            background: 'var(--input-background)',
            color: 'var(--text-color)',
            border: '1px solid var(--button-border)'
          }}
        >
          <option value="normal">Normal</option>
          <option value="compact">Compact</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', color: 'var(--text-color)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={advancedMode}
            onChange={(e) => onAdvancedModeChange(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Advanced Mode
        </label>
      </div>
    </div>
  );
};

export default CustomizeView;
