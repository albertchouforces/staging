import { useState, useEffect, useMemo } from 'react';
import { FlashCard } from '@/react-app/components/FlashCard';
import { FillInTheBlankCard } from '@/react-app/components/FillInTheBlankCard';
import { ScoreDisplay } from '@/react-app/components/ScoreDisplay';
import { StartScreen } from '@/react-app/components/StartScreen';
import { UserNameInput } from '@/react-app/components/UserNameInput';
import { Footer } from '@/react-app/components/Footer';
import { QuizHeader } from '@/react-app/components/QuizHeader';
import { QUIZ_COLLECTION } from '@/react-app/data/quizData';
import { shuffleArray, getRandomOptions, getCorrectAnswers, isMultiSelect, hasAnswerPool, getAnswerPoolOptions, isFillInTheBlank } from '@/react-app/lib/utils';

import type { QuizStats, QuestionData, HighScoreEntry } from '@/react-app/types';

type GameState = 'selection' | 'playing' | 'entering-name';

const INITIAL_QUIZ_STATS: QuizStats = {
  highScore: 0,
  bestRun: null,
  highScores: []
};

function App() {
  const [gameState, setGameState] = useState<GameState>('selection');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState<QuestionData[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [lastPauseTime, setLastPauseTime] = useState<number | null>(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState<typeof QUIZ_COLLECTION[0] | null>(null);
  const [quizSessionKey, setQuizSessionKey] = useState(0);

  // Get all unique possible answers for the current quiz
  // Only include single-answer questions without custom answer pools
  const allPossibleAnswers = useMemo(() => {
    if (!selectedQuiz) return [];
    
    return Array.from(new Set(
      selectedQuiz.questions
        .filter(q => !isMultiSelect(q.correctAnswer) && !hasAnswerPool(q.answerPool))
        .map(q => q.correctAnswer as string)
    ));
  }, [selectedQuiz]);

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

  const getStatsForQuiz = (quizKey: string): QuizStats => {
    try {
      const statsKey = `quiz_stats_${quizKey}`;
      const storedStats = localStorage.getItem(statsKey);
      if (storedStats) {
        const parsedStats = JSON.parse(storedStats);
        // Validate the structure
        if (typeof parsedStats === 'object' && 
            'highScore' in parsedStats && 
            'highScores' in parsedStats &&
            Array.isArray(parsedStats.highScores)) {
          return parsedStats;
        }
      }
    } catch (error) {
      console.error('Error reading stats from localStorage:', error);
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

  const updateStats = (userName: string) => {
    if (!selectedQuiz) return;

    try {
      const statsKey = `quiz_stats_${selectedQuiz.config.quizKey}`;
      const currentStats = getStatsForQuiz(selectedQuiz.config.quizKey);
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

      // Ensure we only keep the top 5 scores
      // Always sort by score (highest first) then time (fastest first)
      // When ENABLE_TIME_TRACKING is false, the time column is simply hidden from display
      const newHighScores = [...currentStats.highScores, newScore]
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.time - b.time;
        })
        .slice(0, 5);

      const newStats: QuizStats = {
        highScore: newHighScore,
        bestRun: newBestRun,
        highScores: newHighScores
      };

      localStorage.setItem(statsKey, JSON.stringify(newStats));
      console.log('Successfully saved local stats:', newStats);
    } catch (error) {
      console.error('Error saving stats to localStorage:', error);
    }
  };

  const handleSelectQuiz = (quizId: string) => {
    const quiz = QUIZ_COLLECTION.find(q => q.config.id === quizId);
    if (!quiz) return;

    setSelectedQuiz(quiz);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setCurrentTime(0);
    setStartTime(Date.now());
    setIsPaused(false);
    setLastPauseTime(null);
    setAccumulatedTime(0);
    
    // Check if this is a composite quiz (pools questions from other quizzes)
    let questionsToUse: QuestionData[] = quiz.questions;
    
    if (quiz.config.sourceQuizIds && quiz.config.sourceQuizIds.length > 0) {
      // This is a composite quiz - pool questions from source quizzes
      const sourceQuizzes = quiz.config.sourceQuizIds
        .map(id => QUIZ_COLLECTION.find(q => q.config.id === id))
        .filter((q): q is typeof QUIZ_COLLECTION[0] => q !== undefined);
      
      if (sourceQuizzes.length > 0) {
        if (quiz.config.questionCount !== undefined && quiz.config.questionCount > 0) {
          // Even distribution mode: take equal amounts from each source quiz
          const questionsPerQuiz = Math.ceil(quiz.config.questionCount / sourceQuizzes.length);
          const pooledQuestions: QuestionData[] = [];
          
          sourceQuizzes.forEach(sourceQuiz => {
            const shuffledSource = shuffleArray([...sourceQuiz.questions]);
            const questionsWithFactHeading = shuffledSource.slice(0, questionsPerQuiz).map(q => ({
              ...q,
              factHeading: sourceQuiz.config.factHeading
            }));
            pooledQuestions.push(...questionsWithFactHeading);
          });
          
          // Shuffle the pooled questions and trim to exact count
          questionsToUse = shuffleArray(pooledQuestions).slice(0, quiz.config.questionCount);
        } else {
          // No question count specified - use all questions from all source quizzes
          const allQuestions: QuestionData[] = [];
          sourceQuizzes.forEach(sourceQuiz => {
            const questionsWithFactHeading = sourceQuiz.questions.map(q => ({
              ...q,
              factHeading: sourceQuiz.config.factHeading
            }));
            allQuestions.push(...questionsWithFactHeading);
          });
          questionsToUse = allQuestions;
        }
      }
    }
    
    // Randomize questions order
    let shuffled = shuffleArray(questionsToUse);
    
    // If startQuestion is specified, move that question to the front
    if (quiz.config.startQuestion !== undefined) {
      const startQuestionIndex = shuffled.findIndex(q => q.id === quiz.config.startQuestion);
      if (startQuestionIndex > 0) {
        const startQuestion = shuffled[startQuestionIndex];
        shuffled = [startQuestion, ...shuffled.slice(0, startQuestionIndex), ...shuffled.slice(startQuestionIndex + 1)];
      }
    }
    
    setRandomizedQuestions(shuffled);
  };

  const handleAnswer = (correct: boolean | number) => {
    console.log('[App] handleAnswer called, correct:', correct, 'current totalAnswers:', totalAnswers);
    // Handle fill-in-the-blank (number = count of correct blanks)
    if (typeof correct === 'number') {
      setCorrectAnswers(prev => prev + correct);
      // For fill-in-the-blank, count each blank as a separate answer
      const currentQuestion = getCurrentQuestion();
      if (currentQuestion && isFillInTheBlank(currentQuestion.question, selectedQuiz?.config.fillInTheBlank || false, currentQuestion.fillInTheBlank)) {
        const blankCount = currentQuestion.question.split('(blank)').length - 1;
        setTotalAnswers(prev => prev + blankCount);
      }
    } else {
      // Handle regular boolean answer
      if (correct) setCorrectAnswers(prev => prev + 1);
      setTotalAnswers(prev => prev + 1);
    }
    pauseTimer();
  };

  const handleNext = () => {
    resumeTimer();
    if (currentQuestionIndex < randomizedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Always show the quiz complete screen
      setGameState('entering-name');
    }
  };

  const handleRestart = () => {
    setGameState('selection');
    setSelectedQuiz(null);
  };

  const handleRestartQuiz = () => {
    if (!selectedQuiz) return;
    
    // Reset to playing state
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setCurrentTime(0);
    setStartTime(Date.now());
    setIsPaused(false);
    setLastPauseTime(null);
    setAccumulatedTime(0);
    
    // Increment session key to force component remount
    setQuizSessionKey(prev => prev + 1);
    
    // Check if this is a composite quiz (pools questions from other quizzes)
    let questionsToUse: QuestionData[] = selectedQuiz.questions;
    
    if (selectedQuiz.config.sourceQuizIds && selectedQuiz.config.sourceQuizIds.length > 0) {
      // This is a composite quiz - pool questions from source quizzes
      const sourceQuizzes = selectedQuiz.config.sourceQuizIds
        .map(id => QUIZ_COLLECTION.find(q => q.config.id === id))
        .filter((q): q is typeof QUIZ_COLLECTION[0] => q !== undefined);
      
      if (sourceQuizzes.length > 0) {
        if (selectedQuiz.config.questionCount !== undefined && selectedQuiz.config.questionCount > 0) {
          // Even distribution mode: take equal amounts from each source quiz
          const questionsPerQuiz = Math.ceil(selectedQuiz.config.questionCount / sourceQuizzes.length);
          const pooledQuestions: QuestionData[] = [];
          
          sourceQuizzes.forEach(sourceQuiz => {
            const shuffledSource = shuffleArray([...sourceQuiz.questions]);
            const questionsWithFactHeading = shuffledSource.slice(0, questionsPerQuiz).map(q => ({
              ...q,
              factHeading: sourceQuiz.config.factHeading
            }));
            pooledQuestions.push(...questionsWithFactHeading);
          });
          
          // Shuffle the pooled questions and trim to exact count
          questionsToUse = shuffleArray(pooledQuestions).slice(0, selectedQuiz.config.questionCount);
        } else {
          // No question count specified - use all questions from all source quizzes
          const allQuestions: QuestionData[] = [];
          sourceQuizzes.forEach(sourceQuiz => {
            const questionsWithFactHeading = sourceQuiz.questions.map(q => ({
              ...q,
              factHeading: sourceQuiz.config.factHeading
            }));
            allQuestions.push(...questionsWithFactHeading);
          });
          questionsToUse = allQuestions;
        }
      }
    }
    
    // Re-randomize questions to create a fresh quiz
    let shuffled = shuffleArray(questionsToUse);
    
    // If startQuestion is specified, move that question to the front
    if (selectedQuiz.config.startQuestion !== undefined) {
      const startQuestionIndex = shuffled.findIndex(q => q.id === selectedQuiz.config.startQuestion);
      if (startQuestionIndex > 0) {
        const startQuestion = shuffled[startQuestionIndex];
        shuffled = [startQuestion, ...shuffled.slice(0, startQuestionIndex), ...shuffled.slice(startQuestionIndex + 1)];
      }
    }
    
    setRandomizedQuestions(shuffled);
  };

  const handleUserNameSubmit = (userName: string) => {
    if (!selectedQuiz) return;
    
    try {
      updateStats(userName);
      setGameState('selection');
      setSelectedQuiz(null);
    } catch (error) {
      console.error('Error in handleUserNameSubmit:', error);
    }
  };

  const getCurrentQuestion = () => {
    return randomizedQuestions[currentQuestionIndex];
  };

  // Generate new shuffled options for each question
  const getOptionsForCurrentQuestion = () => {
    if (!randomizedQuestions.length) return [];
    
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return [];
    
    // Check if this question has a custom answer pool
    if (hasAnswerPool(currentQuestion.answerPool)) {
      const correctAnswers = getCorrectAnswers(currentQuestion.correctAnswer);
      return getAnswerPoolOptions(currentQuestion.answerPool!, correctAnswers);
    }
    
    // Otherwise use the pooled random options (default 4 choices)
    // Get all correct answers for this question
    const correctAnswers = getCorrectAnswers(currentQuestion.correctAnswer);
    return getRandomOptions(allPossibleAnswers, correctAnswers, 4);
  };

  const [options, setOptions] = useState<string[]>([]);

  // Update options whenever the question changes
  useEffect(() => {
    setOptions(getOptionsForCurrentQuestion());
  }, [currentQuestionIndex, randomizedQuestions, allPossibleAnswers]);

  const handleResetScores = (quizKey: string) => {
    try {
      const statsKey = `quiz_stats_${quizKey}`;
      localStorage.setItem(statsKey, JSON.stringify(INITIAL_QUIZ_STATS));
      // Force a re-render to update the display
      setGameState(prev => prev);
    } catch (error) {
      console.error('Error resetting scores:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {gameState !== 'selection' && selectedQuiz && (
        <QuizHeader quizConfig={selectedQuiz.config} />
      )}
      <div className="flex-1 py-8">
        <div className="container mx-auto flex flex-col items-center gap-8">
          {gameState === 'selection' ? (
            <StartScreen 
              onSelectQuiz={handleSelectQuiz}
              getStatsForQuiz={getStatsForQuiz}
              onResetScores={handleResetScores}
            />
          ) : selectedQuiz && (
            <>
              {gameState === 'playing' ? (
                <div className="flex flex-col items-center gap-6">
                  <ScoreDisplay 
                    correct={correctAnswers} 
                    total={totalAnswers} 
                    highScore={getStatsForQuiz(selectedQuiz.config.quizKey).highScore}
                    onRestart={handleRestart}
                    onRestartQuiz={handleRestartQuiz}
                    isFinished={false}
                    currentTime={currentTime}
                    bestRun={getStatsForQuiz(selectedQuiz.config.quizKey).bestRun}
                    quizConfig={selectedQuiz.config}
                  />
                  {isFillInTheBlank(getCurrentQuestion().question, selectedQuiz.config.fillInTheBlank || false, getCurrentQuestion().fillInTheBlank) ? (
                    <FillInTheBlankCard
                      key={`session-${quizSessionKey}-q-${currentQuestionIndex}`}
                      question={getCurrentQuestion()}
                      onAnswer={handleAnswer}
                      onNext={handleNext}
                      questionNumber={currentQuestionIndex + 1}
                      totalQuestions={randomizedQuestions.length}
                      quizConfig={selectedQuiz.config}
                    />
                  ) : (
                    <FlashCard
                      key={`session-${quizSessionKey}-q-${currentQuestionIndex}`}
                      question={getCurrentQuestion()}
                      options={options}
                      onAnswer={handleAnswer}
                      onNext={handleNext}
                      questionNumber={currentQuestionIndex + 1}
                      totalQuestions={randomizedQuestions.length}
                      quizConfig={selectedQuiz.config}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <ScoreDisplay 
                    correct={correctAnswers} 
                    total={totalAnswers} 
                    highScore={getStatsForQuiz(selectedQuiz.config.quizKey).highScore}
                    onRestart={handleRestart}
                    onRestartQuiz={handleRestartQuiz}
                    isFinished={true}
                    currentTime={currentTime}
                    bestRun={getStatsForQuiz(selectedQuiz.config.quizKey).bestRun}
                    quizConfig={selectedQuiz.config}
                  />
                  {!selectedQuiz.config.disableLeaderboards && (
                    <UserNameInput 
                      onSubmit={handleUserNameSubmit}
                      currentScore={correctAnswers}
                      currentTime={currentTime}
                      highScores={getStatsForQuiz(selectedQuiz.config.quizKey).highScores}
                      quizConfig={selectedQuiz.config}
                      totalQuestions={randomizedQuestions.length}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
