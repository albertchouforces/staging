/*
 * FIREBASE CONFIGURATION FOR QUIZMASTER HIGH SCORES
 * 
 * STEP 1: FIREBASE PROJECT SETUP
 * - Go to https://console.firebase.google.com/
 * - Click "Create a project" or select an existing project
 * - Enter project name (e.g., "quizmaster-app")
 * - Enable Google Analytics if desired (optional)
 * - Click "Create project"
 * 
 * STEP 2: ENABLE FIRESTORE DATABASE
 * - In the Firebase Console, go to "Firestore Database" in the left sidebar
 * - Click "Create database"
 * - Choose "Start in test mode" for development (we'll configure rules in Step 4)
 * - Select a location for your database (choose closest to your users)
 * - Click "Done"
 * 
 * STEP 3: GET FIREBASE CONFIG
 * - In the Firebase Console, click the gear icon > "Project settings"
 * - Scroll down to "Your apps" section
 * - Click "Web" icon (</>) to add a web app
 * - Register app name (e.g., "QuizMaster Web")
 * - Copy the firebaseConfig object values
 * - Add these as environment variables in your Cloudflare Worker:
 *   FIREBASE_API_KEY
 *   FIREBASE_AUTH_DOMAIN  
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_STORAGE_BUCKET
 *   FIREBASE_MESSAGING_SENDER_ID
 *   FIREBASE_APP_ID
 * 
 * STEP 4: FIRESTORE SECURITY RULES
 * - Go to "Firestore Database" > "Rules" tab
 * - Replace the default rules with the following:
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // High scores collection
 *     match /highScores/{document} {
 *       // Allow anyone to read high scores
 *       allow read: if true;
 *       
 *       // Allow anyone to create new high scores with valid data
 *       allow create: if 
 *         // Ensure all required fields are present
 *         request.resource.data.keys().hasAll([
 *           'quizId', 'playerName', 'correctAnswers', 'totalQuestions', 
 *           'accuracyPercentage', 'timeTakenMs', 'createdAt'
 *         ]) &&
 *         // Validate data types and constraints
 *         request.resource.data.quizId is string &&
 *         request.resource.data.quizId.size() > 0 &&
 *         request.resource.data.playerName is string &&
 *         request.resource.data.playerName.size() > 0 &&
 *         request.resource.data.playerName.size() <= 50 &&
 *         request.resource.data.correctAnswers is number &&
 *         request.resource.data.correctAnswers >= 0 &&
 *         request.resource.data.totalQuestions is number &&
 *         request.resource.data.totalQuestions >= 1 &&
 *         request.resource.data.correctAnswers <= request.resource.data.totalQuestions &&
 *         request.resource.data.accuracyPercentage is number &&
 *         request.resource.data.accuracyPercentage >= 0 &&
 *         request.resource.data.accuracyPercentage <= 100 &&
 *         request.resource.data.timeTakenMs is number &&
 *         request.resource.data.timeTakenMs >= 0 &&
 *         request.resource.data.createdAt is timestamp;
 *       
 *       // Prevent updates and deletes for data integrity
 *       allow update, delete: if false;
 *     }
 *   }
 * }
 * 
 * STEP 5: FIRESTORE INDEXES
 * - Go to "Firestore Database" > "Indexes" tab
 * - Create the following composite indexes for efficient querying:
 * 
 * Index 1 (Primary ranking - time first, then accuracy):
 * - Collection ID: highScores
 * - Fields indexed:
 *   - quizId (Ascending)
 *   - timeTakenMs (Ascending) 
 *   - accuracyPercentage (Descending)
 *   - createdAt (Descending)
 * - Query scope: Collection
 * 
 * Index 2 (Alternative ranking - accuracy first, then time):
 * - Collection ID: highScores  
 * - Fields indexed:
 *   - quizId (Ascending)
 *   - accuracyPercentage (Descending)
 *   - timeTakenMs (Ascending)
 *   - createdAt (Descending)
 * - Query scope: Collection
 * 
 * STEP 6: DOCUMENT STRUCTURE
 * The highScores collection will contain documents with this structure:
 * {
 *   quizId: string,              // ID of the quiz (e.g., "general-knowledge-1")
 *   playerName: string,          // Player's name (1-50 characters)
 *   correctAnswers: number,      // Number of correct answers (0 to totalQuestions)
 *   totalQuestions: number,      // Total questions in the quiz (minimum 1)
 *   accuracyPercentage: number,  // Accuracy as percentage (0-100)
 *   timeTakenMs: number,         // Time taken in milliseconds (minimum 0)
 *   createdAt: timestamp         // When the score was recorded
 * }
 * 
 * STEP 7: CLOUDFLARE WORKER CONSIDERATIONS
 * - Firebase Admin SDK doesn't work in Cloudflare Workers due to Node.js dependencies
 * - Instead, we'll use Firebase REST API for server-side operations
 * - Client-side Firebase SDK can be used in the React frontend
 * - For authentication, we'll use Firebase Auth REST API
 * 
 * STEP 8: ENVIRONMENT VARIABLES SETUP
 * Add these secrets to your Cloudflare Worker:
 * - FIREBASE_PROJECT_ID: Your Firebase project ID
 * - FIREBASE_API_KEY: Your Firebase web API key
 * - FIREBASE_AUTH_DOMAIN: Your Firebase auth domain
 * - FIREBASE_STORAGE_BUCKET: Your Firebase storage bucket
 * - FIREBASE_MESSAGING_SENDER_ID: Your Firebase messaging sender ID  
 * - FIREBASE_APP_ID: Your Firebase app ID
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Firebase configuration with placeholder values
// These will be populated with actual values from Cloudflare Worker secrets
const firebaseConfig: FirebaseConfig = {
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

// Export config for use in other parts of the app
export { firebaseConfig };

/*
 * USAGE EXAMPLES:
 * 
 * // Add a high score
 * import { db } from '@/firebase/config';
 * import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
 * 
 * const saveHighScore = async (scoreData) => {
 *   try {
 *     const docRef = await addDoc(collection(db, 'highScores'), {
 *       ...scoreData,
 *       createdAt: serverTimestamp()
 *     });
 *     console.log('High score saved with ID: ', docRef.id);
 *   } catch (error) {
 *     console.error('Error saving high score: ', error);
 *   }
 * };
 * 
 * // Get high scores for a quiz
 * import { query, where, orderBy, limit, getDocs } from 'firebase/firestore';
 * 
 * const getHighScores = async (quizId: string) => {
 *   try {
 *     const q = query(
 *       collection(db, 'highScores'),
 *       where('quizId', '==', quizId),
 *       orderBy('timeTakenMs', 'asc'),
 *       orderBy('accuracyPercentage', 'desc'),
 *       limit(100)
 *     );
 *     const querySnapshot = await getDocs(q);
 *     return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 *   } catch (error) {
 *     console.error('Error fetching high scores: ', error);
 *     return [];
 *   }
 * };
 */
