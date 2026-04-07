import { RotateCcw, Trophy, Clock, Shuffle } from 'lucide-react';
import { Timer } from '@/react-app/components/Timer';
import { BestRun, QuizConfig } from '@/react-app/types';
import { getThemeColor } from '@/react-app/lib/themeColors';

interface ScoreDisplayProps {
  correct: number;
  total: number;
  highScore: number;
  onRestart: () => void;
  onStartNew: () => void;
  isFinished: boolean;
  totalQuestions: number;
  currentTime: number;
  bestRun: BestRun | null;
  quizConfig: QuizConfig;
}

export function ScoreDisplay({ 
  correct, 
  total, 
  highScore, 
  onRestart,
  onStartNew,
  isFinished,
  totalQuestions,
  currentTime,
  bestRun,
  quizConfig
}: ScoreDisplayProps) {
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  const accentColor = quizConfig.themeColor;
  const colors = getThemeColor(accentColor);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 text-lg font-semibold flex-wrap justify-center">
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Score: </span>
          <span style={{ color: colors.primary }}>{correct}/{total}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Accuracy: </span>
          <span style={{ color: colors.primary }}>{percentage}%</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
          <Trophy size={16} style={{ color: colors.primary }} />
          <span className="text-gray-600">Best: </span>
          <span style={{ color: colors.primary }}>
            {highScore}
            {bestRun && ` (${bestRun.accuracy}%)`}
          </span>
        </div>
        <Timer time={currentTime} accentColor={accentColor} />
        {bestRun && (
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <Clock size={16} style={{ color: colors.primary }} />
            <span className="text-gray-600">Best: </span>
            <span className="font-mono" style={{ color: colors.primary }}>
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
            <Trophy size={32} style={{ color: colors.primary }} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
          <p className="text-gray-600 mb-4">
            You correctly identified {correct} out of {totalQuestions} questions.
          </p>
          {correct > highScore && (
            <p className="font-semibold mb-4" style={{ color: colors.primary }}>New High Score!</p>
          )}
          {bestRun && (
            correct >= bestRun.score && currentTime < bestRun.time ? (
              <p className="font-semibold mb-4" style={{ color: colors.primary }}>New Best Time!</p>
            ) : null
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
          style={{ color: colors.primary }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.hover}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
        >
          <RotateCcw size={16} />
          Restart Quiz
        </button>
        <button
          onClick={onStartNew}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
          style={{ color: colors.primary }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.hover}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
        >
          <Shuffle size={16} />
          Start New Quiz
        </button>
      </div>
    </div>
  );
}
