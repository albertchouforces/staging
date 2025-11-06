import { Hono } from "hono";
import { quizzes } from "@/data/quizData";
import type { QuizSummary, RandomizedQuiz, QuizQuestion } from "@/shared/types";
import { HighScoreSchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

// Utility function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get all quizzes summary
app.get("/api/quizzes", (c) => {
  const summaries: QuizSummary[] = quizzes.map((quiz) => ({
    quizID: quiz.quizID,
    quizName: quiz.quizName,
    questionCount: quiz.questions.length,
  }));
  return c.json(summaries);
});

// Get a specific quiz with randomized questions and answers
app.get("/api/quizzes/:id", (c) => {
  const quizID = c.req.param("id");
  const quiz = quizzes.find((q) => q.quizID === quizID);

  if (!quiz) {
    return c.json({ error: "Quiz not found" }, 404);
  }

  // Collect all answers from the quiz
  const allAnswers = quiz.questions.map((q) => q.answer);

  // Randomize question order
  const shuffledQuestions = shuffle(quiz.questions);

  // For each question, create 4 options (1 correct + 3 wrong)
  const randomizedQuestions: QuizQuestion[] = shuffledQuestions.map((q) => {
    // Get wrong answers (all answers except the correct one)
    const wrongAnswers = allAnswers.filter((a) => a !== q.answer);
    
    // Pick 3 random wrong answers
    const selectedWrongAnswers = shuffle(wrongAnswers).slice(0, 3);
    
    // Combine correct answer with wrong answers and shuffle
    const options = shuffle([q.answer, ...selectedWrongAnswers]);

    return {
      question: q.question,
      options,
      correctAnswer: q.answer,
      image: q.image,
    };
  });

  const randomizedQuiz: RandomizedQuiz = {
    quizID: quiz.quizID,
    quizName: quiz.quizName,
    questions: randomizedQuestions,
  };

  return c.json(randomizedQuiz);
});

// Save high score to Firebase Firestore using REST API
app.post("/api/high-scores", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = HighScoreSchema.parse(body);

    // Use the Firebase project ID from the config
    const projectId = "test-a29e7";

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
      return c.json({ error: "Failed to save high score to Firebase" }, 500);
    }

    const result = await response.json() as any;
    return c.json({ success: true, id: result.name });
  } catch (error) {
    console.error('Error saving high score:', error);
    return c.json({ error: "Failed to save high score" }, 400);
  }
});

// Get high scores for a quiz from Firebase Firestore using REST API
app.get("/api/high-scores/:quizId", async (c) => {
  const quizId = c.req.param("quizId");

  try {
    // Use the Firebase project ID from the config
    const projectId = "test-a29e7";

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
      return c.json({ error: "Failed to fetch high scores from Firebase" }, 500);
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

    return c.json(highScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return c.json({ error: "Failed to fetch high scores" }, 500);
  }
});

export default app;
