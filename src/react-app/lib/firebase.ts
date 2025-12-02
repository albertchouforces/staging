// =================================================================
// FIREBASE SETUP INSTRUCTIONS
// =================================================================
//
// 1. CREATE A FIREBASE PROJECT
// ---------------------------
// a. Go to https://console.firebase.google.com/
// b. Click "Add Project" or select an existing project
// c. Enter a project name (e.g., "my-quiz-app")
// d. Choose whether to enable Google Analytics (optional)
// e. Click "Create Project"
//
// 2. REGISTER YOUR WEB APP
// ------------------------
// a. In the Firebase Console, click the gear icon (⚙️) next to "Project Overview"
// b. Click "Project Settings"
// c. In the "Your apps" section, click the web icon (</>)
// d. Register your app with a nickname (e.g., "quiz-web-app")
// e. (Optional) Set up Firebase Hosting
// f. Click "Register app"
// g. Copy the firebaseConfig object that's displayed - you'll need this below
//
// 3. INSTALL FIREBASE IN YOUR PROJECT
// ---------------------------------
// Run these commands in your project directory:
//   npm install firebase
//
// 4. CONFIGURE FIRESTORE DATABASE
// -----------------------------
// a. In Firebase Console, click "Firestore Database"
// b. Click "Create Database"
// c. Choose production or test mode
// d. Select a database location close to your users
// e. Click "Enable"
//
// 5. SET UP SECURITY RULES
// -----------------------
// a. In Firebase Console, go to Firestore Database
// b. Click "Rules" tab
// c. Copy and paste these rules (updated syntax for compatibility):
/*
rules_version = '2';
service cloud.firestore {
     match /databases/{database}/documents {
       match /global_scores/{score} {
         allow read: if true;
         allow write: if request.resource.data.user_name is string &&
                        request.resource.data.user_name.size() <= 30 &&
                        request.resource.data.score is number &&
                        request.resource.data.accuracy is number &&
                        request.resource.data.accuracy >= 0 &&
                        request.resource.data.accuracy <= 100 &&
                        request.resource.data.time is number
       }
     }
   }
*/
//
// 6. SET UP REQUIRED INDEXES
// -------------------------
// The application uses compound queries that require custom indexes.
// You need to set these up or the queries will fail.
//
// a. In Firebase Console, go to Firestore Database
// b. Click "Indexes" tab
// c. Click "Create Index"
// d. Set up the following composite index:
//    Collection ID: global_scores
//    Fields to index:
//      - service    (Ascending)
//      - score      (Descending)
//      - time       (Ascending)
//    Query scope: Collection
//
// Alternative method: You can also create the index by clicking the link in the
// error message that appears in the browser console when you first run a query.
// The error will look like:
// "Error: The query requires an index. You can create it here: [URL]"
//
// Note: It may take a few minutes for indexes to finish building after creation.
// You can monitor the progress in the Indexes tab.
//
// 7. DATABASE STRUCTURE
// -------------------
// The application uses a collection called 'global_scores' with documents containing:
// {
//   user_name: string (max 30 chars),
//   score: number,
//   accuracy: number (0-100),
//   time: number (milliseconds),
//   date: string (ISO format),
//   service: string (quiz identifier)
// }
//
// 8. ENVIRONMENT VARIABLES (OPTIONAL)
// --------------------------------
// For additional security, you can move the Firebase config to environment variables:
// Create a .env file with:
//   VITE_FIREBASE_API_KEY=your_api_key
//   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
//   VITE_FIREBASE_PROJECT_ID=your_project_id
//   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
//   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
//   VITE_FIREBASE_APP_ID=your_app_id
//
// Then update the firebaseConfig object to use:
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   etc...
//
// =================================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import type { QuerySnapshot, DocumentData } from 'firebase/firestore';

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBkzBFeo4FL62OsZ-AssG3OK5KMwz6_OMc",
  authDomain: "test-a29e7.firebaseapp.com",
  projectId: "test-a29e7",
  storageBucket: "test-a29e7.firebasestorage.app",
  messagingSenderId: "579772147410",
  appId: "1:579772147410:web:a06c3f87f0a41572baaf0b"
};

// Initialize Firebase App instance directly with the config
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Interface for the structure of a global score entry
export interface GlobalScoreEntry {
  user_name: string;      // User's display name
  score: number;          // Quiz score
  accuracy: number;       // Accuracy percentage (0-100)
  time: number;          // Time taken in milliseconds
  date: string;          // ISO date string
  service: string;       // Quiz identifier
}

/**
 * Saves a new score to the global leaderboard
 * @param scoreData - The score data to save (without service field)
 * @param quizName - The identifier for the quiz
 * @returns Promise<boolean> - True if save was successful
 */
export async function saveGlobalScore(
  scoreData: Omit<GlobalScoreEntry, 'service'>,
  quizName: string
): Promise<boolean> {
  try {
    // Validate data according to Firestore security rules
    if (!scoreData.user_name || 
        typeof scoreData.score !== 'number' || 
        typeof scoreData.accuracy !== 'number' ||
        scoreData.accuracy < 0 ||
        scoreData.accuracy > 100 ||
        typeof scoreData.time !== 'number' ||
        scoreData.user_name.length > 30) {
      console.error('Invalid score data:', scoreData);
      return false;
    }

    console.log('Attempting to save global score to Firebase:', { quizName, scoreData });

    // Get reference to the global_scores collection
    const scoresRef = collection(db, 'global_scores');

    // Add new document with score data
    const docRef = await addDoc(scoresRef, {
      ...scoreData,
      service: quizName
    });

    console.log('Successfully saved global score with ID:', docRef.id);
    return true;
  } catch (err) {
    console.error('Error saving global score:', err);
    // Log more detailed error information
    if (err instanceof Error) {
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
    }
    return false;
  }
}

/**
 * Retrieves global scores for a specific quiz
 * @param quizName - The identifier for the quiz
 * @returns Promise<GlobalScoreEntry[]> - Array of score entries
 */
export async function getGlobalScores(quizName: string): Promise<GlobalScoreEntry[]> {
  try {
    if (!quizName) {
      console.error('Quiz name is required');
      return [];
    }

    console.log('Fetching global scores for quiz:', quizName);

    // Create a query against the global_scores collection
    // Note: This query requires the composite index described in step 6 of the setup instructions
    const scoresRef = collection(db, 'global_scores');
    const q = query(
      scoresRef,
      where('service', '==', quizName),    // Filter by quiz name
      orderBy('score', 'desc'),            // Sort by score (highest first)
      orderBy('time', 'asc'),              // Then by time (fastest first)
      limit(100)                           // Get top 100 scores
    );

    console.log('Executing Firebase query...');
    
    // Execute the query
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    const scores: GlobalScoreEntry[] = [];

    // Convert the query snapshot to an array of score entries
    querySnapshot.forEach((doc) => {
      scores.push(doc.data() as GlobalScoreEntry);
    });

    console.log('Successfully received global scores:', scores.length, 'entries');
    return scores;
  } catch (err) {
    console.error('Error in getGlobalScores:', err);
    
    // Log more detailed error information
    if (err instanceof Error) {
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
    }
    
    // Check for specific Firebase errors
    const errorMessage = err instanceof Error ? err.message : String(err);
    
    if (errorMessage.includes('index')) {
      console.error('FIRESTORE INDEX ERROR: The query requires a composite index.');
      console.error('Please create the required index in the Firebase Console:');
      console.error('Collection: global_scores');
      console.error('Fields: service (Ascending), score (Descending), time (Ascending)');
      console.error('Or click the link in the error message above to create it automatically.');
    } else if (errorMessage.includes('permission') || errorMessage.includes('PERMISSION_DENIED')) {
      console.error('FIRESTORE PERMISSION ERROR: Check your Firestore security rules.');
      console.error('Make sure read access is allowed for the global_scores collection.');
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      console.error('NETWORK ERROR: Unable to connect to Firebase.');
      console.error('Check your internet connection and Firebase configuration.');
    }
    
    return [];
  }
}
