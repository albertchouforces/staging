import { Clock } from 'lucide-react';

interface TimerProps {
  time: number;
  accentColor: string;
}

export function Timer({ time, accentColor }: TimerProps) {
  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

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
    <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
      <Clock size={16} className="text-gray-600" />
      <span className="text-gray-600">Time: </span>
      <span className="font-mono" style={{ color: colorValue }}>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}.
        {milliseconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
