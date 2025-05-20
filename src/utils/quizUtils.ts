import { Question, QuizAnswer, QuizSet } from "../types/quiz";

// Shuffles an array using the Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions from a quiz set
export function getRandomizedQuestions(quizSet: QuizSet, count?: number): Question[] {
  const questionsToUse = count && count < quizSet.questions.length 
    ? quizSet.questions.slice(0, count) 
    : quizSet.questions;
  return shuffleArray(questionsToUse);
}

// Generate answer options for a question
export function generateAnswerOptions(currentQuestion: Question, allQuestions: Question[]): QuizAnswer[] {
  // The correct answer
  const correctAnswer: QuizAnswer = {
    id: `correct-${currentQuestion.id}`,
    text: currentQuestion.correctAnswer,
    isCorrect: true
  };
  
  // Get incorrect answers from other questions
  const otherAnswers = allQuestions
    .filter(q => q.id !== currentQuestion.id)
    .map(q => q.correctAnswer)
    .filter(answer => answer !== currentQuestion.correctAnswer);
  
  // Randomly select 3 incorrect answers
  const incorrectAnswers = shuffleArray(otherAnswers)
    .slice(0, 3)
    .map((text, index) => ({
      id: `incorrect-${currentQuestion.id}-${index}`,
      text,
      isCorrect: false
    }));
  
  // Combine and shuffle
  return shuffleArray([correctAnswer, ...incorrectAnswers]);
}

// Calculate quiz score
export function calculateScore(selectedAnswers: Record<string, string>, questions: Question[]): number {
  let correctCount = 0;
  
  questions.forEach(question => {
    const selectedAnswer = selectedAnswers[question.id];
    if (selectedAnswer === question.correctAnswer) {
      correctCount++;
    }
  });
  
  return correctCount;
}
