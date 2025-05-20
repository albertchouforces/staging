import { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';

interface QuizTimerProps {
  isRunning: boolean;
  onTimerUpdate: (elapsedTime: number) => void;
}

export default function QuizTimer({ isRunning, onTimerUpdate }: QuizTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastPauseTimeRef = useRef<number>(0);
  
  // Update the timer state
  const updateTimer = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    // Calculate elapsed time accounting for pauses
    const currentElapsed = timestamp - startTimeRef.current - lastPauseTimeRef.current;
    setElapsedTime(currentElapsed);
    onTimerUpdate(currentElapsed);
    
    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  };
  
  // Format time in mm:ss.ms format
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10); // Show only tens of ms for better readability
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };
  
  // Start/stop timer based on isRunning prop
  useEffect(() => {
    let pauseStartTime: number;
    
    if (isRunning) {
      // Resume timer
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else if (animationFrameRef.current !== null) {
      // Pause timer
      pauseStartTime = performance.now();
      cancelAnimationFrame(animationFrameRef.current);
      
      // Store the pause time to account for it in later calculations
      if (startTimeRef.current) {
        const pauseDuration = pauseStartTime - (startTimeRef.current + lastPauseTimeRef.current + elapsedTime);
        lastPauseTimeRef.current += pauseDuration;
      }
    }
    
    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);
  
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg text-sm">
      <Timer size={16} className="text-blue-900" />
      <span className="font-mono font-medium">{formatTime(elapsedTime)}</span>
    </div>
  );
}
