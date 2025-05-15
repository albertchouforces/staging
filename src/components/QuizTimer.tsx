import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  startTime: number;
  elapsedTime: number;
  isPaused: boolean;
  onTimeUpdate: (elapsedSeconds: number) => void;
}

export function QuizTimer({ 
  startTime, 
  elapsedTime, 
  isPaused, 
  onTimeUpdate 
}: QuizTimerProps) {
  const [displayTime, setDisplayTime] = useState('00:00.000');
  
  // Update timer display
  useEffect(() => {
    // Only run the timer if it's not paused
    if (isPaused) return;
    
    // Set up timer interval (50ms for smoother millisecond updates)
    const intervalId = setInterval(() => {
      const now = Date.now();
      const totalElapsedTime = elapsedTime + (now - startTime) / 1000;
      
      // Format time to MM:SS.ms
      const mins = Math.floor(totalElapsedTime / 60);
      const secs = Math.floor(totalElapsedTime % 60);
      const ms = Math.floor((totalElapsedTime % 1) * 1000);
      
      const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
      
      setDisplayTime(formattedTime);
      onTimeUpdate(totalElapsedTime);
    }, 50); // Update every 50ms for smoother display
    
    // Clean up interval
    return () => clearInterval(intervalId);
  }, [startTime, elapsedTime, isPaused, onTimeUpdate]);
  
  return (
    <div className="flex items-center gap-2 p-2 bg-navy-50 rounded-lg text-navy-700">
      <Clock className="w-4 h-4" />
      <span className="font-mono text-sm">{displayTime}</span>
    </div>
  );
}
