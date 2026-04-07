import { Clock } from 'lucide-react';
import { getThemeColor } from '@/react-app/lib/themeColors';

interface TimerProps {
  time: number;
  accentColor: string;
}

export function Timer({ time, accentColor }: TimerProps) {
  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  
  const colors = getThemeColor(accentColor);

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
      <Clock size={16} style={{ color: colors.primary }} />
      <span className="text-gray-600">Time: </span>
      <span className="font-mono" style={{ color: colors.primary }}>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}.
        {milliseconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
