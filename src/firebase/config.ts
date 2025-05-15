import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
========== FIREBASE SETUP INSTRUCTIONS ==========

1. Create a Firebase project at https://console.firebase.google.com/
2. Register your app in the Firebase console
3. Get your Firebase configuration from Project settings
4. Replace the firebaseConfig object below with your configuration
5. Enable Firestore Database in the Firebase Console

========== FIRESTORE DATABASE SETUP ==========

1. Go to Firestore Database in the Firebase Console
2. Click "Create database"
3. Start in production mode or test mode (you can adjust rules later)
4. Choose a location close to your users

========== FIRESTORE COMPOSITE INDEX SETUP ==========

The high scores query requires a composite index. You will likely see an error in the console
when trying to view high scores that looks like:

"The query requires an index. You can create it here: [URL]"

To create the required index:

Method 1 - Using the error link:
1. When you see the error in your browser console, click on the provided URL
2. This will take you directly to the Firebase console with the index pre-configured
3. Click "Create index" to create the composite index

Method 2 - Manual setup:
1. Go to the Firebase Console > Firestore Database > Indexes tab
2. Click "Add index"
3. Under "Collection ID", enter "highScores"
4. Add the following fields:
   - Field path: "quizId", Order: Ascending
   - Field path: "timeInSeconds", Order: Ascending
   - Field path: "score", Order: Descending
5. Click "Create index"

The index may take a few minutes to build. Once complete, the high scores should display correctly.

========== FIRESTORE SECURITY RULES ==========

Set these rules in the Firebase Console under "Firestore Database" > "Rules":

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /highScores/{scoreId} {
      // Anyone can read high scores
      allow read: if true;
      
      // Only authenticated users can create scores
      // For this demo, we'll allow anyone to write
      allow write: if true;
      
      // In production, you might want rules like:
      // allow write: if request.auth != null && 
      //              request.resource.data.userId == request.auth.uid &&
      //              request.resource.data.score is number &&
      //              request.resource.data.accuracy is number &&
      //              request.resource.data.timeInSeconds is number;
    }
  }
}
```
*/

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc",
  authDomain: "test-a29e7.firebaseapp.com",
  projectId: "test-a29e7",
  storageBucket: "test-a29e7.firebasestorage.app",
  messagingSenderId: "579772147410",
  appId: "1:579772147410:web:a06c3f87f0a41572baaf0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
