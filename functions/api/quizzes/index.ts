import { quizzes } from "../../../src/data/quizData";
import type { QuizSummary } from "../../../src/shared/types";

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const summaries: QuizSummary[] = quizzes.map((quiz) => ({
      quizID: quiz.quizID,
      quizName: quiz.quizName,
      questionCount: quiz.questions.length,
    }));

    return new Response(JSON.stringify(summaries), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
