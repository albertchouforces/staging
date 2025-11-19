import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
FIREBASE SETUP INSTRUCTIONS:

1. Create a Firebase Project:
   - Go to https://console.firebase.google.com/
   - Click "Add project" and follow the setup wizard
   - Once created, click on the web icon (</>) to add a web app
   - Register your app and copy the configuration values below

2. Enable Firestore Database:
   - In the Firebase Console, navigate to "Firestore Database"
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a location closest to your users
   - Click "Enable"

3. Configure Firestore Security Rules:
   - Go to "Firestore Database" > "Rules" tab
   - Replace the default rules with the following:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /highScores/{document=**} {
         allow read: if true;
         allow create: if request.resource.data.keys().hasAll(['quizID', 'name', 'score', 'totalQuestions', 'timeMs', 'createdAt'])
                       && request.resource.data.name is string
                       && request.resource.data.name.size() > 0
                       && request.resource.data.name.size() <= 50
                       && request.resource.data.score is int
                       && request.resource.data.score >= 0
                       && request.resource.data.totalQuestions is int
                       && request.resource.data.totalQuestions > 0
                       && request.resource.data.timeMs is int
                       && request.resource.data.timeMs > 0
                       && request.resource.data.createdAt is timestamp;
         allow update, delete: if false;
       }
     }
   }

   - Click "Publish" to save the rules

4. Create Firestore Indexes:
   - Go to "Firestore Database" > "Indexes" tab
   - Click "Add index" and create the following composite index:
     * Collection ID: highScores
     * Fields to index:
       - quizID (Ascending)
       - timeMs (Ascending)
       - score (Descending)
     * Query scope: Collection
   - Click "Create index" and wait for it to build (usually takes a few minutes)

5. Set Environment Variables:
   - Copy the Firebase configuration values from your Firebase project settings
   - Paste them into the firebaseConfig object below
   - For Cloudflare Pages deployment, add these as environment variables:
     * VITE_FIREBASE_API_KEY
     * VITE_FIREBASE_AUTH_DOMAIN
     * VITE_FIREBASE_PROJECT_ID
     * VITE_FIREBASE_STORAGE_BUCKET
     * VITE_FIREBASE_MESSAGING_SENDER_ID
     * VITE_FIREBASE_APP_ID
   - In Cloudflare Pages dashboard: Settings > Environment variables
   - Add each variable with its corresponding value
   - Redeploy your application after adding environment variables

6. Local Development:
   - Create a .env file in the root directory (it's already in .gitignore)
   - Add the following lines with your actual values:
     VITE_FIREBASE_API_KEY=your_api_key_here
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
     VITE_FIREBASE_PROJECT_ID=your_project_id_here
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
     VITE_FIREBASE_APP_ID=your_app_id_here
*/

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCdWwnMnquWJEnObQxyU6f9Lr8UAsqFH9M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "quizmaster-29504.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "quizmaster-29504",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "quizmaster-29504.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "80497768528",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:80497768528:web:163883837cc69d1cfa3955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
