import { BookOpen } from 'lucide-react';
import { QuizConfig } from '@/react-app/types';

interface QuizHeaderProps {
  quizConfig: QuizConfig;
  onGoHome: () => void;
}

export function QuizHeader({ quizConfig, onGoHome }: QuizHeaderProps) {
  const accentColor = quizConfig.themeColor;
  
  // Convert named colors to appropriate values, pass through hex colors
  const getColorValue = (color: string) => {
    // If it's a hex color, use it directly
    if (color.startsWith('#')) {
      return color;
    }
    
    // Map named colors to their Tailwind values
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
    
    return colorMap[color] || '#2563eb'; // Default to blue if not found
  };
  
  const colorValue = getColorValue(accentColor);
  const iconBackground = `${colorValue}1A`;
  
  return (
    <div className="max-w-6xl w-full mx-auto px-4 pt-8">
      <div className="mb-8 border-b border-[#1a365d]/20 pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-xl border"
              style={{ borderColor: colorValue, backgroundColor: iconBackground }}
            >
              <BookOpen style={{ color: colorValue }} size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-left text-[#1a365d]">
                {quizConfig.title}
              </h1>
              <p className="text-sm text-gray-600">
                {quizConfig.description || 'Quiz in progress'}
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={onGoHome}
              className="px-4 py-2 rounded-lg font-semibold transition-colors bg-[#1a365d] text-white hover:bg-[#244a7d]"
            >
              Home
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
