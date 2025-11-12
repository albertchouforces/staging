import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Quiz } from '@/shared/types';
import { useQuizLogic } from '@/react-app/hooks/useQuizLogic';
import QuizQuestion from '@/react-app/components/QuizQuestion';
import QuizResults from '@/react-app/components/QuizResults';

interface QuizPageProps {
  quiz: Quiz;
}

export default function QuizPage({ quiz }: QuizPageProps) {
  const navigate = useNavigate();
  const { quizState, startQuiz, answerQuestion, pauseTimer, resumeTimer, resetQuiz, getElapsedTime } = useQuizLogic();

  useState(() => {
    startQuiz(quiz);
  });

  const handleReturnHome = () => {
    resetQuiz();
    navigate('/');
  };

  const handleRetakeQuiz = () => {
    startQuiz(quiz);
  };

  if (!quizState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    const totalTime = Date.now() - quizState.startTime - quizState.totalPausedTime;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <QuizResults
          score={quizState.score}
          totalQuestions={quizState.shuffledQuestions.length}
          quizId={quiz.quizID}
          quizName={quiz.quizName}
          timeMilliseconds={totalTime}
          onRetakeQuiz={handleRetakeQuiz}
          onReturnHome={handleReturnHome}
        />
      </div>
    );
  }

  const currentQuestion = quizState.shuffledQuestions[quizState.currentQuestionIndex];
  const currentOptions = quizState.shuffledOptions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <QuizQuestion
        question={currentQuestion.question}
        image={currentQuestion.image}
        options={currentOptions}
        correctAnswer={currentQuestion.answer}
        currentQuestion={quizState.currentQuestionIndex + 1}
        totalQuestions={quizState.shuffledQuestions.length}
        onAnswer={answerQuestion}
        onReturnHome={handleReturnHome}
        onPauseTimer={pauseTimer}
        onResumeTimer={resumeTimer}
        elapsedTime={getElapsedTime()}
      />
    </div>
  );
}
