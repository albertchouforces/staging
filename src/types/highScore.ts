export interface HighScore {
  id?: string;
  name: string;
  quizID: string;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in milliseconds
  date: string;
}
