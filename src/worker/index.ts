import { Hono } from "hono";
import { HighScoreSchema, SubmitHighScoreSchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

// Get high scores for a specific quiz
app.get("/api/high-scores/:quizId", async (c) => {
  const quizId = c.req.param("quizId");
  const db = c.env.DB;

  try {
    const result = await db
      .prepare(
        `SELECT * FROM high_scores 
         WHERE quiz_id = ? 
         ORDER BY time_milliseconds ASC, score DESC 
         LIMIT 100`
      )
      .bind(quizId)
      .all();

    const highScores = result.results.map((row) => 
      HighScoreSchema.parse(row)
    );

    return c.json({ highScores });
  } catch (error) {
    console.error("Error fetching high scores:", error);
    return c.json({ error: "Failed to fetch high scores" }, 500);
  }
});

// Submit a new high score
app.post("/api/high-scores", async (c) => {
  const db = c.env.DB;

  try {
    const body = await c.req.json();
    const data = SubmitHighScoreSchema.parse(body);

    await db
      .prepare(
        `INSERT INTO high_scores 
         (quiz_id, player_name, score, total_questions, time_milliseconds) 
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(
        data.quiz_id,
        data.player_name,
        data.score,
        data.total_questions,
        data.time_milliseconds
      )
      .run();

    return c.json({ success: true });
  } catch (error) {
    console.error("Error submitting high score:", error);
    return c.json({ error: "Failed to submit high score" }, 500);
  }
});

export default app;
