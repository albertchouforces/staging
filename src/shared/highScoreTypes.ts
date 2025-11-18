import { Timestamp } from 'firebase/firestore';

export interface HighScore {
  id?: string;
  quizID: string;
  name: string;
  score: number;
  totalQuestions: number;
  timeMs: number;
  createdAt: Timestamp;
}

export interface HighScoreDisplay {
  rank: number;
  name: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeMs: number;
  createdAt: Date;
}
