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

export type QuizType = z.infer<typeof QuizSchema>;
export type QuizQuestionType = z.infer<typeof QuizQuestionSchema>;

export interface QuizQuestionWithOptions extends QuizQuestionType {
  options: string[];
  questionIndex: number;
}
