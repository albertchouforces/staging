import { Trash2, Medal as MedalIcon } from 'lucide-react';
import { Medal } from '@/react-app/components/Medal';
import { HighScoreEntry, QuizConfig } from '@/react-app/types';
import { ENABLE_TIME_TRACKING } from '@/react-app/config/features';

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

  // Lighten a hex color for backgrounds
  const lightenHexColor = (hex: string, amount: number = 220) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    
    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  const colorValue = getColorValue(accentColor);
  const colorLight = lightenHexColor(colorValue);

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
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <MedalIcon size={20} style={{ color: colorValue }} />
          {title}
        </h4>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          style={{ color: colorValue }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colorLight}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Reset Local Top Scores"
        >
          <Trash2 size={16} />
          Reset
        </button>
      </div>
      {scores.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[300px]">
            <thead>
              <tr style={headerBackground ? { backgroundColor: colorLight } : undefined}>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap"></th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Score</th>
                {ENABLE_TIME_TRACKING && (
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Time</th>
                )}
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
                  {ENABLE_TIME_TRACKING && (
                    <td className="px-3 py-2 text-sm font-mono text-gray-600 whitespace-nowrap">
                      {formatTime(score.time)}
                    </td>
                  )}
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
