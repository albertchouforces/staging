# Cloudflare Pages Deployment Guide

## Prerequisites

1. A Cloudflare account
2. Firebase project set up with Firestore database (see src/firebase/config.ts for details)

## Environment Variables

The Firebase environment variables are configured in `wrangler.toml` under `[env.production.vars]` and `[env.preview.vars]` sections. These will be automatically available during the Cloudflare Pages build process.

If you need to update the Firebase credentials:

1. Edit `wrangler.toml` and update the values in both the `[env.production.vars]` and `[env.preview.vars]` sections
2. Commit and push your changes

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

## Notes

- The Pages configuration uses a separate Vite config file (`vite.config.pages.ts`) to avoid conflicts with the Cloudflare Workers deployment
- The React plugin has been updated to version 5.0.0+ for full Vite 7 compatibility
- Firebase environment variables are defined in wrangler.toml and injected at build time through the Vite config
