import { RotateCcw, Trophy, Clock, Shuffle } from 'lucide-react';
import { Timer } from '@/react-app/components/Timer';
import { BestRun, QuizConfig } from '@/react-app/types';
import { ENABLE_TIME_TRACKING } from '@/react-app/config/features';

interface ScoreDisplayProps {
  correct: number;
  total: number;
  highScore: number;
  onRestart: () => void;
  onRestartQuiz?: () => void;
  isFinished: boolean;
  currentTime: number;
  bestRun: BestRun | null;
  quizConfig: QuizConfig;
}

export function ScoreDisplay({ 
  correct, 
  total, 
  highScore, 
  onRestart,
  onRestartQuiz,
  isFinished,
  currentTime,
  bestRun,
  quizConfig
}: ScoreDisplayProps) {
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  const accentColor = quizConfig.themeColor;
  
  // Convert named colors to hex values, pass through hex colors
  const getColorValue = (color: string) => {
    if (color.startsWith('#')) {
      return color;
    }
    
    const colorMap: Record<string, string> = {
      blue: '#2563eb',
      green: '#16a34a',
      red: '#dc2626',
      purple: '#9333ea',
      orange: '#ea580c',
      pink: '#ec4899',
      sky: '#0ea5e9',
      cyan: '#06b6d4',
      teal: '#14b8a6',
      indigo: '#6366f1',
      violet: '#8b5cf6',
      rose: '#f43f5e',
      amber: '#f59e0b',
      fuchsia: '#d946ef',
      lime: '#84cc16',
      emerald: '#10b981',
      yellow: '#eab308'
    };
    
    return colorMap[color] || '#2563eb';
  };
  
  const colorValue = getColorValue(accentColor);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 text-lg font-semibold flex-wrap justify-center">
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Score: </span>
          <span style={{ color: colorValue }}>{correct}/{total}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Accuracy: </span>
          <span style={{ color: colorValue }}>{percentage}%</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
          <Trophy size={16} style={{ color: colorValue }} />
          <span className="text-gray-600">Best: </span>
          <span style={{ color: colorValue }}>
            {highScore}
            {bestRun && ` (${bestRun.accuracy}%)`}
          </span>
        </div>
        {ENABLE_TIME_TRACKING && <Timer time={currentTime} accentColor={accentColor} />}
        {ENABLE_TIME_TRACKING && bestRun && (
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <Clock size={16} style={{ color: colorValue }} />
            <span className="text-gray-600">Best: </span>
            <span className="font-mono" style={{ color: colorValue }}>
              {Math.floor(bestRun.time / 60000).toString().padStart(2, '0')}:
              {Math.floor((bestRun.time % 60000) / 1000).toString().padStart(2, '0')}.
              {Math.floor((bestRun.time % 1000) / 10).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {isFinished && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center mt-4">
          <div className="flex items-center justify-center mb-4">
            <Trophy size={32} style={{ color: colorValue.replace('eb', 'e0') }} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
          <p className="text-gray-600 mb-4">
            You correctly identified {correct} out of {total} questions.
          </p>
          {correct > highScore && (
            <p className="font-semibold mb-4" style={{ color: colorValue }}>New High Score!</p>
          )}
          {ENABLE_TIME_TRACKING && bestRun && (
            correct >= bestRun.score && currentTime < bestRun.time ? (
              <p className="font-semibold mb-4" style={{ color: colorValue }}>New Best Time!</p>
            ) : null
          )}
        </div>
      )}

      <div className="flex gap-3">
        {onRestartQuiz && (
          <button
            onClick={onRestartQuiz}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
            style={{ color: colorValue }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <RotateCcw size={16} />
            Restart Quiz
          </button>
        )}
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
          style={{ color: colorValue }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <Shuffle size={16} />
          Start New Quiz
        </button>
      </div>
    </div>
  );
}
