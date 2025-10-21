import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';
import { HighScore } from '@/shared/types';

const HIGH_SCORES_COLLECTION = 'highScores';

export async function saveHighScore(highScore: Omit<HighScore, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, HIGH_SCORES_COLLECTION), {
      ...highScore,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving high score:', error);
    throw error;
  }
}

export async function getHighScores(quizId: string, limitCount = 10): Promise<HighScore[]> {
  try {
    const q = query(
      collection(db, HIGH_SCORES_COLLECTION),
      where('quizId', '==', quizId),
      orderBy('score', 'desc'),
      orderBy('timeMs', 'asc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const highScores: HighScore[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      highScores.push({
        id: doc.id,
        quizId: data.quizId,
        quizName: data.quizName,
        playerName: data.playerName,
        score: data.score,
        totalQuestions: data.totalQuestions,
        accuracy: data.accuracy,
        timeMs: data.timeMs,
        dateTime: data.dateTime,
        createdAt: data.createdAt?.toMillis?.() || Date.now(),
      });
    });
    
    return highScores;
  } catch (error) {
    console.error('Error fetching high scores:', error);
    throw error;
  }
}

export async function getAllHighScores(limitCount = 50): Promise<HighScore[]> {
  try {
    const q = query(
      collection(db, HIGH_SCORES_COLLECTION),
      orderBy('score', 'desc'),
      orderBy('timeMs', 'asc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const highScores: HighScore[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      highScores.push({
        id: doc.id,
        quizId: data.quizId,
        quizName: data.quizName,
        playerName: data.playerName,
        score: data.score,
        totalQuestions: data.totalQuestions,
        accuracy: data.accuracy,
        timeMs: data.timeMs,
        dateTime: data.dateTime,
        createdAt: data.createdAt?.toMillis?.() || Date.now(),
      });
    });
    
    return highScores;
  } catch (error) {
    console.error('Error fetching all high scores:', error);
    throw error;
  }
}
