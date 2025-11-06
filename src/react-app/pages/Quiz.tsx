import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Loader2, Home, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { RandomizedQuiz } from '@/shared/types';
import Timer from '@/react-app/components/Timer';
import SaveHighScoreModal from '@/react-app/components/SaveHighScoreModal';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<RandomizedQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalTimeMs, setTotalTimeMs] = useState(0);
  const [showSaveHighScore, setShowSaveHighScore] = useState(false);

  useEffect(() => {
    fetch(`/api/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setAnsweredQuestions(new Array(data.questions.length).fill(false));
        setLoading(false);
        // Start timer when quiz loads
        setIsTimerRunning(true);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAnswerSelect = (answer: string) => {
    if (answeredQuestions[currentQuestion]) return;
    setSelectedAnswer(answer);
    // Pause timer when answer is selected
    setIsTimerRunning(false);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer || !quiz) return;

    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      // Resume timer for next question
      setIsTimerRunning(true);
    } else {
      // Quiz completed - stop timer and show results
      setIsTimerRunning(false);
      setShowSaveHighScore(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin text-blue-900">
          <Loader2 className="w-10 h-10" />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <p className="text-xl text-gray-600 mb-8">Quiz not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleSaveHighScore = async (playerName: string) => {
    if (!quiz) return;
    
    const highScoreData = {
      quiz_id: quiz.quizID,
      player_name: playerName,
      correct_answers: score,
      total_questions: quiz.questions.length,
      accuracy_percentage: Math.round((score / quiz.questions.length) * 100),
      time_taken_ms: totalTimeMs
    };

    try {
      await fetch('/api/high-scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(highScoreData),
      });
    } catch (error) {
      console.error('Failed to save high score:', error);
    }

    setShowSaveHighScore(false);
    setShowResult(true);
  };

  const handleSkipHighScore = () => {
    setShowSaveHighScore(false);
    setShowResult(true);
  };

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            {percentage >= 70 ? (
              <CheckCircle2 className="w-24 h-24 text-green-600 mx-auto mb-6" />
            ) : (
              <XCircle className="w-24 h-24 text-red-600 mx-auto mb-6" />
            )}
            <h1 className="text-5xl font-bold text-blue-900 mb-4">Quiz Complete!</h1>
            <p className="text-2xl text-gray-600 mb-8">
              You scored {score} out of {quiz.questions.length}
            </p>
            <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden mb-8">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-900 to-blue-700 transition-all duration-1000 flex items-center justify-center"
                style={{ width: `${percentage}%` }}
              >
                <span className="text-white font-bold text-sm">{percentage}%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all hover:shadow-lg flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 border-2 border-blue-900 text-blue-900 rounded-xl font-semibold hover:bg-blue-900 hover:text-white transition-all"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </button>
          <div className="flex items-center gap-4">
            <div className="text-blue-900 font-semibold">
              Question {currentQuestion + 1} / {quiz.questions.length}
            </div>
            <Timer
              isRunning={isTimerRunning}
              onTimeUpdate={setTotalTimeMs}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-1 mb-8">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index < currentQuestion
                    ? 'bg-blue-900'
                    : index === currentQuestion
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{quiz.quizName}</h2>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-900 rounded-2xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6">{question.question}</h3>
          
          {question.image && (
            <div className="mb-8 flex justify-center">
              <img
                src={question.image}
                alt="Quiz question illustration"
                className="max-w-full max-h-64 object-contain rounded-xl shadow-md"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const showCorrect = isAnswered && option === question.correctAnswer;
              const showIncorrect = isAnswered && isSelected && option !== question.correctAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`p-6 rounded-xl text-left font-semibold transition-all border-2 ${
                    showCorrect
                      ? 'bg-green-100 border-green-600 text-green-900'
                      : showIncorrect
                      ? 'bg-red-100 border-red-600 text-red-900'
                      : isSelected
                      ? 'bg-blue-900 border-blue-900 text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-900 hover:border-blue-900 hover:shadow-md'
                  } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isAnswered && (
          <div className="text-center space-y-6">
            <div
              className={`inline-block px-8 py-4 rounded-xl font-bold text-lg ${
                isCorrect
                  ? 'bg-green-100 text-green-900 border-2 border-green-600'
                  : 'bg-red-100 text-red-900 border-2 border-red-600'
              }`}
            >
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            
            <button
              onClick={handleNextQuestion}
              className="px-12 py-4 bg-blue-900 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        <SaveHighScoreModal
          isOpen={showSaveHighScore}
          onSave={handleSaveHighScore}
          onSkip={handleSkipHighScore}
          score={score}
          totalQuestions={quiz?.questions.length || 0}
          timeMs={totalTimeMs}
          accuracy={Math.round((score / (quiz?.questions.length || 1)) * 100)}
        />
      </div>
    </div>
  );
}
