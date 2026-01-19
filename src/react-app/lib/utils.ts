import { ENABLE_RANDOMIZATION } from '@/react-app/config/features';

/**
 * Fisher-Yates shuffle algorithm for arrays
 * When ENABLE_RANDOMIZATION is false, returns a copy without shuffling
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  if (!ENABLE_RANDOMIZATION) return shuffled;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Check if a question is a matching question (array of pairs)
 */
export const isMatchingQuestion = (correctAnswer: string | string[] | any[]): boolean => {
  return Array.isArray(correctAnswer) && 
         correctAnswer.length > 0 && 
         Array.isArray(correctAnswer[0]) &&
         (correctAnswer[0].length === 2 || correctAnswer[0].length === 3);
};

/**
 * Get the correct answer(s) from a question as an array
 * Does not apply to matching questions
 */
export const getCorrectAnswers = (correctAnswer: string | string[] | any[]): string[] => {
  if (isMatchingQuestion(correctAnswer)) {
    return [];
  }
  return Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
};

/**
 * Check if a question is multi-select (requires multiple answers)
 */
export const isMultiSelect = (correctAnswer: string | string[] | any[]): boolean => {
  if (isMatchingQuestion(correctAnswer)) return false;
  return Array.isArray(correctAnswer) && correctAnswer.length > 1;
};

/**
 * Check if a question has a custom answer pool
 */
export const hasAnswerPool = (answerPool: string[] | undefined): boolean => {
  return Array.isArray(answerPool) && answerPool.length > 0;
};

/**
 * Get options for a question with custom answer pool
 * Returns all items from the pool in shuffled order
 * Automatically includes correct answers if they're missing from the pool
 */
export const getAnswerPoolOptions = (answerPool: string[], correctAnswers: string[]): string[] => {
  // Create a set for case-insensitive duplicate detection
  const poolSet = new Set(answerPool.map(ans => ans.toLowerCase()));
  const finalPool = [...answerPool];
  
  // Add any correct answers that aren't already in the pool
  correctAnswers.forEach(correctAns => {
    if (!poolSet.has(correctAns.toLowerCase())) {
      finalPool.push(correctAns);
    }
  });
  
  return shuffleArray(finalPool);
};

/**
 * Get random unique options for multiple choice questions
 * Uses pooled answers from other questions as distractors
 */
export const getRandomOptions = (
  allPossibleAnswers: string[], 
  correctAnswers: string[], 
  count: number
): string[] => {
  // Filter out non-string values and remove all correct answers from the pool
  const otherAnswers = allPossibleAnswers
    .filter(answer => typeof answer === 'string')
    .filter(answer => 
      !correctAnswers.some(correct => correct.toLowerCase() === answer.toLowerCase())
    );

  // Shuffle the other answers and take the required number
  const randomWrongAnswers = shuffleArray(otherAnswers)
    .slice(0, Math.max(0, count - correctAnswers.length));

  // Combine with correct answers and shuffle again
  return shuffleArray([...randomWrongAnswers, ...correctAnswers]);
};
