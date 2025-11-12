import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
FIREBASE SETUP INSTRUCTIONS

1. Create a Firebase project at https://console.firebase.google.com/

2. Enable Firestore Database:
   - Go to Firestore Database in the Firebase console
   - Click "Create Database"
   - Choose "Start in production mode"
   - Select a region close to your users

3. Set up Firestore Security Rules:
   - Go to Firestore Database > Rules
   - Replace the default rules with:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /highScores/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}

4. Create Composite Indexes:
   - Go to Firestore Database > Indexes
   - Click "Create Index"
   - Collection ID: highScores
   - Add fields in this order:
     a. quiz_id (Ascending)
     b. time_milliseconds (Ascending)
     c. score (Descending)
   - Query scope: Collection
   - Click "Create Index"

5. Get your Firebase configuration:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app
   - Copy the firebaseConfig object
   - Add the values to your Cloudflare Workers secrets (see wrangler.toml)

6. Add Firebase config to Cloudflare Workers secrets:
   Run these commands in your terminal:

npx wrangler secret put FIREBASE_API_KEY
npx wrangler secret put FIREBASE_AUTH_DOMAIN
npx wrangler secret put FIREBASE_PROJECT_ID
npx wrangler secret put FIREBASE_STORAGE_BUCKET
npx wrangler secret put FIREBASE_MESSAGING_SENDER_ID
npx wrangler secret put FIREBASE_APP_ID

7. Test your setup:
   - Try submitting a high score from the app
   - Check the Firestore console to see if the data appears
   - Verify that high scores are fetched and displayed correctly
*/

/* Firebase configuration - these values come from environment variables */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'test-a29e7.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'test-a29e7',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'test-a29e7.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '579772147410',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:579772147410:web:a06c3f87f0a41572baaf0b',
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Initialize Firestore */
export const db = getFirestore(app);
