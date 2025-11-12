# Cloudflare Pages Deployment Guide

## Prerequisites

1. A Cloudflare account
2. Firebase project set up with Firestore database (see src/firebase/config.ts for details)

## Environment Variables

Set the following environment variables in your Cloudflare Pages project settings:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

You can find these values in your Firebase project settings.

## Build Configuration

### Build Command
```bash
vite build --config vite.config.pages.ts
```

### Build Output Directory
```
dist-pages
```

### Root Directory
```
/
```

## Deployment Steps

1. Connect your GitHub/GitLab repository to Cloudflare Pages
2. Configure the build settings:
   - **Build command**: `vite build --config vite.config.pages.ts`
   - **Build output directory**: `dist-pages`
   - **Root directory**: `/`
3. Add the Firebase environment variables in the Pages project settings
4. Deploy!

## SPA Routing

The `public/_redirects` file ensures all routes are handled by the React Router, enabling proper client-side routing.

## Local Testing

To test the Pages build locally:

```bash
# Build for Pages
vite build --config vite.config.pages.ts

# Preview the build
vite preview --outDir dist-pages
```

## Notes

- The Pages configuration uses a separate Vite config file (`vite.config.pages.ts`) to avoid conflicts with the Cloudflare Workers deployment
- The React plugin has been updated to version 5.0.0+ for full Vite 7 compatibility
- Firebase environment variables are injected at build time through the Vite config
