export interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  imageUrl?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  shuffledQuestions: QuizQuestion[];
  shuffledOptions: Record<string, string[]>;
  isCompleted: boolean;
  showFeedback?: boolean;
  startTime: number;
  currentQuestionStartTime: number;
  elapsedTime: number;
  isPaused: boolean;
}

export interface HighScore {
  id: string;
  quizId: string;
  playerName: string;
  score: number;
  accuracy: number;
  timeInSeconds: number;
  date: Date;
}
