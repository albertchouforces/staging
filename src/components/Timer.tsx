import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  onTimerUpdate: (elapsedTime: number) => void;
}

export function Timer({ isRunning, onTimerUpdate }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Update timer
  const updateTimer = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    setElapsedTime(prevTime => {
      const newTime = prevTime + elapsed;
      onTimerUpdate(newTime);
      return newTime;
    });
    
    startTimeRef.current = timestamp;
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  // Start/stop timer based on isRunning
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = null;
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  // Format time display
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Divide by 10 to get 2 digits
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center text-navy-700 font-mono">
      <Clock className="mr-1 h-4 w-4" />
      <span className="tabular-nums">{formatTime(elapsedTime)}</span>
    </div>
  );
}
