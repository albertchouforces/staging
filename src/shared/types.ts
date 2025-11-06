import z from "zod";

export const QuizSummarySchema = z.object({
  quizID: z.string(),
  quizName: z.string(),
  questionCount: z.number(),
});

export type QuizSummary = z.infer<typeof QuizSummarySchema>;

export const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  image: z.string().optional(),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const RandomizedQuizSchema = z.object({
  quizID: z.string(),
  quizName: z.string(),
  questions: z.array(QuizQuestionSchema),
});

export type RandomizedQuiz = z.infer<typeof RandomizedQuizSchema>;

export const HighScoreSchema = z.object({
  quiz_id: z.string(),
  player_name: z.string().min(1).max(50),
  correct_answers: z.number().int().min(0),
  total_questions: z.number().int().min(1),
  accuracy_percentage: z.number().min(0).max(100),
  time_taken_ms: z.number().int().min(0),
});

export type HighScoreInput = z.infer<typeof HighScoreSchema>;

export const HighScoreResponseSchema = z.object({
  id: z.number(),
  quiz_id: z.string(),
  player_name: z.string(),
  correct_answers: z.number(),
  total_questions: z.number(),
  accuracy_percentage: z.number(),
  time_taken_ms: z.number(),
  created_at: z.string(),
});

export type HighScoreResponse = z.infer<typeof HighScoreResponseSchema>;
