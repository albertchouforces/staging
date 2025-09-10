export interface QuestionData {
  id: number;
  question: string;   // The question to display
  correctAnswer: string;   // The correct answer
  description: string;    // Brief description or context
  fact: string;          // Interesting fact shown after answering
  imageUrl: string;      // Path to the question image
}

export interface HighScoreEntry {
  userName: string;
  score: number;
  accuracy: number;
  time: number;
  date: string;
}

export interface BestRun {
  userName: string;
  time: number;
  score: number;
  accuracy: number;
}

export interface QuizStats {
  highScore: number;
  bestRun: BestRun | null;
  highScores: HighScoreEntry[];
}

export interface QuizConfig {
  title: string;
  description: string;
  themeColor: 'blue' | 'green' | 'sky' | 'red' | 'purple' | 'indigo' | 'amber' | 'emerald' | 'teal' | 'cyan';
  quiz_name: string;
  startScreenImage?: string;
}
