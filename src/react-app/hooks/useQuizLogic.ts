import { useState, useCallback } from 'react';
import { Quiz, QuizState } from '@/shared/types';

export function useQuizLogic() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateMultipleChoiceOptions = (
    correctAnswer: string, 
    allAnswers: string[]
  ): string[] => {
    const incorrectAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    const selectedIncorrect = shuffleArray(incorrectAnswers).slice(0, 3);
    const options = [correctAnswer, ...selectedIncorrect];
    return shuffleArray(options);
  };

  const startQuiz = useCallback((quiz: Quiz) => {
    const shuffledQuestions = shuffleArray(quiz.questions);
    const allAnswers = quiz.questions.map(q => q.answer);
    
    const shuffledOptions = shuffledQuestions.map(question =>
      generateMultipleChoiceOptions(question.answer, allAnswers)
    );

    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      shuffledQuestions,
      shuffledOptions,
      isCompleted: false,
      startTime: Date.now(),
      totalPausedTime: 0,
      currentPauseStart: null,
    });
  }, []);

  const pauseTimer = useCallback(() => {
    if (!quizState || quizState.currentPauseStart !== null) return;

    setQuizState({
      ...quizState,
      currentPauseStart: Date.now(),
    });
  }, [quizState]);

  const resumeTimer = useCallback(() => {
    if (!quizState || quizState.currentPauseStart === null) return;

    const pauseDuration = Date.now() - quizState.currentPauseStart;
    setQuizState({
      ...quizState,
      totalPausedTime: quizState.totalPausedTime + pauseDuration,
      currentPauseStart: null,
    });
  }, [quizState]);

  const answerQuestion = useCallback((selectedAnswer: string, isCorrect: boolean) => {
    if (!quizState) return;

    const newState = {
      ...quizState,
      score: isCorrect ? quizState.score + 1 : quizState.score,
      selectedAnswers: [...quizState.selectedAnswers, selectedAnswer],
      currentQuestionIndex: quizState.currentQuestionIndex + 1,
    };

    if (newState.currentQuestionIndex >= quizState.shuffledQuestions.length) {
      newState.isCompleted = true;
      // Calculate final time, accounting for pauses
      const finalPausedTime = newState.currentPauseStart !== null 
        ? newState.totalPausedTime + (Date.now() - newState.currentPauseStart)
        : newState.totalPausedTime;
      newState.totalPausedTime = finalPausedTime;
      newState.currentPauseStart = null;
    }

    setQuizState(newState);
  }, [quizState]);

  const resetQuiz = useCallback(() => {
    setQuizState(null);
  }, []);

  const getElapsedTime = useCallback(() => {
    if (!quizState) return 0;
    
    const now = Date.now();
    const elapsed = now - quizState.startTime;
    const pausedTime = quizState.currentPauseStart !== null
      ? quizState.totalPausedTime + (now - quizState.currentPauseStart)
      : quizState.totalPausedTime;
    
    return elapsed - pausedTime;
  }, [quizState]);

  return {
    quizState,
    startQuiz,
    answerQuestion,
    pauseTimer,
    resumeTimer,
    resetQuiz,
    getElapsedTime,
  };
}
