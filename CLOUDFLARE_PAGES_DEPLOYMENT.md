# Cloudflare Pages Deployment Guide

## Prerequisites

1. A Cloudflare account
2. Firebase project set up with Firestore database (see src/firebase/config.ts for details)

## Environment Variables Setup

**IMPORTANT**: Cloudflare Pages automatically exposes environment variables prefixed with `VITE_` to your Vite build process. You MUST set these variables in your Cloudflare Pages project dashboard for them to be available during the build.

### Setting Environment Variables in Cloudflare Pages:

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

**Note**: Vite automatically picks up any environment variables prefixed with `VITE_` and makes them available via `import.meta.env`. No additional configuration is needed in vite.config.pages.ts.

### Where to Find Firebase Credentials:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the **gear icon** (Settings) > **Project Settings**
4. Scroll down to **Your apps** section
5. Click on your web app (or create one if you haven't)
6. Copy the values from the `firebaseConfig` object

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

3. Deploy! The Firebase environment variables from wrangler.toml will be automatically available during the build process.

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
- **Environment variables MUST be set in the Cloudflare Pages dashboard** - the wrangler.toml file is for Workers only and does not affect Pages builds
- Vite automatically exposes environment variables prefixed with `VITE_` to your client-side code via `import.meta.env`
- After setting environment variables in the dashboard, trigger a new deployment for the changes to take effect
- You can verify environment variables are working by checking the build logs in Cloudflare Pages
- Do NOT use `define` in vite.config.pages.ts to manually inject environment variables - this prevents Vite's automatic environment variable handling
