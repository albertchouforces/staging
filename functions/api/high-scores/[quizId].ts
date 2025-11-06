export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const quizId = context.params.quizId as string;

    // Get D1 database binding
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ error: "Database not configured" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Query high scores from D1 database
    const result = await db
      .prepare(`
        SELECT 
          id,
          quiz_id,
          player_name,
          correct_answers,
          total_questions,
          accuracy_percentage,
          time_taken_ms,
          created_at
        FROM high_scores 
        WHERE quiz_id = ?
        ORDER BY time_taken_ms ASC, accuracy_percentage DESC, created_at DESC
        LIMIT 100
      `)
      .bind(quizId)
      .all();

    if (!result.success) {
      console.error('Database error:', result.error);
      return new Response(JSON.stringify({ error: "Failed to fetch high scores" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result.results), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return new Response(JSON.stringify({ error: "Failed to fetch high scores" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
