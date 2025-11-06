import { HighScoreSchema } from "../../../src/shared/types";

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await context.request.json();
    const validatedData = HighScoreSchema.parse(body);

    // Get Firebase project ID from environment
    const projectId = context.env.FIREBASE_PROJECT_ID || "test-a29e7";

    // Prepare Firestore document data with camelCase field names for Firebase
    const firestoreDoc = {
      fields: {
        quizId: { stringValue: validatedData.quiz_id },
        playerName: { stringValue: validatedData.player_name },
        correctAnswers: { integerValue: validatedData.correct_answers.toString() },
        totalQuestions: { integerValue: validatedData.total_questions.toString() },
        accuracyPercentage: { doubleValue: validatedData.accuracy_percentage },
        timeTakenMs: { integerValue: validatedData.time_taken_ms.toString() },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    // Use Firestore REST API to add document
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/highScores`;
    
    const response = await fetch(firestoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firestoreDoc),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firestore API error:', errorText);
      return new Response(JSON.stringify({ error: "Failed to save high score to Firebase" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await response.json() as any;
    return new Response(JSON.stringify({ success: true, id: result.name }), {
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
