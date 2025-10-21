import { Quiz, QuizQuestion } from "@/shared/types";

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate 4 multiple choice options for a question
export function generateMultipleChoiceOptions(
  correctAnswer: string,
  allAnswers: string[]
): string[] {
  // Filter out the correct answer from all possible answers
  const wrongAnswers = allAnswers.filter(answer => answer !== correctAnswer);
  
  // Randomly select 3 wrong answers
  const shuffledWrongAnswers = shuffleArray(wrongAnswers);
  const selectedWrongAnswers = shuffledWrongAnswers.slice(0, 3);
  
  // Combine correct answer with wrong answers and shuffle
  const options = [correctAnswer, ...selectedWrongAnswers];
  return shuffleArray(options);
}

// Get all answers from a quiz for generating wrong options
export function getAllAnswersFromQuiz(quiz: Quiz): string[] {
  return quiz.questions.map(q => q.answer);
}

// Prepare quiz for playing (randomize questions)
export function prepareQuizForPlay(quiz: Quiz): QuizQuestion[] {
  return shuffleArray([...quiz.questions]);
}
