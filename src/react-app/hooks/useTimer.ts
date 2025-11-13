import { useState, useRef, useCallback } from 'react';

export function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateTimer = useCallback(() => {
    if (startTimeRef.current !== null) {
      const now = performance.now();
      const currentElapsed = now - startTimeRef.current + accumulatedTimeRef.current;
      setElapsedTime(currentElapsed);
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, []);

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = performance.now();
      setIsRunning(true);
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [isRunning, updateTimer]);

  const pause = useCallback(() => {
    if (isRunning && startTimeRef.current !== null) {
      const now = performance.now();
      accumulatedTimeRef.current += now - startTimeRef.current;
      startTimeRef.current = null;
      setIsRunning(false);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    setElapsedTime(0);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = null;
    setIsRunning(false);
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    elapsedTime,
    isRunning,
    start,
    pause,
    reset,
  };
}
