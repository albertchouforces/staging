/**
 * Fisher-Yates shuffle algorithm for arrays
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get the correct answer from a question (handles both string and array formats)
 */
export const getCorrectAnswer = (correctAnswer: string | string[]): string => {
  return Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;
};

/**
 * Check if a question uses manual answer options (array format)
 */
export const hasManualOptions = (correctAnswer: string | string[]): boolean => {
  return Array.isArray(correctAnswer);
};

/**
 * Get options for a question with manual override (array format)
 * Returns all items from the array in shuffled order
 */
export const getManualOptions = (correctAnswer: string[]): string[] => {
  return shuffleArray([...correctAnswer]);
};

/**
 * Get random unique options for multiple choice questions
 * Uses pooled answers from other questions as distractors
 */
export const getRandomOptions = (
  allPossibleAnswers: string[], 
  correctAnswer: string, 
  count: number
): string[] => {
  // Remove the correct answer from the pool of possible answers
  const otherAnswers = allPossibleAnswers.filter(answer => 
    answer.toLowerCase() !== correctAnswer.toLowerCase()
  );

  // Shuffle the other answers and take the required number
  const randomWrongAnswers = shuffleArray(otherAnswers)
    .slice(0, count - 1);

  // Combine with correct answer and shuffle again
  return shuffleArray([...randomWrongAnswers, correctAnswer]);
};
