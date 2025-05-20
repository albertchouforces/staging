import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Question } from '../types/quiz';
import { quizSets } from '../data/quizData';
import { getRandomizedQuestions, generateAnswerOptions, calculateScore } from '../utils/quizUtils';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';
import QuizTimer from '../components/QuizTimer';
import NameInputModal from '../components/NameInputModal';

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [showNameInput, setShowNameInput] = useState(false);
  
  const quizSet = quizSets.find(q => q.id === quizId);
  
  useEffect(() => {
    if (!quizSet) {
      navigate('/');
      return;
    }
    
    // Initialize with randomized questions
    startQuiz();
  }, [quizId]);
  
  useEffect(() => {
    if (questions.length > 0) {
      // Generate answer options for current question
      setCurrentAnswers(
        generateAnswerOptions(
          questions[currentQuestionIndex], 
          quizSet?.questions || []
        )
      );
    }
  }, [currentQuestionIndex, questions]);
  
  const startQuiz = () => {
    if (!quizSet) return;
    
    // Reset quiz state
    setSelectedAnswers({});
    setIsCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    
    // Randomize questions
    const randomizedQuestions = getRandomizedQuestions(quizSet);
    setQuestions(randomizedQuestions);
  };
  
  const handleAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setShowFeedback(true);
    setTimerRunning(false); // Pause timer when answer selected
  };
  
  const handleTimerUpdate = (elapsedTime: number) => {
    setTotalTime(elapsedTime);
  };
  
  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Don't proceed if no answer selected
    if (!selectedAnswers[currentQuestion.id]) return;
    
    if (currentQuestionIndex < questions.length - 1) {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowFeedback(false);
        setFadeOut(false);
        setTimerRunning(true); // Resume timer for next question
      }, 300);
    } else {
      // Calculate final score
      const finalScore = calculateScore(selectedAnswers, questions);
      setScore(finalScore);
      setIsCompleted(true);
    }
  };
  
  const handleRetry = () => {
    startQuiz();
  };
  
  if (!quizSet) return null;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-md p-8">
        {!isCompleted ? (
          <div className={`transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">{quizSet.title}</h2>
                <div className="h-1 w-16 bg-blue-900 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <QuizTimer 
                  isRunning={timerRunning}
                  onTimerUpdate={handleTimerUpdate}
                />
              </div>
            </div>
            
            {questions.length > 0 && currentAnswers.length > 0 && (
              <>
                <QuizQuestion 
                  question={questions[currentQuestionIndex]}
                  answers={currentAnswers}
                  onAnswer={handleAnswer}
                  selectedAnswer={selectedAnswers[questions[currentQuestionIndex].id]}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  showFeedback={showFeedback}
                />
                
                <div className="mt-10 flex justify-between items-center">
                  <button
                    onClick={() => navigate('/')}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Exit Quiz
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[questions[currentQuestionIndex].id]}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedAnswers[questions[currentQuestionIndex].id]
                        ? showFeedback 
                          ? 'bg-blue-900 hover:bg-blue-800 text-white animate-pulse'
                          : 'bg-blue-900 hover:bg-blue-800 text-white' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <QuizResults 
              score={score}
              totalQuestions={questions.length}
              quizTitle={quizSet.title}
              onRetry={handleRetry}
              timeTaken={totalTime}
              onSubmitScore={() => setShowNameInput(true)}
            />
            <NameInputModal
              isOpen={showNameInput}
              onClose={() => setShowNameInput(false)}
              quizId={quizId || ''}
              score={score}
              totalQuestions={questions.length}
              timeTaken={totalTime}
            />
          </>
        )}
      </div>
    </div>
  );
}
