import { HighScoreSchema } from "../../../src/shared/types";

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await context.request.json();
    const validatedData = HighScoreSchema.parse(body);

    // Get D1 database binding
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ error: "Database not configured" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into D1 database
    const result = await db
      .prepare(`
        INSERT INTO high_scores 
        (quiz_id, player_name, correct_answers, total_questions, accuracy_percentage, time_taken_ms, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      .bind(
        validatedData.quiz_id,
        validatedData.player_name,
        validatedData.correct_answers,
        validatedData.total_questions,
        validatedData.accuracy_percentage,
        validatedData.time_taken_ms
      )
      .run();

    if (!result.success) {
      console.error('Database error:', result.error);
      return new Response(JSON.stringify({ error: "Failed to save high score" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error saving high score:', error);
    return new Response(JSON.stringify({ error: "Failed to save high score" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Handle CORS preflight requests
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
