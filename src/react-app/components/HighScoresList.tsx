import { Trash2, Medal as MedalIcon, Info } from 'lucide-react';
import { useState } from 'react';
import { Medal } from '@/react-app/components/Medal';
import { HighScoreEntry, QuizConfig } from '@/react-app/types';
import { getThemeColor } from '@/react-app/lib/themeColors';

interface HighScoresListProps {
  scores: HighScoreEntry[];
  onReset: () => void;
  title?: string;
  headerBackground?: boolean;
  quizConfig: QuizConfig;
}

export function HighScoresList({ 
  scores, 
  onReset, 
  title = "Local Top Scores",
  headerBackground = true,
  quizConfig
}: HighScoresListProps) {
  const accentColor = quizConfig.themeColor;
  const colors = getThemeColor(accentColor);
  const [showTooltip, setShowTooltip] = useState(false);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const getPositionDisplay = (index: number) => {
    switch (index) {
      case 0:
        return <Medal position={1} color="gold" />;
      case 1:
        return <Medal position={2} color="silver" />;
      case 2:
        return <Medal position={3} color="bronze" />;
      default:
        return <span className="w-7 h-7 flex items-center justify-center">{index + 1}</span>;
    }
  };

  return (
    <div className="w-full" style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <MedalIcon size={20} style={{ color: colors.primary }} />
          {title}
          <div className="relative" id="tooltip-anchor">
            <button
              onClick={() => setShowTooltip(prev => !prev)}
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              style={{
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'auto'
              }}
              aria-label="Information about local leaderboard"
            >
              <Info size={18} />
            </button>
            {showTooltip && (
              <div className="fixed w-72 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-3" style={{ 
                zIndex: 9999,
                marginTop: '0.5rem',
                transform: 'translateX(0)'
              }}>
                <p className="mb-2">
                  <strong>How it works:</strong> Your scores are saved locally in your browser. The top 5 scores are displayed here.
                </p>
                <p className="text-gray-300">
                  Note: Submitting your name to the leaderboard is optional. You can skip it and still play!
                </p>
              </div>
            )}
          </div>
        </h4>
        <button
          onClick={onReset}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-gray-200 active:bg-gray-300"
          style={{ 
            color: colors.primary,
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'auto'
          }}
          title="Reset Top Scores"
        >
          <Trash2 size={16} />
          Reset
        </button>
      </div>
      {scores.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[300px]">
            <thead>
              <tr style={headerBackground ? { backgroundColor: colors.light } : {}}>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap"></th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Score</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Time</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={`${score.userName}-${index}`} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-sm text-gray-600 whitespace-nowrap">
                    {getPositionDisplay(index)}
                  </td>
                  <td className="px-3 py-2 text-sm font-medium text-gray-800">{score.userName}</td>
                  <td className="px-3 py-2 text-sm text-gray-600 whitespace-nowrap">
                    {score.score} ({score.accuracy}%)
                  </td>
                  <td className="px-3 py-2 text-sm font-mono text-gray-600 whitespace-nowrap">
                    {formatTime(score.time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">No scores recorded yet</p>
      )}
    </div>
  );
}
