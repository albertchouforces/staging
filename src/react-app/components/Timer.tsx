import { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate: (timeMs: number) => void;
  className?: string;
}

export default function Timer({ isRunning, onTimeUpdate, className = '' }: TimerProps) {
  const [timeMs, setTimeMs] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      // Start or resume timer
      startTimeRef.current = Date.now();
      
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const currentElapsed = Date.now() - startTimeRef.current;
          const totalTime = accumulatedTimeRef.current + currentElapsed;
          setTimeMs(totalTime);
          onTimeUpdate(totalTime);
        }
      }, 10); // Update every 10ms for precision
    } else {
      // Pause timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      if (startTimeRef.current) {
        accumulatedTimeRef.current += Date.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUpdate]);

  // Reset timer when component unmounts or quiz ends
  useEffect(() => {
    return () => {
      accumulatedTimeRef.current = 0;
      setTimeMs(0);
    };
  }, []);

  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="w-5 h-5 text-blue-900" />
      <span className="font-mono font-bold text-blue-900 text-lg">
        {formatTime(timeMs)}
      </span>
    </div>
  );
}
