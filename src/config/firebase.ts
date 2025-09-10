// Firebase Configuration
// ======================
// 
// This file contains the configuration for Firebase and instructions on how to set it up.
//
// === SETUP INSTRUCTIONS ===
//
// 1. Create a Firebase account at https://firebase.google.com/
//
// 2. Create a new Firebase project:
//    - Go to the Firebase console: https://console.firebase.google.com/
//    - Click "Add project"
//    - Enter a project name (e.g., "Navy Signal Flags Quiz")
//    - Enable Google Analytics if desired (optional)
//    - Click "Create project"
//
// 3. Set up Firestore Database:
//    - In your Firebase project, go to "Firestore Database" in the left sidebar
//    - Click "Create database"
//    - Start in production mode (or test mode if you're just testing)
//    - Choose a location that's closest to your primary users
//    - Click "Enable"
//
// 4. Create a Web App:
//    - In your Firebase project, click on the gear icon next to "Project Overview"
//    - Select "Project settings"
//    - In the "Your apps" section, click the web icon (</>) to add a web app
//    - Register your app with a nickname (e.g., "Navy Signal Flags Web")
//    - No need to set up Firebase Hosting unless you want to
//    - Click "Register app"
//
// 5. Copy Your Firebase Configuration:
//    - After registering, you'll see a configuration object that looks like this:
//
//    const firebaseConfig = {
//      apiKey: "YOUR_API_KEY",
//      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//      projectId: "YOUR_PROJECT_ID",
//      storageBucket: "YOUR_PROJECT_ID.appspot.com",
//      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//      appId: "YOUR_APP_ID",
//      measurementId: "YOUR_MEASUREMENT_ID" // If you enabled Analytics
//    };
//
//    - Copy this configuration and replace the placeholder below
//
// 6. Set up Security Rules:
//    - In your Firebase project, go to "Firestore Database" in the left sidebar
//    - Click on the "Rules" tab
//    - Replace the default rules with the following:
//
//    ```
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        // Allow anyone to read scores
//        match /global_scores/{scoreId} {
//          allow read: if true;
//          
//          // Only allow write if the data is properly formatted
//          allow create: if 
//            request.resource.data.user_name is string &&
//            request.resource.data.user_name.size() <= 30 &&
//            request.resource.data.score is number &&
//            request.resource.data.accuracy is number &&
//            request.resource.data.time is number &&
//            request.resource.data.date is string &&
//            request.resource.data.quiz_name is string;
//          
//          // No updates or deletes for security
//          allow update, delete: if false;
//        }
//      }
//    }
//    ```
//
//    - Click "Publish"
//
// 7. Set up Required Indexes:
//    - The app uses queries that filter and sort by multiple fields, which requires composite indexes
//    - In your Firebase project, go to "Firestore Database" in the left sidebar
//    - Click on the "Indexes" tab
//    - Click "Create index"
//    - For Collection ID, enter "global_scores"
//    - Add the following fields:
//      * Field path: quiz_name, Order: Ascending
//      * Field path: score, Order: Descending
//      * Field path: time, Order: Ascending
//    - For Query scope, select "Collection"
//    - Click "Create index"
//    - Wait for the index to finish building (this may take a few minutes)
//
//    - Note: You can also let Firebase create indexes automatically when needed:
//      * When you run the app for the first time and it tries to execute a query that needs an index,
//        Firebase will show an error in the console with a direct link to create the required index
//      * Click that link and follow the prompts to create the index automatically
//
// 8. Save this file and start using Firebase in your application!

// Replace this with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXoga6LoUHBT8vUG1eH9cawvpCBLt_jcI",
  authDomain: "signalflags-and-pennants.firebaseapp.com",
  projectId: "signalflags-and-pennants",
  storageBucket: "signalflags-and-pennants.firebasestorage.app",
  messagingSenderId: "37608106931",
  appId: "1:37608106931:web:100c061cce512645a7b9c6",
};

export default firebaseConfig;
