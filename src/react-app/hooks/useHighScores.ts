import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { HighScore, SubmitHighScore } from '@/shared/types';

export function useHighScores(quizId: string | null) {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) {
      setHighScores([]);
      return;
    }

    const fetchHighScores = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const highScoresRef = collection(db, 'highScores');
        const q = query(
          highScoresRef,
          where('quiz_id', '==', quizId),
          orderBy('time_milliseconds', 'asc'),
          orderBy('score', 'desc'),
          limit(100)
        );
        
        const querySnapshot = await getDocs(q);
        const scores: HighScore[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          scores.push({
            id: doc.id,
            quiz_id: data.quiz_id,
            player_name: data.player_name,
            score: data.score,
            total_questions: data.total_questions,
            time_milliseconds: data.time_milliseconds,
            created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          });
        });
        
        setHighScores(scores);
      } catch (err) {
        console.error('Error fetching high scores:', err);
        setError('Failed to load high scores');
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, [quizId]);

  return { highScores, loading, error };
}

export async function submitHighScore(data: SubmitHighScore): Promise<void> {
  try {
    const highScoresRef = collection(db, 'highScores');
    await addDoc(highScoresRef, {
      ...data,
      created_at: Timestamp.now(),
    });
  } catch (err) {
    console.error('Error submitting high score:', err);
    throw new Error('Failed to submit high score');
  }
}
