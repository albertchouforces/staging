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

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;

export const QuizListResponseSchema = z.array(
  z.object({
    quizID: z.string(),
    quizName: z.string(),
    questionCount: z.number(),
  })
);

export type QuizListResponse = z.infer<typeof QuizListResponseSchema>;
