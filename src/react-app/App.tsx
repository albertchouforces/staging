import { useState, useEffect, useMemo } from 'react';
import { FlashCard } from '@/react-app/components/FlashCard';
import { ScoreDisplay } from '@/react-app/components/ScoreDisplay';
import { StartScreen } from '@/react-app/components/StartScreen';
import { UserNameInput } from '@/react-app/components/UserNameInput';
import { Footer } from '@/react-app/components/Footer';
import { QUIZ_COLLECTION, getQuizByIndex } from '@/react-app/data/quizData';
import { shuffleArray, getRandomOptions } from '@/react-app/lib/utils';
import type { QuizStats, QuestionData, HighScoreEntry } from '@/react-app/types';
import { Book } from 'lucide-react';
import { getThemeColor } from '@/react-app/lib/themeColors';

type GameState = 'start' | 'playing' | 'entering-name';

const INITIAL_QUIZ_STATS: QuizStats = {
  highScore: 0,
  bestRun: null,
  highScores: []
};

function App() {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
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

  const currentQuizDefinition = useMemo(() => {
    if (selectedQuizIndex === null) return QUIZ_COLLECTION[0];
    return getQuizByIndex(selectedQuizIndex) || QUIZ_COLLECTION[0];
  }, [selectedQuizIndex]);

  const currentQuizConfig = currentQuizDefinition.config;
  
  const themeColors = useMemo(() => {
    return getThemeColor(currentQuizConfig.themeColor);
  }, [currentQuizConfig.themeColor]);

  // Get all unique possible answers for the current quiz
  const allPossibleAnswers = useMemo(() => {
    return Array.from(new Set(currentQuizDefinition.questions.map(q => q.correctAnswer)));
  }, [currentQuizDefinition]);

  // Load initial stats from localStorage
  useEffect(() => {
    if (selectedQuizIndex !== null) {
      const statsKey = `quiz_stats_${currentQuizConfig.quizKey}`;
      const storedStats = localStorage.getItem(statsKey);
      if (!storedStats) {
        localStorage.setItem(statsKey, JSON.stringify(INITIAL_QUIZ_STATS));
      }
    }
  }, [selectedQuizIndex, currentQuizConfig.quizKey]);

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
    const statsKey = `quiz_stats_${currentQuizConfig.quizKey}`;
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

  const handleQuizSelect = (quizIndex: number) => {
    console.log('Selected quiz index:', quizIndex);
    setSelectedQuizIndex(quizIndex);
    setCurrentQuestionIndex(0);
    handleStart(quizIndex);
  };

  const updateStats = (userName: string) => {
    const statsKey = `quiz_stats_${currentQuizConfig.quizKey}`;
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

  const handleStart = (quizIndex: number) => {
    const quizDef = getQuizByIndex(quizIndex);
    if (!quizDef) return;
    
    console.log(`Starting ${quizDef.config.title} with ${quizDef.questions.length} questions`);
    
    // Create a copy and shuffle all questions
    const shuffledQuestions = shuffleArray([...quizDef.questions]);
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
    // Restart with freshly shuffled questions
    if (selectedQuizIndex !== null) {
      handleStart(selectedQuizIndex);
    }
  };

  const handleStartNew = () => {
    // Go back to home screen to select a new quiz
    setGameState('start');
    setSelectedQuizIndex(null);
    setCurrentQuestionIndex(0);
    setRandomizedQuestions([]);
  };

  const handleUserNameSubmit = (userName: string) => {
    console.log('Handling username submit:', userName);
    try {
      updateStats(userName);
      setGameState('start');
      setSelectedQuizIndex(null);
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

  const handleResetScores = (quizKey: string) => {
    const statsKey = `quiz_stats_${quizKey}`;
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
              onResetScores={handleResetScores}
              quizzes={QUIZ_COLLECTION}
            />
          ) : (
            <>
              {/* Quiz Title Header */}
              <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-4 mb-2">
                <div className="flex items-center justify-center gap-3">
                  <Book size={24} style={{ color: themeColors.primary }} />
                  <h1 className="text-2xl font-bold" style={{ color: themeColors.primary }}>
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
                    onStartNew={handleStartNew}
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
                    themeColor={currentQuizConfig.themeColor}
                  />
                </div>
              ) : gameState === 'entering-name' ? (
                <div className="flex flex-col items-center gap-6">
                  <ScoreDisplay 
                    correct={correctAnswers} 
                    total={totalAnswers} 
                    highScore={getCurrentStats().highScore}
                    onRestart={handleRestart}
                    onStartNew={handleStartNew}
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
