import { quizzes } from "../../../src/data/quizData";
import type { RandomizedQuiz, QuizQuestion } from "../../../src/shared/types";

// Utility function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const quizID = context.params.id as string;
    const quiz = quizzes.find((q) => q.quizID === quizID);

    if (!quiz) {
      return new Response(JSON.stringify({ error: "Quiz not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
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

    return new Response(JSON.stringify(randomizedQuiz), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
