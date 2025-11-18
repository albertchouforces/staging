import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Loader2, Home, CheckCircle, XCircle, Clock } from 'lucide-react';
import SubmitScoreModal from '@/react-app/components/SubmitScoreModal';

interface QuizQuestion {
  question: string;
  answer: string;
  image?: string;
}

interface Quiz {
  quizID: string;
  quizName: string;
  questions: QuizQuestion[];
}

interface ShuffledQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
  image?: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareQuizQuestions(quiz: Quiz): ShuffledQuestion[] {
  const allAnswers = quiz.questions.map((q) => q.answer);
  
  const questionsWithOptions = quiz.questions.map((question) => {
    const wrongAnswers = allAnswers
      .filter((answer) => answer !== question.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = shuffleArray([question.answer, ...wrongAnswers]);
    
    return {
      question: question.question,
      correctAnswer: question.answer,
      options,
      image: question.image,
    };
  });
  
  return shuffleArray(questionsWithOptions);
}

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showSubmitScore, setShowSubmitScore] = useState(false);
  
  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    fetch(`/api/quizzes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Quiz not found');
        return res.json();
      })
      .then((data) => {
        setQuiz(data);
        setShuffledQuestions(prepareQuizQuestions(data));
        setLoading(false);
        // Start timer when quiz loads
        startTimer();
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      });

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [id]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      startTimeRef.current = performance.now();
      
      const updateTimer = () => {
        if (startTimeRef.current) {
          const now = performance.now();
          const delta = now - startTimeRef.current;
          setElapsedTime(accumulatedTimeRef.current + delta);
          timerRef.current = requestAnimationFrame(updateTimer);
        }
      };
      
      timerRef.current = requestAnimationFrame(updateTimer);
    }
  };

  const pauseTimer = () => {
    if (isTimerRunning && timerRef.current) {
      setIsTimerRunning(false);
      cancelAnimationFrame(timerRef.current);
      
      if (startTimeRef.current) {
        const now = performance.now();
        accumulatedTimeRef.current += now - startTimeRef.current;
      }
      
      timerRef.current = null;
      startTimeRef.current = null;
    }
  };

  const formatTime = (ms: number): string => {
    const seconds = ms / 1000;
    return seconds.toFixed(2) + 's';
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    pauseTimer();
    
    if (answer === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      startTimer();
    } else {
      setShowResults(true);
    }
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleRetakeQuiz = () => {
    if (quiz) {
      setShuffledQuestions(prepareQuizQuestions(quiz));
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setScore(0);
      setShowResults(false);
      setShowSubmitScore(false);
      setElapsedTime(0);
      accumulatedTimeRef.current = 0;
      startTimer();
    }
  };

  const handleSubmitScoreClose = () => {
    setShowSubmitScore(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin text-navy-600">
          <Loader2 className="w-10 h-10" />
        </div>
      </div>
    );
  }

  if (!quiz || shuffledQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <p className="text-xl text-navy-900 mb-6">Quiz not found</p>
        <button
          onClick={handleReturnHome}
          className="px-6 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy-600 mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-navy-900 mb-3">Quiz Complete!</h1>
            <p className="text-lg text-navy-600">{quiz.quizName}</p>
          </div>

          <div className="bg-navy-50 rounded-xl p-8 mb-8">
            <div className="grid grid-cols-2 gap-6 text-center mb-6">
              <div>
                <div className="text-5xl font-bold text-navy-900 mb-2">
                  {score}/{shuffledQuestions.length}
                </div>
                <p className="text-lg text-navy-600">
                  Score ({percentage}%)
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold text-navy-900 mb-2 font-mono">
                  {formatTime(elapsedTime)}
                </div>
                <p className="text-lg text-navy-600">
                  Time Taken
                </p>
              </div>
            </div>
            <div className="w-full bg-navy-200 rounded-full h-3">
              <div
                className="bg-navy-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setShowSubmitScore(true)}
              className="flex-1 px-6 py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
            >
              Submit Score
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRetakeQuiz}
              className="flex-1 px-6 py-4 border-2 border-navy-600 text-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium"
            >
              Retake Quiz
            </button>
            <button
              onClick={handleReturnHome}
              className="flex-1 px-6 py-4 border-2 border-navy-600 text-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </div>
        </div>

        <SubmitScoreModal
          isOpen={showSubmitScore}
          onClose={handleSubmitScoreClose}
          quizID={quiz.quizID}
          score={score}
          totalQuestions={shuffledQuestions.length}
          timeMs={Math.round(elapsedTime)}
        />
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors mb-6"
          >
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </button>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-navy-900">{quiz.quizName}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-navy-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-navy-600" />
                <span className="text-navy-900 font-mono font-medium">
                  {formatTime(elapsedTime)}
                </span>
              </div>
              <span className="text-navy-600 font-medium">
                {currentQuestionIndex + 1} / {shuffledQuestions.length}
              </span>
            </div>
          </div>
          
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-navy-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white border-2 border-navy-200 rounded-xl p-8 mb-8">
          {currentQuestion.image && (
            <div className="mb-8 flex items-center justify-center">
              <img 
                src={currentQuestion.image} 
                alt="Question illustration"
                className="max-h-80 w-auto object-contain rounded-lg"
              />
            </div>
          )}
          <h3 className="text-2xl font-semibold text-navy-900 mb-8">
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = isAnswered && isCorrect;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`
                    relative p-6 rounded-lg border-2 text-left transition-all
                    ${!isAnswered && 'hover:border-navy-600 hover:bg-navy-50'}
                    ${showCorrect && 'border-green-500 bg-green-50'}
                    ${showIncorrect && 'border-red-500 bg-red-50'}
                    ${!isAnswered && 'border-navy-200'}
                    ${isAnswered && !isSelected && !isCorrect && 'border-navy-200 opacity-50'}
                    ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-navy-900 pr-8">{option}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />}
                    {showIncorrect && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full px-6 py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium text-lg"
          >
            {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
}
