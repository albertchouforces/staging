import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/* 
Firebase Setup Instructions:

1. Create a Firebase project:
   - Go to https://console.firebase.google.com/
   - Click "Add project" and follow the setup wizard

2. Register your app:
   - In your project console, click the web icon (</>) to register a web app
   - Give your app a nickname and register it
   - Copy the firebaseConfig object below

3. Enable Firestore:
   - In Firebase console, go to "Firestore Database"
   - Click "Create database"
   - Start in production mode and choose a location

4. Set up Firestore Security Rules:
   - In Firebase console, go to "Firestore Database" > "Rules"
   - Update rules to:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /highScores/{document=**} {
           allow read: if true;
           allow write: if request.resource.data.keys().hasAll(['name', 'quizID', 'score', 'totalQuestions', 'timeTaken', 'date']);
         }
       }
     }
     ```

5. Create indexes for high score queries:
   - In Firebase console, go to "Firestore Database" > "Indexes"
   - Add composite index:
     - Collection ID: highScores
     - Fields to index: 
       * quizID (Ascending)
       * timeTaken (Ascending)
     - Query scope: Collection
*/

// Replace these values with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc",
  authDomain: "test-a29e7.firebaseapp.com",
  projectId: "test-a29e7",
  storageBucket: "test-a29e7.firebasestorage.app",
  messagingSenderId: "579772147410",
  appId: "1:579772147410:web:a06c3f87f0a41572baaf0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
