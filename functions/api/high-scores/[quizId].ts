export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const quizId = context.params.quizId as string;

    // Get Firebase project ID from environment
    const projectId = context.env.FIREBASE_PROJECT_ID || "test-a29e7";

    // Query Firestore using structured query
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
    
    const query = {
      structuredQuery: {
        from: [{ collectionId: 'highScores' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'quizId' },
            op: 'EQUAL',
            value: { stringValue: quizId }
          }
        },
        orderBy: [
          { field: { fieldPath: 'timeTakenMs' }, direction: 'ASCENDING' },
          { field: { fieldPath: 'accuracyPercentage' }, direction: 'DESCENDING' },
          { field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }
        ],
        limit: 100
      }
    };

    const response = await fetch(firestoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firestore query error:', errorText);
      return new Response(JSON.stringify({ error: "Failed to fetch high scores from Firebase" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const results = await response.json() as any[];
    
    // Transform Firestore documents to our format
    const highScores = results
      .filter((result: any) => result.document)
      .map((result: any, index: number) => {
        const fields = result.document.fields;
        return {
          id: index + 1,
          quiz_id: fields.quizId?.stringValue || '',
          player_name: fields.playerName?.stringValue || '',
          correct_answers: parseInt(fields.correctAnswers?.integerValue || '0'),
          total_questions: parseInt(fields.totalQuestions?.integerValue || '0'),
          accuracy_percentage: parseFloat(fields.accuracyPercentage?.doubleValue || '0'),
          time_taken_ms: parseInt(fields.timeTakenMs?.integerValue || '0'),
          created_at: fields.createdAt?.timestampValue || new Date().toISOString(),
        };
      });

    return new Response(JSON.stringify(highScores), {
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
