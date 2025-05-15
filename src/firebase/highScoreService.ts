import { collection, getDocs, addDoc, query, orderBy, limit, Timestamp, where } from 'firebase/firestore';
import { db } from './config';
import { HighScore } from '../types/quiz';

// Collection reference
const highScoresCollectionRef = collection(db, 'highScores');

// Get high scores for a specific quiz
export async function getHighScores(quizId: string, limitCount = 10): Promise<HighScore[]> {
  try {
    // Query high scores filtered by quizId first, then ordered
    const highScoresQuery = query(
      highScoresCollectionRef,
      where('quizId', '==', quizId),   // Filter by quizId first
      orderBy('timeInSeconds', 'asc'), // First by time (ascending - faster is better)
      orderBy('score', 'desc'),        // Then by score (descending - higher is better)
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(highScoresQuery);
    
    return querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          quizId: data.quizId,
          playerName: data.playerName,
          score: data.score,
          accuracy: data.accuracy,
          timeInSeconds: data.timeInSeconds,
          date: data.date.toDate(),
        } as HighScore;
      });
  } catch (error) {
    console.error("Error fetching high scores:", error);
    return [];
  }
}

// Add a new high score
export async function addHighScore(highScore: Omit<HighScore, 'id' | 'date'>): Promise<string> {
  try {
    const docRef = await addDoc(highScoresCollectionRef, {
      ...highScore,
      date: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding high score:", error);
    throw error;
  }
}
