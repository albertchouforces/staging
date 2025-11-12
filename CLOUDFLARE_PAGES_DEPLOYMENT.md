# Cloudflare Pages Deployment Guide

## Prerequisites

1. A Cloudflare account
2. Firebase project set up with Firestore database (see src/firebase/config.ts for details)

## Firebase Configuration

The app uses Firebase credentials defined in `src/firebase/config.ts`. These default values work out of the box for Cloudflare Pages deployment - no environment variable configuration is required.

### To Use Your Own Firebase Project (Optional):

If you want to use a different Firebase project, you have two options:

**Option 1: Update config.ts directly (Recommended)**
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the **gear icon** (Settings) > **Project Settings**
4. Scroll down to **Your apps** section
5. Click on your web app (or create one if you haven't)
6. Copy the values from the `firebaseConfig` object
7. Update the default values in `src/firebase/config.ts`

**Option 2: Use environment variables**
1. Go to your Cloudflare dashboard
2. Navigate to **Workers & Pages**
3. Select your Pages project
4. Go to **Settings** > **Environment variables**
5. Add the following variables for both **Production** and **Preview** environments:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

Environment variables will override the default values in config.ts if set

## Build Configuration

### Build Command
```bash
vite build --config vite.config.pages.ts
```

### Build Output Directory
```
dist
```

### Root Directory
```
/
```

## Deployment Steps

1. Connect your GitHub/GitLab repository to Cloudflare Pages

2. Configure the build settings:
   - **Build command**: `vite build --config vite.config.pages.ts`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

3. Deploy! The app will use the Firebase credentials from `src/firebase/config.ts` automatically.

## SPA Routing

The `public/_redirects` file ensures all routes are handled by the React Router, enabling proper client-side routing.

## Local Testing

To test the Pages build locally:

```bash
# Build for Pages
vite build --config vite.config.pages.ts

# Preview the build
vite preview --outDir dist
```

## Important Notes

- The Pages configuration uses a separate Vite config file (`vite.config.pages.ts`) to avoid conflicts with the Cloudflare Workers deployment
- The React plugin has been updated to version 5.0.0+ for full Vite 7 compatibility
- Firebase configuration is defined in `src/firebase/config.ts` with default values that work out of the box
- Environment variables are optional and only needed if you want to override the default Firebase config
- The wrangler.toml file is for Workers only and does not affect Pages builds
- If using environment variables, they must be set in the Cloudflare Pages dashboard (not wrangler.toml)
- Vite automatically exposes environment variables prefixed with `VITE_` to your client-side code via `import.meta.env`
