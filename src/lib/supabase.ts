import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';
import firebaseConfig from '../config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface GlobalScoreEntry {
  user_name: string;
  score: number;
  accuracy: number;
  time: number;
  date: string;
  quiz_name: string;  // Changed from service to quiz_name
}

/**
 * Saves a score to the global leaderboard in Firebase
 */
export async function saveGlobalScore(
  scoreData: Omit<GlobalScoreEntry, 'quiz_name'>, 
  quizName: string
): Promise<boolean> {
  try {
    // Create a reference to the global_scores collection
    const scoresRef = collection(db, 'global_scores');
    
    // Add the document with the score data
    await addDoc(scoresRef, {
      ...scoreData,
      quiz_name: quizName
    });
    
    return true;
  } catch (err) {
    console.error('Error saving global score to Firebase:', err);
    return false;
  }
}

/**
 * Gets global scores for a specific quiz from Firebase
 */
export async function getGlobalScores(quizName: string): Promise<GlobalScoreEntry[]> {
  try {
    // Create a reference to the global_scores collection
    const scoresRef = collection(db, 'global_scores');
    
    // Create a query against the collection
    const q = query(
      scoresRef,
      where('quiz_name', '==', quizName),
      orderBy('score', 'desc'),
      orderBy('time', 'asc'),
      limit(100)
    );
    
    // Get the documents
    const querySnapshot = await getDocs(q);
    
    // Convert the documents to our GlobalScoreEntry interface
    const scores: GlobalScoreEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as GlobalScoreEntry;
      scores.push(data);
    });
    
    return scores;
  } catch (err) {
    console.error('Error fetching global scores from Firebase:', err);
    return [];
  }
}
