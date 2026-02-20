import { BookOpen } from 'lucide-react';
import { QuizConfig } from '@/react-app/types';

interface QuizHeaderProps {
  quizConfig: QuizConfig;
}

export function QuizHeader({ quizConfig }: QuizHeaderProps) {
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
  
  return (
    <div className="w-full bg-white shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <BookOpen style={{ color: colorValue }} size={24} />
          <h1 className="text-2xl font-bold" style={{ color: colorValue }}>
            {quizConfig.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
