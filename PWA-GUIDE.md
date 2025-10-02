# PWA & Query Parameters Guide

## Progressive Web App (PWA) Features

Your portfolio is now a fully functional Progressive Web App with the following features:

### ✨ Features

- **Offline Support**: View the portfolio even without internet connection
- **Installable**: Add to home screen on mobile and desktop
- **Fast Loading**: Cached assets for instant loading
- **App-like Experience**: Full-screen mode without browser chrome
- **Auto-Updates**: Service worker checks for updates hourly

### 📱 Installation

#### Mobile (iOS)
1. Open the site in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

#### Mobile (Android)
1. Open the site in Chrome
2. Tap the three-dot menu
3. Select "Add to Home Screen"
4. Tap "Add"

Or simply wait for the install prompt to appear at the bottom of the screen.

#### Desktop (Chrome/Edge)
1. Look for the install icon in the address bar
2. Click it and follow the prompts

### 🔧 Service Worker

The service worker (`/public/sw.js`) handles:
- Caching of essential assets
- Offline fallback to home page
- Runtime caching of visited pages
- Automatic cache updates

### 📦 Manifest

The app manifest (`/public/manifest.json`) defines:
- App name and description
- Icons for different screen sizes
- Theme colors
- Display mode (standalone)
- Shortcuts for quick access

## Query Parameters

You can control the app behavior using URL query parameters:

### Mode Selection

#### Normal Mode (Default)
```
https://iamsaketh.dev/home
https://iamsaketh.dev/home?mode=normal
```

#### Game Mode (Soulsborne Theme)
```
https://iamsaketh.dev/home?mode=game
```

### Usage Examples

**Direct link to Game Mode:**
```html
<a href="https://iamsaketh.dev/home?mode=game">Visit in Game Mode</a>
```

**Share Game Mode on social media:**
```
Check out my portfolio in game mode! 🎮
https://iamsaketh.dev/home?mode=game
```

**PWA Source Tracking:**
```
https://iamsaketh.dev/?source=pwa
```

### PWA Shortcuts

The manifest includes two shortcuts accessible from the app icon:

1. **Portfolio** - Opens the home page
2. **Game Mode** - Opens directly in game mode

Long-press the app icon on mobile to access these shortcuts.

## Development Notes

### Testing PWA Features

1. **Local Testing:**
   - Use `npm run build && npm run preview` to test the production build
   - PWA features only work over HTTPS or localhost

2. **Service Worker:**
   - Clear service worker cache in DevTools > Application > Service Workers
   - Click "Update" to force service worker refresh

3. **Manifest:**
   - Validate at: https://manifest-validator.appspot.com/
   - Test icons at: https://www.pwabuilder.com/

### Adding New Icons

Create PNG versions for better compatibility:
```bash
# Generate icons from SVG
# 192x192 for Android
# 512x512 for splash screens
# 180x180 for iOS (apple-touch-icon)
```

Place icons in `/public/` directory and update manifest.json.

### Updating the Service Worker

When updating the service worker:
1. Change the `CACHE_NAME` version in `/public/sw.js`
2. Users will automatically get the update
3. Test the update flow in DevTools

## Browser Support

- ✅ Chrome/Edge (Full support)
- ✅ Firefox (Full support)
- ✅ Safari iOS 11.3+ (Limited support, no install prompt)
- ✅ Safari macOS (Add to Dock)
- ❌ IE11 (Not supported, graceful fallback)

## Security

- Service worker only works over HTTPS (except localhost)
- Assets are cached but data remains fresh
- No sensitive data is cached

## Performance Impact

- **First Load**: +~10KB (service worker + manifest)
- **Subsequent Loads**: Instant (cached)
- **Offline**: Full functionality with cached pages

## Analytics

PWA installs are tracked with the `source=pwa` parameter, allowing you to measure:
- Install conversion rate
- PWA user engagement
- Most used shortcuts
