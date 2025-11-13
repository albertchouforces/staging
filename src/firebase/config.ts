import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

/*
CRITICAL: FIRESTORE DATABASE MUST BE ENABLED

The 404 error you're seeing means Firestore Database is not enabled in your Firebase project.

TO FIX THIS ERROR:
1. Go to https://console.firebase.google.com/
2. Select your project: test-a29e7
3. In the left sidebar, click "Firestore Database"
4. Click "Create database"
5. Choose "Start in production mode" or "Start in test mode"
6. Select a location for your database (choose one close to your users)
7. Click "Enable"

FIRESTORE DATABASE RULES:
After enabling Firestore, go to Firestore Database > Rules and paste:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /highScores/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}

FIRESTORE INDEXES:
Go to Firestore Database > Indexes and create a composite index:
- Collection: highScores
- Fields to index:
  1. quizID (Ascending)
  2. score (Descending)
  3. timeInMs (Ascending)
- Query scope: Collection

This index enables efficient high score queries sorted by score (descending) then time (ascending).

CLOUDFLARE PAGES DEPLOYMENT:
Add these Firebase config values as environment variables in Cloudflare Pages settings:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Then update the firebaseConfig below to use import.meta.env instead of hardcoded values.
*/

const firebaseConfig = {
  apiKey: "AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc",
  authDomain: "test-a29e7.firebaseapp.com",
  projectId: "test-a29e7",
  storageBucket: "test-a29e7.firebasestorage.app",
  messagingSenderId: "579772147410",
  appId: "1:579772147410:web:a06c3f87f0a41572baaf0b"
};

let app;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Log initialization success
  console.log('✅ Firebase initialized successfully');
  console.log('📊 Firestore Database configured');
  console.log('⚠️  If you see 404 errors, Firestore Database is NOT enabled in Firebase Console');
  console.log('👉 Visit: https://console.firebase.google.com/project/test-a29e7/firestore');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw new Error('Failed to initialize Firebase. Check your configuration.');
}

export { db };
