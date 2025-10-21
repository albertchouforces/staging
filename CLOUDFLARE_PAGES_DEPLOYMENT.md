# Deploying QuizMaster to Cloudflare Pages

## Step-by-Step Deployment Guide

### 1. Download and Upload to GitHub
1. Download the project code and extract it
2. Create a new GitHub repository 
3. Upload all files to your repository and push

### 2. Cloudflare Pages Configuration

When setting up your Cloudflare Pages project, use these exact settings:

**Framework preset:** `None` (or `Vite` if available)

**Build command:**
```
npm install && npm run build
```

**Build output directory:**
```
dist/client
```

**Root directory:** `/` (leave empty)

**Node.js version:** `18` or `20`

### 3. Environment Variables (Optional)
In Cloudflare Pages settings, you can add:
- `NODE_VERSION`: `18`

### 4. Firebase Setup
Before deploying, update `src/firebase/config.ts` with your Firebase project credentials:

1. Go to Firebase Console → Project Settings → General
2. In "Your apps" section, find your web app config
3. Replace the config object in the file with your actual values
4. Enable Firestore Database in Firebase Console
5. Create the required Firestore indexes (see instructions in the config file)

### 5. Build Verification
The current build outputs:
- `dist/client/` - Contains the static React app files
- `dist/client/index.html` - Main HTML file
- `dist/client/assets/` - CSS and JavaScript bundles

This structure is perfect for Cloudflare Pages static hosting.

### 6. Deployment
1. In Cloudflare Pages, click "Create a project"
2. Connect to your GitHub repository
3. Use the build settings above
4. Deploy!

## Key Points:
- ✅ Build works correctly (verified)
- ✅ Outputs static files to `dist/client/`
- ✅ React Router configured for SPA
- ✅ Firebase works client-side only
- ✅ No server-side code needed

The app will work perfectly on Cloudflare Pages as a static site with client-side Firebase integration for high scores.
