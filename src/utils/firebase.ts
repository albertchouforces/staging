// Firebase Configuration and Setup
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, where, getDocs, limit } from 'firebase/firestore';
import { QuizScore } from '../types/quiz';

/*
================= FIREBASE SETUP INSTRUCTIONS =================

1. Create a Firebase project:
   - Go to https://console.firebase.google.com/
   - Click "Add project" and follow the setup wizard

2. Register your web app:
   - In the Firebase console, click on the web icon (</>) to add a web app
   - Enter a name for your app and click "Register app"
   - Copy the firebaseConfig object provided

3. Enable Firestore:
   - In the Firebase console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in production mode" and select a location

4. Set up Firestore security rules:
   - In the Firestore Database section, go to the "Rules" tab
   - Update the rules to allow read for everyone but only authenticated writes:

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Allow public read access to high scores
        match /highScores/{document=**} {
          allow read: if true;
          allow write: if true; // For demo purposes. In production, use authentication
        }
      }
    }

5. Create Firestore index:
   - In the Firebase console, go to "Firestore Database" -> "Indexes" tab
   - Click "Add index"
   - Collection ID: highScores
   - Fields to index:
     - quizId (Ascending)
     - timeTaken (Ascending)
     - score (Descending)
   - Click "Create index"

*/

// Replace with your Firebase config
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
const db = getFirestore(app);

// Add a high score
export async function addHighScore(scoreData: QuizScore): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "highScores"), {
      ...scoreData,
      timestamp: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding high score: ", error);
    return null;
  }
}

// Get high scores for a specific quiz
export async function getHighScores(quizId: string): Promise<QuizScore[]> {
  try {
    const q = query(
      collection(db, "highScores"),
      where("quizId", "==", quizId),
      orderBy("timeTaken", "asc"), // Sort by time ascending (faster first)
      orderBy("score", "desc"),    // Then by score descending (higher first)
      limit(10)                    // Limit to top 10
    );

    const querySnapshot = await getDocs(q);
    const scores: QuizScore[] = [];

    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() } as QuizScore);
    });

    return scores;
  } catch (error) {
    console.error("Error getting high scores: ", error);
    return [];
  }
}

// Get high scores for all quizzes
export async function getAllHighScores(): Promise<Record<string, QuizScore[]>> {
  try {
    const q = query(
      collection(db, "highScores"),
      orderBy("timeTaken", "asc"),
      orderBy("score", "desc"),
      limit(50)
    );

    const querySnapshot = await getDocs(q);
    const scoresByQuiz: Record<string, QuizScore[]> = {};

    querySnapshot.forEach((doc) => {
      const score = { id: doc.id, ...doc.data() } as QuizScore;
      if (!scoresByQuiz[score.quizId]) {
        scoresByQuiz[score.quizId] = [];
      }
      scoresByQuiz[score.quizId].push(score);
    });

    // Limit each quiz to top 10
    Object.keys(scoresByQuiz).forEach(quizId => {
      scoresByQuiz[quizId] = scoresByQuiz[quizId].slice(0, 10);
    });

    return scoresByQuiz;
  } catch (error) {
    console.error("Error getting all high scores: ", error);
    return {};
  }
}
