import { useState, useEffect, useRef } from 'react';
import { Quiz as QuizType, Question } from '@/data/quizData';
import { Home, ChevronRight, Clock } from 'lucide-react';
import HighScoreSubmissionModal from './HighScoreSubmissionModal';

interface QuizProps {
  quiz: QuizType;
  onReturnHome: () => void;
}

interface QuizQuestion extends Question {
  choices: string[];
}

export default function Quiz({ quiz, onReturnHome }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showHighScoreModal, setShowHighScoreModal] = useState(false);
  
  // Timer state
  const [totalTimeMs, setTotalTimeMs] = useState<number>(0);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number>(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Shuffle array utility function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate wrong answers from other questions
  const generateChoices = (correctAnswer: string, allAnswers: string[]): string[] => {
    const wrongAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    const selectedWrongAnswers = shuffleArray(wrongAnswers).slice(0, 3);
    return shuffleArray([correctAnswer, ...selectedWrongAnswers]);
  };

  useEffect(() => {
    // Shuffle questions and generate choices for each
    const allAnswers = quiz.questions.map(q => q.answer);
    const shuffledQuestions = shuffleArray(quiz.questions);
    
    const questionsWithChoices = shuffledQuestions.map(question => ({
      ...question,
      choices: generateChoices(question.answer, allAnswers)
    }));
    
    setQuizQuestions(questionsWithChoices);
    
    // Start the timer when quiz begins
    const now = Date.now();
    setCurrentQuestionStartTime(now);
    setIsTimerPaused(false);
  }, [quiz]);
  
  // Timer effect
  useEffect(() => {
    if (!isTimerPaused && currentQuestionStartTime > 0) {
      intervalRef.current = setInterval(() => {
        // Timer is running, but we'll calculate total time when needed
      }, 10); // Update every 10ms for smooth display
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isTimerPaused, currentQuestionStartTime]);

  const handleAnswerSelect = (answer: string) => {
    if (answered) return;
    
    // Pause timer when answer is selected
    const now = Date.now();
    setTotalTimeMs(prev => prev + (now - currentQuestionStartTime));
    setIsTimerPaused(true);
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      // Resume timer for next question
      setCurrentQuestionStartTime(Date.now());
      setIsTimerPaused(false);
      
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setAnswered(false);
    } else {
      // Quiz finished
      setShowResult(true);
      setShowHighScoreModal(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setShowHighScoreModal(false);
    
    // Reset timer
    const now = Date.now();
    setCurrentQuestionStartTime(now);
    setTotalTimeMs(0);
    setIsTimerPaused(false);
    
    // Re-shuffle questions and regenerate choices
    const allAnswers = quiz.questions.map(q => q.answer);
    const shuffledQuestions = shuffleArray(quiz.questions);
    
    const questionsWithChoices = shuffledQuestions.map(question => ({
      ...question,
      choices: generateChoices(question.answer, allAnswers)
    }));
    
    setQuizQuestions(questionsWithChoices);
  };
  
  // Calculate current elapsed time
  const getCurrentTime = (): number => {
    if (isTimerPaused) {
      return totalTimeMs;
    }
    return totalTimeMs + (Date.now() - currentQuestionStartTime);
  };
  
  const formatTime = (timeMs: number): string => {
    const seconds = (timeMs / 1000).toFixed(2);
    return `${seconds}s`;
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-navy-600">Loading quiz...</div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onReturnHome}
            className="mb-6 flex items-center gap-2 text-navy-600 hover:text-navy-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </button>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-navy-600 to-navy-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">{percentage}%</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-lg text-gray-600 mb-6">
              You scored {score} out of {quizQuestions.length} questions correctly
            </p>
            
            <div className="mb-4 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>Time: {formatTime(totalTimeMs)}</span>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="bg-navy-700 hover:bg-navy-800 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onReturnHome}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Choose Another Quiz
              </button>
            </div>
          </div>
        </div>
        
        <HighScoreSubmissionModal
          isOpen={showHighScoreModal}
          onClose={() => setShowHighScoreModal(false)}
          quizId={quiz.quizID}
          quizName={quiz.quizName}
          score={score}
          totalQuestions={quizQuestions.length}
          timeMs={totalTimeMs}
        />
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 text-navy-600 hover:text-navy-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(getCurrentTime())}</span>
            </div>
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-navy-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>
          
          {currentQuestion.image && (
            <div className="mb-6">
              <img 
                src={currentQuestion.image} 
                alt="Question illustration"
                className="w-full max-w-md mx-auto h-48 object-contain rounded-xl shadow-sm"
              />
            </div>
          )}
          
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswer === choice;
              const isCorrect = choice === currentQuestion.answer;
              const showCorrect = answered && isCorrect;
              const showWrong = answered && isSelected && !isCorrect;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(choice)}
                  disabled={answered}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    showCorrect
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : showWrong
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : isSelected
                      ? 'border-navy-500 bg-navy-50 text-navy-800'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-navy-300 hover:bg-navy-50'
                  } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{choice}</span>
                    {showCorrect && <span className="text-green-600 font-bold">✓</span>}
                    {showWrong && <span className="text-red-600 font-bold">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>
          
          {answered && (
            <div className="mt-6 text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-navy-700 hover:bg-navy-800 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center gap-2 mx-auto"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
