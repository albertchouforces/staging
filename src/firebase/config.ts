import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
Firebase Setup Instructions:

1. Create a Firebase Project:
   - Go to https://console.firebase.google.com/
   - Click "Add project" and follow the setup wizard
   - Choose your project name (e.g., "quizcraft-highscores")

2. Enable Firestore Database:
   - In the Firebase console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" for development (or production mode for live apps)
   - Select your preferred location

3. Get Firebase Configuration:
   - Go to Project Settings (gear icon) > General tab
   - Scroll to "Your apps" section
   - Click "Add app" and select the web icon (</>)
   - Register your app name
   - Copy the firebaseConfig object and replace the one below

4. Set up Environment Variables:
   - Create these secrets in your Mocha app:
     - FIREBASE_API_KEY
     - FIREBASE_AUTH_DOMAIN  
     - FIREBASE_PROJECT_ID
     - FIREBASE_STORAGE_BUCKET
     - FIREBASE_MESSAGING_SENDER_ID
     - FIREBASE_APP_ID

5. Firestore Security Rules (in Firebase console > Firestore Database > Rules):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to highscores collection for all users
       match /highscores/{document} {
         allow read, write: if true;
       }
       // Allow read access to entire highscores collection
       match /highscores {
         allow read: if true;
       }
     }
   }
   ```

   Alternative more secure rules (if you want to limit access):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /highscores/{document} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```

6. Recommended Firestore Indexes (in Firebase console > Firestore Database > Indexes):
   Create composite indexes for efficient querying:
   
   Collection ID: highscores
   Fields indexed:
   - quizId (Ascending)
   - timeMs (Ascending) 
   - accuracy (Descending)
   Query scope: Collection
   
   This index enables efficient sorting by time first, then accuracy for each quiz.

7. Document Structure:
   Each high score document contains:
   - quizId: string (e.g., "general-knowledge")
   - playerName: string
   - correctAnswers: number
   - totalQuestions: number  
   - accuracy: number (0-100)
   - timeMs: number (milliseconds)
   - completedAt: Firebase Timestamp
*/

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
