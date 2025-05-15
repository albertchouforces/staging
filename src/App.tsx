import React, { useEffect, useState } from 'react';
import './index.css';
import { Quiz, QuizState } from './types/quiz';
import { quizzes } from './data/quizData';
import { initializeQuiz, calculateScore } from './utils/quizUtils';
import { QuizSelection } from './components/QuizSelection';
import { QuizQuestionComponent } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { QuizTimer } from './components/QuizTimer';
import { HighScoresList } from './components/HighScoresList';
import { SaveScoreForm } from './components/SaveScoreForm';
import { AllHighScoresModal } from './components/AllHighScoresModal';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

export function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // App state
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showHighScores, setShowHighScores] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [showAllHighScores, setShowAllHighScores] = useState(false);

  // Handle quiz selection
  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizState(initializeQuiz(quiz));
    setScore(null);
  };

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    if (!quizState || !selectedQuiz) return;
    
    const currentQuestion = quizState.shuffledQuestions[quizState.currentQuestionIndex];
    const now = Date.now();
    
    // Calculate elapsed time for this question
    const questionElapsedTime = (now - quizState.currentQuestionStartTime) / 1000;
    
    // Update answers
    const newAnswers = { 
      ...quizState.answers, 
      [currentQuestion.id]: answer 
    };
    
    // Pause the timer when showing feedback
    setQuizState({
      ...quizState,
      answers: newAnswers,
      showFeedback: true,  // Show feedback after answer selection
      isPaused: true,      // Pause timer after answering
      elapsedTime: quizState.elapsedTime + questionElapsedTime
    });
  };

  // Handle navigation to next question
  const handleNextQuestion = () => {
    if (!quizState || !selectedQuiz) return;
    
    const isLastQuestion = quizState.currentQuestionIndex === quizState.shuffledQuestions.length - 1;
    const now = Date.now();
    
    if (isLastQuestion) {
      // Calculate score and mark quiz as completed
      const calculatedScore = calculateScore(selectedQuiz, quizState.answers);
      setScore(calculatedScore);
      setQuizState({
        ...quizState,
        isCompleted: true,
      });
    } else {
      // Move to next question and resume timer
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
        showFeedback: false,  // Reset feedback for next question
        isPaused: false,      // Resume timer for next question
        currentQuestionStartTime: now  // Reset the start time for the next question
      });
    }
  };

  // Handle navigation to previous question
  const handlePreviousQuestion = () => {
    if (!quizState || quizState.currentQuestionIndex === 0) return;
    
    const now = Date.now();
    
    setQuizState({
      ...quizState,
      currentQuestionIndex: quizState.currentQuestionIndex - 1,
      showFeedback: false,  // Reset feedback when going to previous question
      isPaused: false,      // Resume timer
      currentQuestionStartTime: now  // Reset the start time for this question
    });
  };
  
  // Handle timer updates
  const handleTimeUpdate = (totalElapsedTime: number) => {
    if (!quizState) return;
    
    // Update only if not paused to avoid unnecessary rerenders
    if (!quizState.isPaused) {
      setQuizState({
        ...quizState,
        elapsedTime: totalElapsedTime
      });
    }
  };
  
  // Toggle high scores view
  const handleToggleHighScores = () => {
    setShowHighScores(!showHighScores);
  };
  
  // Toggle all high scores modal
  const handleToggleAllHighScores = () => {
    setShowAllHighScores(!showAllHighScores);
  };
  
  // Close all high scores modal
  const handleCloseAllHighScores = () => {
    setShowAllHighScores(false);
  };
  
  // Handle score save completion
  const handleScoreSaved = () => {
    setScoreSaved(true);
    // Show high scores after saving
    setShowHighScores(true);
  };

  // Handle retaking the quiz
  const handleRetakeQuiz = () => {
    if (!selectedQuiz) return;
    setQuizState(initializeQuiz(selectedQuiz));
    setScore(null);
  };

  // Back to quiz selection
  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setQuizState(null);
    setScore(null);
  };

  // Render content based on state
  const renderContent = () => {
    // If no quiz is selected, show quiz selection
    if (!selectedQuiz || !quizState) {
      return (
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-navy-700">QuizMaster</h1>
            <button
              onClick={handleToggleAllHighScores}
              className="flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span>High Scores</span>
            </button>
          </div>
          <QuizSelection quizzes={quizzes} onSelectQuiz={handleSelectQuiz} />
        </div>
      );
    }

    // If quiz is completed, show results
    if (quizState.isCompleted && score !== null) {
      return (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <QuizResults 
            quiz={selectedQuiz} 
            score={score}
            timeInSeconds={quizState.elapsedTime}
            onRetakeQuiz={handleRetakeQuiz}
            onBackToQuizzes={handleBackToQuizzes}
            onToggleHighScores={handleToggleHighScores}
            showHighScores={showHighScores}
            scoreSaved={scoreSaved}
          />
          
          {showHighScores && (
            <div className="mt-2">
              <HighScoresList quizId={selectedQuiz.id} />
            </div>
          )}
          
          {!scoreSaved && !showHighScores && (
            <div className="mt-2">
              <SaveScoreForm
                quizId={selectedQuiz.id}
                score={score}
                accuracy={score} // Using score as accuracy for simplicity
                timeInSeconds={quizState.elapsedTime}
                onSaveComplete={handleScoreSaved}
              />
            </div>
          )}
        </div>
      );
    }

    // Otherwise, show current question
    const currentQuestion = quizState.shuffledQuestions[quizState.currentQuestionIndex];
    const options = quizState.shuffledOptions[currentQuestion.id];
    const selectedAnswer = quizState.answers[currentQuestion.id];
    const hasAnswered = selectedAnswer !== undefined;

    return (
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="flex justify-between items-center w-full">
          <button 
            onClick={handleBackToQuizzes}
            className="self-start flex items-center text-navy-600 hover:text-navy-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to quizzes</span>
          </button>
          
          <QuizTimer 
            startTime={quizState.currentQuestionStartTime}
            elapsedTime={quizState.elapsedTime}
            isPaused={quizState.isPaused}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
        
        <QuizQuestionComponent
          question={currentQuestion}
          options={options}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={quizState.shuffledQuestions.length}
          showFeedback={quizState.showFeedback}
        />
        
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
              quizState.currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-navy-600 hover:text-navy-800 border border-gray-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={!hasAnswered}
            className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
              hasAnswered
                ? quizState.showFeedback 
                  ? 'bg-navy-600 text-white hover:bg-navy-700 animate-pulse'
                  : 'bg-navy-600 text-white hover:bg-navy-700'
                : 'bg-navy-300 text-white cursor-not-allowed'
            }`}
          >
            <span>{quizState.currentQuestionIndex === quizState.shuffledQuestions.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        {renderContent()}
        
        {/* All High Scores Modal */}
        {showAllHighScores && (
          <AllHighScoresModal
            quizzes={quizzes}
            onClose={handleCloseAllHighScores}
          />
        )}
      </div>
    </div>
  );
}

export default App;
