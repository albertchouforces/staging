import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
FIREBASE SETUP INSTRUCTIONS:

1. Create a Firebase project at https://console.firebase.google.com/
2. Add a web app to your project
3. Copy the Firebase config values below into the firebaseConfig object
4. Enable Firestore Database in your Firebase console

FIRESTORE DATABASE RULES:
Go to Firestore Database > Rules and paste:

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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "test-a29e7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "test-a29e7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "test-a29e7.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "579772147410",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:579772147410:web:a06c3f87f0a41572baaf0b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
