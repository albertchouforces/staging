import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
Firebase Setup Instructions:

1. Create a Firebase Project:
   - Go to https://console.firebase.google.com/
   - Click "Create a project" and follow the setup wizard
   - Enable Google Analytics if desired

2. Enable Firestore Database:
   - In the Firebase console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" for development (change to production mode later)
   - Select a location for your database

3. Get Firebase Configuration:
   - Go to Project Settings (gear icon)
   - In the "Your apps" section, click "Add app" and select web (</>) 
   - Register your app with a nickname
   - Copy the config object values and update the firebaseConfig below

4. Firestore Security Rules:
   Update your Firestore rules to allow read/write access to high scores:
   
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read access to high scores for all users
       match /highScores/{document} {
         allow read: if true;
         allow write: if true; // In production, add proper authentication
       }
     }
   }

5. Firestore Indexes:
   You'll need to create these composite indexes for efficient high score queries:
   
   Index 1 (for quiz-specific leaderboards):
   Collection: highScores
   Fields: 
   - quizId (Ascending)
   - score (Descending)
   - timeMs (Ascending)
   - __name__ (Ascending)
   
   Index 2 (for global leaderboards):
   Collection: highScores
   Fields:
   - score (Descending) 
   - timeMs (Ascending)
   - __name__ (Ascending)
   
   These indexes enable proper leaderboard ranking by highest score first, then fastest time as tiebreaker.

6. Environment Variables:
   For production, store sensitive config values as environment variables and access via env.
*/

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc",
  authDomain: "test-a29e7.firebaseapp.com",
  projectId: "test-a29e7",
  storageBucket: "test-a29e7.firebasestorage.app",
  messagingSenderId: "579772147410",
  appId: "1:579772147410:web:a06c3f87f0a41572baaf0b"
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;
