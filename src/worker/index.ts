import { Hono } from "hono";
import { quizData } from "@/data/quizData";

const app = new Hono<{ Bindings: Env }>();

// Get list of all quizzes
app.get("/api/quizzes", (c) => {
  const quizList = quizData.map((quiz) => ({
    quizID: quiz.quizID,
    quizName: quiz.quizName,
    questionCount: quiz.questions.length,
  }));
  return c.json(quizList);
});

// Get a specific quiz by ID
app.get("/api/quizzes/:id", (c) => {
  const quizID = c.req.param("id");
  const quiz = quizData.find((q) => q.quizID === quizID);

  if (!quiz) {
    return c.json({ error: "Quiz not found" }, 404);
  }

  return c.json(quiz);
});

export default app;
