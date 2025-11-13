import { Hono } from "hono";
import { quizzes } from "../src/data/quizData";

const app = new Hono();

// Get all quizzes (without full question data)
app.get("/api/quizzes", (c) => {
  const quizList = quizzes.map((quiz) => ({
    quizID: quiz.quizID,
    quizName: quiz.quizName,
    questionCount: quiz.questions.length,
  }));
  return c.json(quizList);
});

// Get a specific quiz with randomized questions and answer options
app.get("/api/quizzes/:quizID", (c) => {
  const quizID = c.req.param("quizID");
  const quiz = quizzes.find((q) => q.quizID === quizID);

  if (!quiz) {
    return c.json({ error: "Quiz not found" }, 404);
  }

  // Randomize question order
  const shuffledQuestions = [...quiz.questions].sort(() => Math.random() - 0.5);

  // Collect all answers from all questions for wrong options
  const allAnswers = quiz.questions.map((q) => q.answer);

  // For each question, create 3 wrong options from other questions' answers
  const questionsWithOptions = shuffledQuestions.map((question, index) => {
    const wrongOptions = allAnswers
      .filter((ans) => ans !== question.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [...wrongOptions, question.answer].sort(
      () => Math.random() - 0.5
    );

    return {
      question: question.question,
      answer: question.answer,
      image: question.image,
      options,
      questionIndex: index,
    };
  });

  return c.json({
    quizID: quiz.quizID,
    quizName: quiz.quizName,
    questions: questionsWithOptions,
  });
});

export const onRequest = app.fetch;
