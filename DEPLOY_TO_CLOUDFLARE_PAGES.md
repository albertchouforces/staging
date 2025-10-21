# Deploying QuizMaster to Cloudflare Pages

This guide will help you deploy QuizMaster to Cloudflare Pages after downloading the code.

## Prerequisites

1. Download and extract the project code
2. Have a GitHub account
3. Have a Cloudflare account with Pages enabled
4. Have Firebase project set up (see Firebase setup in `src/firebase/config.ts`)

## Deployment Steps

### 1. Upload to GitHub

1. Create a new repository on GitHub
2. Upload all the extracted files to your GitHub repository
3. Commit and push the code

### 2. Configure Cloudflare Pages

1. Go to your Cloudflare dashboard
2. Navigate to Pages
3. Click "Create a project"
4. Connect your GitHub account and select your repository

### 3. Build Configuration

In the Cloudflare Pages setup, use these build settings:

**Build command:**
```
npm install && npm run build:pages
```

**Build output directory:**
```
dist/client
```

**Root directory:**
```
/
```

**Environment variables (optional):**
- `NODE_VERSION`: `18`

### 4. Firebase Configuration

Make sure your Firebase configuration in `src/firebase/config.ts` is properly set up:

1. Replace the placeholder Firebase config with your actual project config
2. Ensure Firestore is enabled in your Firebase project
3. Create the required indexes as documented in the file

### 5. Deploy

1. Click "Save and Deploy"
2. Cloudflare Pages will build and deploy your app
3. You'll get a `*.pages.dev` URL for your deployed app

## Important Notes

- The app uses Firebase for high score persistence - this works entirely client-side
- No server-side functionality is needed for Cloudflare Pages deployment
- All quiz data is included in the build (no database required)
- The timer and scoring work entirely in the browser

## Troubleshooting

If you encounter build issues:

1. Ensure Node.js version 18+ is used
2. Clear cache and retry: Delete `node_modules` and `package-lock.json`, then run `npm install`
3. Check that all Firebase configuration values are correct

The build should complete successfully and your QuizMaster app will be live on Cloudflare Pages!
