import { useState, useEffect } from 'react';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizResult } from '../components/QuizResult';
import { Timer } from '../components/Timer';
import { quizData, type QuizQuestion as QuizQuestionType } from '../data/quizData';
import { ArrowLeft, BarChart4 } from 'lucide-react';

interface QuizPageProps {
  quizID: string;
  onHome: () => void;
}

export function QuizPage({ quizID, onHome }: QuizPageProps) {
  const [currentQuizData] = useState(() => {
    return quizData.find(quiz => quiz.quizID === quizID);
  });
  
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  
  // Shuffle array function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Initialize quiz
  useEffect(() => {
    if (!currentQuizData) return;
    
    // Shuffle questions
    const shuffledQuestions = shuffleArray(currentQuizData.questions);
    setQuestions(shuffledQuestions);
    
    // Reset state
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setTotalTime(0);
    
    // Start the timer when quiz begins
    setTimerRunning(true);
  }, [currentQuizData, quizID]);
  
  // Generate options for current question
  useEffect(() => {
    if (!questions.length) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    
    // Get all other answers from quiz for incorrect options
    const otherAnswers = quizData
      .flatMap(quiz => quiz.questions.map(q => q.answer))
      .filter(answer => answer !== correctAnswer);
    
    // Shuffle and take 3 random incorrect options
    const incorrectOptions = shuffleArray(otherAnswers).slice(0, 3);
    
    // Combine correct and incorrect options, then shuffle
    const allOptions = shuffleArray([correctAnswer, ...incorrectOptions]);
    setOptions(allOptions);
  }, [questions, currentQuestionIndex]);
  
  // Handle answer selection
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    // Pause timer when answer is selected
    setTimerRunning(false);
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      // Resume timer for next question
      setTimerRunning(true);
    } else {
      setQuizComplete(true);
      // Ensure timer is stopped
      setTimerRunning(false);
    }
  };
  
  // Update total time from timer component
  const handleTimerUpdate = (elapsedTime: number) => {
    setTotalTime(elapsedTime);
  };
  
  // Restart quiz
  const handleRestart = () => {
    if (!currentQuizData) return;
    
    // Shuffle questions again
    const shuffledQuestions = shuffleArray(currentQuizData.questions);
    setQuestions(shuffledQuestions);
    
    // Reset state
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };
  
  if (!currentQuizData) {
    return (
      <div className="text-center p-8">
        <p className="text-navy-800 mb-4">Quiz not found</p>
        <button 
          onClick={onHome}
          className="py-2 px-4 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      {!quizComplete ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={onHome}
              className="flex items-center text-navy-600 hover:text-navy-800 transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Return to Home
            </button>
            
            <div className="flex items-center gap-4 text-navy-700">
              <div className="flex items-center">
                <BarChart4 className="mr-1 h-4 w-4" />
                <span>{currentQuestionIndex + 1} / {questions.length}</span>
              </div>
              <Timer isRunning={timerRunning} onTimerUpdate={handleTimerUpdate} />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="w-full bg-navy-100 rounded-full h-2">
              <div 
                className="bg-navy-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {questions.length > 0 && options.length === 4 && (
            <QuizQuestion 
              key={currentQuestionIndex} // Add a key prop to force component remount
              question={questions[currentQuestionIndex].question}
              correctAnswer={questions[currentQuestionIndex].answer}
              image={questions[currentQuestionIndex].image}
              options={options}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
            />
          )}
        </>
      ) : (
        <QuizResult 
          score={score}
          totalQuestions={questions.length}
          quizName={currentQuizData.quizName}
          quizID={currentQuizData.quizID}
          timeTaken={totalTime}
          onRestart={handleRestart}
          onHome={onHome}
        />
      )}
    </div>
  );
}
