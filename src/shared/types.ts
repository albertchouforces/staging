import z from "zod";

export const QuizQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
  image: z.string().optional(),
});

export const QuizSchema = z.object({
  quizID: z.string(),
  quizName: z.string(),
  questions: z.array(QuizQuestionSchema),
});

export const HighScoreSchema = z.object({
  id: z.string().optional(),
  quizId: z.string(),
  quizName: z.string(),
  playerName: z.string(),
  score: z.number(),
  totalQuestions: z.number(),
  accuracy: z.number(), // percentage
  timeMs: z.number(), // total time in milliseconds
  dateTime: z.string(), // ISO string
  createdAt: z.number(), // timestamp for ordering
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type HighScore = z.infer<typeof HighScoreSchema>;

export interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  score: number;
  isComplete: boolean;
  userAnswers: string[];
  randomizedQuestions: QuizQuestion[];
  currentOptions: string[];
}

export interface TimerState {
  startTime: number;
  totalTimeMs: number;
  isRunning: boolean;
  isPaused: boolean;
}
