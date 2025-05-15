import { Quiz, QuizQuestion, QuizState } from '../types/quiz';

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Initialize a new quiz state with shuffled questions and answer options
export function initializeQuiz(quiz: Quiz): QuizState {
  const shuffledQuestions = shuffleArray([...quiz.questions]);
  const shuffledOptions: Record<string, string[]> = {};
  
  // Get all possible answers from the quiz
  const allAnswers = quiz.questions.map(q => q.correctAnswer);
  
  // For each question, create shuffled options
  shuffledQuestions.forEach(question => {
    // Get incorrect options from other questions (not including the current question's answer)
    const otherAnswers = allAnswers.filter(a => a !== question.correctAnswer);
    
    // Select 3 random incorrect options
    const randomIncorrectOptions = shuffleArray(otherAnswers).slice(0, 3);
    
    // Combine correct answer with incorrect options and shuffle
    const options = shuffleArray([question.correctAnswer, ...randomIncorrectOptions]);
    
    // Store the shuffled options for this question
    shuffledOptions[question.id] = options;
  });
  
  const now = Date.now();
  
  return {
    currentQuestionIndex: 0,
    answers: {},
    shuffledQuestions,
    shuffledOptions,
    isCompleted: false,
    showFeedback: false,
    startTime: now,
    currentQuestionStartTime: now,
    elapsedTime: 0,
    isPaused: false,
  };
}

// Calculate the score based on given answers
export function calculateScore(quiz: Quiz, answers: Record<string, string>): number {
  let correctCount = 0;
  
  quiz.questions.forEach(question => {
    if (answers[question.id] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  return (correctCount / quiz.questions.length) * 100;
}
