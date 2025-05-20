export interface Question {
  id: string;
  text: string;
  correctAnswer: string;
  imageUrl?: string;
}

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  color: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: Record<string, string>;
  isCompleted: boolean;
}

export interface QuizAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizScore {
  id?: string;
  quizId: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  timestamp: string;
}
