import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Quiz, QuizQuestion } from "@/shared/types";
import { quizData } from "@/data/quizData";
import { 
  prepareQuizForPlay, 
  generateMultipleChoiceOptions, 
  getAllAnswersFromQuiz 
} from "@/react-app/utils/quizUtils";
import { useTimer } from "@/react-app/hooks/useTimer";
import QuestionCard from "@/react-app/components/QuestionCard";
import QuizResults from "@/react-app/components/QuizResults";
import TimerDisplay from "@/react-app/components/TimerDisplay";
import NameEntryModal from "@/react-app/components/NameEntryModal";
import { saveHighScore } from "@/firebase/highScores";
import { Home } from "lucide-react";

export default function QuizPlay() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const { 
    timer, 
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    stopTimer, 
    resetTimer, 
    getCurrentTime 
  } = useTimer();

  useEffect(() => {
    const foundQuiz = quizData.find(q => q.quizID === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      const randomized = prepareQuizForPlay(foundQuiz);
      setRandomizedQuestions(randomized);
      
      // Generate options for the first question
      if (randomized.length > 0) {
        const allAnswers = getAllAnswersFromQuiz(foundQuiz);
        const options = generateMultipleChoiceOptions(randomized[0].answer, allAnswers);
        setCurrentOptions(options);
        
        // Start the timer when quiz begins
        startTimer();
      }
    } else {
      navigate("/");
    }
  }, [quizId, navigate]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    // Pause timer when answer is selected
    pauseTimer();
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer || !quiz) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    const isCorrect = selectedAnswer === randomizedQuestions[currentQuestionIndex].answer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (currentQuestionIndex + 1 < randomizedQuestions.length) {
      // Move to next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
      
      // Generate options for next question
      const allAnswers = getAllAnswersFromQuiz(quiz);
      const options = generateMultipleChoiceOptions(
        randomizedQuestions[nextIndex].answer, 
        allAnswers
      );
      setCurrentOptions(options);
      
      // Resume timer for next question
      resumeTimer();
    } else {
      // Quiz complete - stop timer and save final time
      const completionTime = stopTimer();
      setFinalTime(completionTime);
      setIsComplete(true);
      setShowNameEntry(true);
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleRetakeQuiz = () => {
    if (!quiz) return;
    
    // Reset all state
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setScore(0);
    setIsComplete(false);
    setShowFeedback(false);
    setShowNameEntry(false);
    setFinalTime(0);
    
    // Reset timer
    resetTimer();
    
    // Re-randomize questions
    const randomized = prepareQuizForPlay(quiz);
    setRandomizedQuestions(randomized);
    
    // Generate new options for first question
    if (randomized.length > 0) {
      const allAnswers = getAllAnswersFromQuiz(quiz);
      const options = generateMultipleChoiceOptions(randomized[0].answer, allAnswers);
      setCurrentOptions(options);
      
      // Start new timer
      startTimer();
    }
  };

  const handleSaveScore = async (playerName: string) => {
    if (!quiz) return;
    
    try {
      const accuracy = (score / randomizedQuestions.length) * 100;
      
      await saveHighScore({
        quizId: quiz.quizID,
        quizName: quiz.quizName,
        playerName,
        score,
        totalQuestions: randomizedQuestions.length,
        accuracy,
        timeMs: finalTime,
        dateTime: new Date().toISOString(),
        createdAt: Date.now(),
      });
      
      setShowNameEntry(false);
    } catch (error) {
      console.error('Failed to save high score:', error);
      // Still close the modal even if save fails
      setShowNameEntry(false);
    }
  };

  const handleSkipSave = () => {
    setShowNameEntry(false);
  };

  if (!quiz || randomizedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <QuizResults
          quiz={quiz}
          score={score}
          totalQuestions={randomizedQuestions.length}
          timeMs={finalTime}
          onReturnHome={handleReturnHome}
          onRetakeQuiz={handleRetakeQuiz}
        />
        
        <NameEntryModal
          isOpen={showNameEntry}
          onSubmit={handleSaveScore}
          onSkip={handleSkipSave}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handleReturnHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-navy-600 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{quiz.quizName}</h1>
          <TimerDisplay
            getCurrentTime={getCurrentTime}
            isRunning={timer.isRunning}
            isPaused={timer.isPaused}
          />
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={randomizedQuestions[currentQuestionIndex].question}
        image={randomizedQuestions[currentQuestionIndex].image}
        options={currentOptions}
        selectedAnswer={selectedAnswer}
        correctAnswer={randomizedQuestions[currentQuestionIndex].answer}
        onAnswerSelect={handleAnswerSelect}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={randomizedQuestions.length}
        showFeedback={showFeedback}
      />

      {/* Next Button */}
      <div className="max-w-2xl mx-auto mt-8">
        {showFeedback && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-4 px-6 rounded-lg font-medium text-white bg-navy-600 hover:bg-navy-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            {currentQuestionIndex + 1 === randomizedQuestions.length ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
