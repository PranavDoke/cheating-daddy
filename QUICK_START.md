# Quick Start Guide - Cheating Daddy React Edition

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Windows 10/11 (for Windows builds)
- Node.js 16 or higher
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone [your-fork-url]
cd cheating-daddy

# 2. Install dependencies
npm install

# 3. Run the app
npm start
```

That's it! The app will build and launch automatically.

---

## 📝 First Time Setup

### Get a Gemini API Key
1. Visit https://aistudio.google.com/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### Configure the App
1. Launch the app with `npm start`
2. Complete the onboarding (click through 3 steps)
3. Enter your Gemini API key
4. Click "Start Session" or press Ctrl+Enter

---

## ⌨️ Keyboard Shortcuts

### Window Management
- **Ctrl + Arrow Keys**: Move window
- **Ctrl + \\**: Hide/Show window or go back
- **Ctrl + M**: Toggle click-through mode

### Session Controls
- **Ctrl + Enter**: Start session (from main view)
- **Enter**: Send message to AI (in assistant view)
- **Ctrl + [**: Previous response
- **Ctrl + ]**: Next response

### Scrolling (in assistant view)
- **Ctrl + Shift + Up**: Scroll up
- **Ctrl + Shift + Down**: Scroll down

### Emergency
- **Ctrl + Shift + E**: Emergency erase (clear all data)

---

## 🎨 Customization

### Settings (Click the gear icon)
- **Profile**: Interview, Sales Call, Meeting, Presentation, Negotiation
- **Language**: English, Spanish, French, etc.
- **Screenshot Interval**: How often to capture screen (seconds)
- **Image Quality**: Low, Medium, High
- **Layout Mode**: Normal or Compact
- **Advanced Mode**: Enable/disable advanced features

### Compact Mode
Perfect for smaller screens or when you need more space:
1. Go to Settings
2. Change "Layout Mode" to "Compact"
3. Everything shrinks - header, buttons, spacing

---

## 🔧 Development

### Development Mode
```bash
# Run Vite dev server (React only, no Electron)
npm run dev

# Run full Electron app (builds React first)
npm start
```

### Build for Production
```bash
# Build React app to dist/
npm run build

# Package the Electron app
npm run package

# Create installer
npm run make
```

### Project Structure
```
src/
├── react/              # React app source
│   ├── App.jsx        # Main component
│   ├── main.jsx       # Entry point
│   └── components/    # All React components
├── utils/             # Electron utilities
├── assets/            # Static assets
└── index.js           # Electron main process

dist/                  # Built React app
out/                   # Packaged Electron app
```

---

## 📦 Distribution

### Windows Executable
After running `npm run package`, find your app at:
```
out/Cheating Daddy-win32-x64/Cheating Daddy.exe
```

### Windows Installer
After running `npm run make`, find installer at:
```
out/make/squirrel.windows/x64/
```

### macOS (if on Mac)
```
out/make/Cheating Daddy.dmg
```

---

## 🐛 Troubleshooting

### App won't start
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Build fails
```bash
# Clear dist folder
rm -rf dist
npm run build
```

### Vite warnings about scripts
These are normal! The warnings about `<script>` tags not being bundled are expected - those scripts are copied separately.

### Electron window doesn't appear
Check if it's hidden or minimized:
- Press `Ctrl + \` to show/hide
- Check Windows system tray
- Look for "Background Services" in Task Manager

---

## 💡 Tips & Tricks

### 1. Positioning the Window
- Use `Ctrl + Arrow Keys` to move the window around
- Window stays on top of all other windows
- Perfect for keeping visible during meetings

### 2. Click-Through Mode
- Press `Ctrl + M` to make the window ignore mouse clicks
- Click through to windows behind it
- Press `Ctrl + M` again to interact with the window

### 3. Multiple Responses
- AI might give multiple responses to a question
- Use `Ctrl + [` and `Ctrl + ]` to navigate
- Counter shows current response number

### 4. Best Practices
- Keep API key secure (it's stored locally)
- Use appropriate profile for context (Interview, Meeting, etc.)
- Adjust screenshot interval based on your needs (lower = faster response, higher = less API usage)

---

## 🎯 Use Cases

### Job Interviews
1. Select "Interview" profile
2. Start session before interview
3. Position window on screen
4. AI listens and suggests answers in real-time

### Sales Calls
1. Select "Sales Call" profile
2. Get real-time objection handling
3. Receive talking points
4. Close more deals

### Business Meetings
1. Select "Business Meeting" profile  
2. Get meeting minutes suggestions
3. Action item recommendations
4. Smart responses to questions

### Presentations
1. Select "Presentation" profile
2. Get Q&A support
3. Talking points for complex topics
4. Confidence boost

---

## 🔐 Privacy & Security

### Data Storage
- API key stored in localStorage (browser)
- No data sent to external servers (except Gemini API)
- Conversation history local only
- Screenshots temporary (cleared on close)

### Stealth Features
- Random process names
- Window title randomization
- Hidden from taskbar (optional)
- Anti-detection measures

### Best Practices
- Don't share your API key
- Clear history regularly
- Use in private settings
- Respect interview policies

---

## 📞 Support

### Documentation
- [Technical Details](REACT_MIGRATION.md)
- [Project Overview](README_REACT.md)
- [Video Walkthrough](LOOM_VIDEO_SCRIPT.md)
- [Assignment Summary](ASSIGNMENT_SUMMARY.md)

### Issues
- Check GitHub Issues
- Read the original README
- Contact: [Your Email]

### Community
- Original Project: [sohzm/cheating-daddy](https://github.com/sohzm/cheating-daddy)
- Your Fork: [your-fork-url]

---

## 🎓 Learning Resources

### React
- [React Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### Electron
- [Electron Docs](https://www.electronjs.org/docs)
- [Electron Forge](https://www.electronforge.io)

### Vite
- [Vite Docs](https://vite.dev)
- [Vite Guide](https://vite.dev/guide)

---

## ✅ Checklist for First Run

- [ ] Node.js installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Gemini API key obtained
- [ ] App started (`npm start`)
- [ ] Onboarding completed
- [ ] API key entered
- [ ] Session tested
- [ ] Keyboard shortcuts learned
- [ ] Settings configured

---

## 🚀 You're Ready!

The app is now running and ready to assist you. 

**Pro tip**: Practice using it in a safe environment first before relying on it in real situations.

Good luck! 🍀

---

*Questions? Check the documentation or reach out: [Your Email]*
