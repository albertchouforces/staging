import { useState, useEffect, useMemo } from 'react';
import { FlashCard } from './components/FlashCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { StartScreen } from './components/StartScreen';
import { UserNameInput } from './components/UserNameInput';
import { Footer } from './components/Footer';
import { templateQuestions, secondQuizQuestions, combinedQuestions, QUIZ_CONFIG, SECOND_QUIZ_CONFIG, COMBINED_QUIZ_CONFIG } from './data/templateQuiz';
import { shuffleArray, getRandomOptions } from './lib/utils';
import type { QuizStats, QuestionData, HighScoreEntry } from './types';
import { Book } from 'lucide-react';

type GameState = 'start' | 'playing' | 'entering-name';
type QuizType = 'quiz1' | 'quiz2' | 'combined';

const INITIAL_QUIZ_STATS: QuizStats = {
  highScore: 0,
  bestRun: null,
  highScores: []
};

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState<QuestionData[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [lastPauseTime, setLastPauseTime] = useState<number | null>(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  const currentQuizConfig = useMemo(() => {
    switch (selectedQuiz) {
      case 'quiz2':
        return SECOND_QUIZ_CONFIG;
      case 'combined':
        return COMBINED_QUIZ_CONFIG;
      default:
        return QUIZ_CONFIG;
    }
  }, [selectedQuiz]);
  
  // Debug logging for question arrays
  useEffect(() => {
    console.log('Template Questions length:', templateQuestions.length);
    console.log('Second Quiz Questions length:', secondQuizQuestions.length);
    console.log('Combined Questions length:', combinedQuestions.length);
  }, []);

  // Get all unique possible answers for the current quiz
  const allPossibleAnswers = useMemo(() => {
    let currentQuestions;
    switch (selectedQuiz) {
      case 'quiz2':
        currentQuestions = secondQuizQuestions;
        break;
      case 'combined':
        currentQuestions = combinedQuestions;
        break;
      default:
        currentQuestions = templateQuestions;
    }
    return Array.from(new Set(currentQuestions.map(q => q.correctAnswer)));
  }, [selectedQuiz]);

  // Load initial stats from localStorage
  useEffect(() => {
    if (selectedQuiz) {
      const statsKey = `quiz_stats_${currentQuizConfig.quiz_name}`;
      const storedStats = localStorage.getItem(statsKey);
      if (!storedStats) {
        localStorage.setItem(statsKey, JSON.stringify(INITIAL_QUIZ_STATS));
      }
    }
  }, [selectedQuiz, currentQuizConfig.quiz_name]);

  // Timer effect with pause functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameState === 'playing' && startTime && !isPaused) {
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime - accumulatedTime;
        setCurrentTime(elapsed);
      }, 10);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState, startTime, isPaused, accumulatedTime]);

  const getCurrentStats = (): QuizStats => {
    const statsKey = `quiz_stats_${currentQuizConfig.quiz_name}`;
    const storedStats = localStorage.getItem(statsKey);
    if (storedStats) {
      return JSON.parse(storedStats);
    }
    return INITIAL_QUIZ_STATS;
  };

  const pauseTimer = () => {
    if (!isPaused) {
      setIsPaused(true);
      setLastPauseTime(Date.now());
    }
  };

  const resumeTimer = () => {
    if (isPaused && lastPauseTime) {
      const pauseDuration = Date.now() - lastPauseTime;
      setAccumulatedTime(prev => prev + pauseDuration);
      setIsPaused(false);
      setLastPauseTime(null);
    }
  };

  const handleQuizSelect = (quiz: QuizType) => {
    console.log('Selected quiz:', quiz);
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    handleStart(quiz);
  };

  const updateStats = (userName: string) => {
    const statsKey = `quiz_stats_${currentQuizConfig.quiz_name}`;
    const currentStats = getCurrentStats();
    const accuracy = Math.round((correctAnswers / totalAnswers) * 100);

    const newHighScore = Math.max(currentStats.highScore, correctAnswers);

    const shouldUpdateBestRun = !currentStats.bestRun || 
      (correctAnswers >= currentStats.bestRun.score && currentTime < currentStats.bestRun.time);

    const newBestRun = shouldUpdateBestRun ? {
      userName,
      time: currentTime,
      score: correctAnswers,
      accuracy
    } : currentStats.bestRun;

    const newScore: HighScoreEntry = {
      userName,
      score: correctAnswers,
      accuracy,
      time: currentTime,
      date: new Date().toISOString()
    };

    const newHighScores = [...currentStats.highScores, newScore]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
      })
      .slice(0, 5);

    const newStats = {
      highScore: newHighScore,
      bestRun: newBestRun,
      highScores: newHighScores
    };

    try {
      localStorage.setItem(statsKey, JSON.stringify(newStats));
      console.log('Successfully saved local stats:', newStats);
    } catch (error) {
      console.error('Error saving stats to localStorage:', error);
    }
  };

  const handleStart = (quizType: QuizType = 'quiz1') => {
    // Get the appropriate questions array based on selected quiz
    let questionsForQuiz;
    switch (quizType) {
      case 'quiz2':
        questionsForQuiz = secondQuizQuestions;
        break;
      case 'combined':
        questionsForQuiz = combinedQuestions;
        break;
      default:
        questionsForQuiz = templateQuestions;
    }
    
    console.log(`Starting ${quizType} with ${questionsForQuiz.length} questions`);
    
    // Create a copy and shuffle all questions
    const shuffledQuestions = shuffleArray([...questionsForQuiz]);
    console.log('Shuffled questions length:', shuffledQuestions.length);
    
    // Reset all state
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setCurrentTime(0);
    setStartTime(Date.now());
    setIsPaused(false);
    setLastPauseTime(null);
    setAccumulatedTime(0);
    setRandomizedQuestions(shuffledQuestions);

    // Additional debug logging
    console.log('Randomized questions set:', shuffledQuestions.length);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) setCorrectAnswers(prev => prev + 1);
    setTotalAnswers(prev => prev + 1);
    pauseTimer();
  };

  const handleNext = () => {
    resumeTimer();
    if (currentQuestionIndex < randomizedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('entering-name');
    }
  };

  const handleRestart = () => {
    setGameState('start');
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setRandomizedQuestions([]);
  };

  const handleUserNameSubmit = (userName: string) => {
    console.log('Handling username submit:', userName);
    try {
      updateStats(userName);
      setGameState('start');
      setSelectedQuiz(null);
    } catch (error) {
      console.error('Error in handleUserNameSubmit:', error);
    }
  };

  const getCurrentQuestion = () => {
    if (!randomizedQuestions.length) return null;
    return randomizedQuestions[currentQuestionIndex];
  };

  const options = useMemo(() => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return [];
    
    return getRandomOptions(allPossibleAnswers, currentQuestion.correctAnswer, 4);
  }, [currentQuestionIndex, randomizedQuestions, allPossibleAnswers]);

  const handleResetScores = (quizName: string) => {
    const statsKey = `quiz_stats_${quizName}`;
    localStorage.setItem(statsKey, JSON.stringify(INITIAL_QUIZ_STATS));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto flex flex-col items-center gap-8">
          {gameState === 'start' ? (
            <StartScreen 
              onQuizSelect={handleQuizSelect}
              quiz1Stats={JSON.parse(localStorage.getItem(`quiz_stats_${QUIZ_CONFIG.quiz_name}`) || JSON.stringify(INITIAL_QUIZ_STATS))}
              quiz2Stats={JSON.parse(localStorage.getItem(`quiz_stats_${SECOND_QUIZ_CONFIG.quiz_name}`) || JSON.stringify(INITIAL_QUIZ_STATS))}
              combinedStats={JSON.parse(localStorage.getItem(`quiz_stats_${COMBINED_QUIZ_CONFIG.quiz_name}`) || JSON.stringify(INITIAL_QUIZ_STATS))}
              onResetScores={handleResetScores}
              quiz1Config={QUIZ_CONFIG}
              quiz2Config={SECOND_QUIZ_CONFIG}
              combinedConfig={COMBINED_QUIZ_CONFIG}
            />
          ) : (
            <>
              {/* Quiz Title Header */}
              <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-4 mb-2">
                <div className="flex items-center justify-center gap-3">
                  <Book className={`text-${currentQuizConfig.themeColor}-600`} size={24} />
                  <h1 className={`text-2xl font-bold text-${currentQuizConfig.themeColor}-600`}>
                    {currentQuizConfig.title}
                  </h1>
                </div>
              </div>

              {gameState === 'playing' && getCurrentQuestion() ? (
                <div className="flex flex-col items-center gap-6">
                  <ScoreDisplay 
                    correct={correctAnswers} 
                    total={totalAnswers} 
                    highScore={getCurrentStats().highScore}
                    onRestart={handleRestart}
                    isFinished={false}
                    totalQuestions={randomizedQuestions.length}
                    currentTime={currentTime}
                    bestRun={getCurrentStats().bestRun}
                    quizConfig={currentQuizConfig}
                  />
                  <FlashCard
                    question={getCurrentQuestion()!}
                    options={options}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={randomizedQuestions.length}
                  />
                </div>
              ) : gameState === 'entering-name' ? (
                <div className="flex flex-col items-center gap-6">
                  <ScoreDisplay 
                    correct={correctAnswers} 
                    total={totalAnswers} 
                    highScore={getCurrentStats().highScore}
                    onRestart={handleRestart}
                    isFinished={true}
                    totalQuestions={randomizedQuestions.length}
                    currentTime={currentTime}
                    bestRun={getCurrentStats().bestRun}
                    quizConfig={currentQuizConfig}
                  />
                  <UserNameInput 
                    onSubmit={handleUserNameSubmit}
                    currentScore={correctAnswers}
                    currentTime={currentTime}
                    highScores={getCurrentStats().highScores}
                    quizConfig={currentQuizConfig}
                    totalQuestions={randomizedQuestions.length}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
