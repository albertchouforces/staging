import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerDisplayProps {
  getCurrentTime: () => number;
  isRunning: boolean;
  isPaused: boolean;
}

export default function TimerDisplay({ getCurrentTime, isRunning, isPaused }: TimerDisplayProps) {
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setDisplayTime(getCurrentTime());
      }, 10); // Update every 10ms for smooth display
    } else {
      setDisplayTime(getCurrentTime());
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, getCurrentTime]);

  const formatTime = (timeMs: number): string => {
    const seconds = timeMs / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
      <Clock className={`w-4 h-4 ${isPaused ? 'text-yellow-500' : 'text-blue-600'}`} />
      <span className="font-mono text-lg font-semibold text-gray-900">
        {formatTime(displayTime)}
      </span>
      {isPaused && (
        <span className="text-xs text-yellow-600 font-medium">PAUSED</span>
      )}
    </div>
  );
}
