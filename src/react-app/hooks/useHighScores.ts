import { useState } from 'react';
import { collection, addDoc, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export interface HighScore {
  id?: string;
  quizId: string;
  playerName: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  timeMs: number;
  completedAt: Date;
}

export const useHighScores = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveHighScore = async (highScore: Omit<HighScore, 'id' | 'completedAt'>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await addDoc(collection(db, 'highscores'), {
        ...highScore,
        completedAt: Timestamp.now()
      });
    } catch (err) {
      console.error('Error saving high score:', err);
      setError('Failed to save high score');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHighScores = async (quizId?: string, limitCount: number = 10): Promise<HighScore[]> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching high scores...', { quizId, limitCount });
      
      let q = query(collection(db, 'highscores'));
      
      if (quizId) {
        q = query(q, where('quizId', '==', quizId));
      }
      
      // Simplified ordering to avoid composite index issues - just order by time
      q = query(q, orderBy('timeMs', 'asc'), limit(limitCount));
      
      console.log('Executing query...');
      const querySnapshot = await getDocs(q);
      console.log('Query result size:', querySnapshot.size);
      
      const scores: HighScore[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Document data:', data);
        scores.push({
          id: doc.id,
          quizId: data.quizId,
          playerName: data.playerName,
          correctAnswers: data.correctAnswers,
          totalQuestions: data.totalQuestions,
          accuracy: data.accuracy,
          timeMs: data.timeMs,
          completedAt: data.completedAt.toDate()
        });
      });
      
      // Sort by time first, then by accuracy (client-side)
      scores.sort((a, b) => {
        if (a.timeMs !== b.timeMs) {
          return a.timeMs - b.timeMs; // Faster time wins
        }
        return b.accuracy - a.accuracy; // Higher accuracy wins for same time
      });
      
      console.log('Returning scores:', scores.length);
      return scores;
    } catch (err) {
      console.error('Error fetching high scores:', err);
      setError(`Failed to fetch high scores: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    saveHighScore,
    getHighScores,
    loading,
    error
  };
};
