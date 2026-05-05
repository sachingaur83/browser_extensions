# Hide YouTube Shorts Extension

A Chrome extension that removes YouTube Shorts from the YouTube website.

## Features
- Hides YouTube Shorts shelf elements
- Removes Shorts links from navigation
- Redirects users away from the Shorts page
- Mutes Shorts videos
- Allows custom blocklist patterns through the options page

## Installation
1. Clone or download this extension
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the extension
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode" (top right)
6. Click "Load unpacked" and select the `dist` folder

## Project Structure
```
├── src/
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Service worker
│   ├── content.js         # Content script
│   ├── options.js         # Options page logic
│   └── options.html       # Options page UI
├── dist/                  # Built files (generated)
├── package.json
├── webpack.config.js
└── README.md
```

## How It Works
- **background.js**: Sets up redirect rules to redirect YouTube Shorts URLs
- **content.js**: Runs on YouTube pages to hide/remove Shorts elements and mute videos
- **options.html/js**: Allows users to add custom URL patterns to block

## License
ISC
