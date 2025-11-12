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
  id: z.string(),
  quiz_id: z.string(),
  player_name: z.string(),
  score: z.number(),
  total_questions: z.number(),
  time_milliseconds: z.number(),
  created_at: z.string(),
});

export const SubmitHighScoreSchema = z.object({
  quiz_id: z.string(),
  player_name: z.string(),
  score: z.number(),
  total_questions: z.number(),
  time_milliseconds: z.number(),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type HighScore = z.infer<typeof HighScoreSchema>;
export type SubmitHighScore = z.infer<typeof SubmitHighScoreSchema>;

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: string[];
  shuffledQuestions: QuizQuestion[];
  shuffledOptions: string[][];
  isCompleted: boolean;
  startTime: number;
  totalPausedTime: number;
  currentPauseStart: number | null;
}
