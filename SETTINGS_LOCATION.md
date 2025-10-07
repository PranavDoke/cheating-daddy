# Settings/Customize Button Location

## ✅ The Settings Button IS Present!

The settings/customize button is **fully integrated** in your React migration and should be visible in the app header.

---

## 📍 Where to Find the Settings Button

### Location
The settings button appears in the **top-right area of the header** when you're on the **Main View** (landing page).

### Visual Appearance
- **Icon**: Gear/cog icon ⚙️
- **Position**: In the header, between the "Advanced Tools" button (if enabled) and the "Help" button
- **Color**: Semi-transparent gray, becomes more visible on hover

### Header Button Order (on Main View)
From left to right in the header actions area:
1. **History** button (book icon) 📖
2. **Advanced Tools** button (beaker icon) 🧪 *(only if Advanced Mode is enabled)*
3. **Settings** button (gear icon) ⚙️ ← **This is your settings button!**
4. **Help** button (question mark icon) ❓
5. **Close** button (X icon) ✖️

---

## 🎯 How to Access Settings

### Method 1: Click the Settings Button
1. Ensure you're on the **Main View** (landing page with API key input)
2. Look at the top-right corner of the window
3. Click the **gear icon** (⚙️) button
4. The Customize Settings view will open

### Method 2: Check if You're on the Right View
If you don't see the settings button, you might be on a different view:
- **Onboarding View**: Complete the onboarding first
- **Assistant View**: Close the active session to return to main view
- **Other Views**: Click the back/close button to return to main view

---

## 🔧 Settings Available

When you click the settings/customize button, you'll see:

### 1. **Profile Selection**
- Interview
- Sales Call
- Meeting
- Presentation

### 2. **Language Selection**
- English (US)
- Spanish
- French

### 3. **Screenshot Interval**
- Adjustable in seconds
- Controls how often screen captures are taken

### 4. **Image Quality**
- Low
- Medium
- High

### 5. **Layout Mode**
- Normal
- Compact

### 6. **Advanced Mode**
- Toggle checkbox
- Enables additional advanced tools

---

## 🐛 Troubleshooting

### "I don't see the settings button!"

**Check these things:**

1. **Are you on the Main View?**
   - Settings button only appears on the main landing page
   - If you're in an active session (Assistant View), close it first
   - If you're in Help/History/etc, click the back button

2. **Is the window too small?**
   - The header buttons might be cut off if the window is very small
   - Try resizing the window

3. **Check the header area**
   - Look for the gear icon (⚙️) in the top-right corner
   - It's between other icon buttons

4. **Restart the app**
   - Close and reopen the application
   - The button should appear on the main view

---

## 💻 Code Location (for developers)

The settings button is defined in:
- **Component**: `src/react/components/app/AppHeader.jsx`
- **Lines**: ~169-196
- **Handler**: `onCustomizeClick` prop (line 155 in App.jsx)
- **View**: `src/react/components/views/CustomizeView.jsx`

### Code Snippet (AppHeader.jsx):
```jsx
<button className="icon-button" onClick={onCustomizeClick}>
  <svg
    width="24px"
    height="24px"
    strokeWidth="1.7"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    {/* Gear/Settings icon paths */}
  </svg>
</button>
```

---

## ✅ Verification

To verify the settings button is working:

1. **Open the app**: `npm start`
2. **Wait for main view**: Should see API key input field
3. **Look at header**: Top-right corner
4. **Count buttons**: You should see 3-4 icon buttons (History, Settings, Help, Close)
5. **Click gear icon**: Should navigate to Customize Settings view

---

## 📸 What You Should See

### Main View Header:
```
[Cheating Daddy]                    [📖] [⚙️] [❓] [✖️]
```

### After Clicking Settings Button:
```
[Customize]                                      [✖️]

Customize Settings
─────────────────
Profile: [Interview ▼]
Language: [English (US) ▼]
Screenshot Interval: [5]
Image Quality: [Medium ▼]
Layout Mode: [Normal ▼]
☐ Advanced Mode
```

---

## 🎨 Settings Button CSS

The button uses these styles:
- **Class**: `icon-button`
- **Opacity**: 0.6 (default), 1.0 (on hover)
- **Background**: None (transparent)
- **Hover**: Slight gray background
- **Icon size**: 24px × 24px

---

**Status**: ✅ Settings button is **fully functional** and **integrated** in the React migration!

If you still don't see it after checking these points, please provide a screenshot or describe what you see in the header area.
