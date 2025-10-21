import { useState, useRef, useCallback } from 'react';
import { TimerState } from '@/shared/types';

export function useTimer() {
  const [timer, setTimer] = useState<TimerState>({
    startTime: 0,
    totalTimeMs: 0,
    isRunning: false,
    isPaused: false,
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseStartRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    const now = Date.now();
    setTimer({
      startTime: now,
      totalTimeMs: 0,
      isRunning: true,
      isPaused: false,
    });
  }, []);

  const pauseTimer = useCallback(() => {
    if (timer.isRunning && !timer.isPaused) {
      pauseStartRef.current = Date.now();
      setTimer(prev => ({
        ...prev,
        isPaused: true,
      }));
    }
  }, [timer.isRunning, timer.isPaused]);

  const resumeTimer = useCallback(() => {
    if (timer.isRunning && timer.isPaused) {
      // Calculate time spent paused and adjust start time
      const pauseDuration = Date.now() - pauseStartRef.current;
      setTimer(prev => ({
        ...prev,
        startTime: prev.startTime + pauseDuration,
        isPaused: false,
      }));
    }
  }, [timer.isRunning, timer.isPaused]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const finalTime = timer.isPaused 
      ? pauseStartRef.current - timer.startTime
      : Date.now() - timer.startTime;
    
    setTimer(prev => ({
      ...prev,
      totalTimeMs: finalTime,
      isRunning: false,
      isPaused: false,
    }));
    
    return finalTime;
  }, [timer.isPaused, timer.startTime]);

  const getCurrentTime = useCallback(() => {
    if (!timer.isRunning) return timer.totalTimeMs;
    if (timer.isPaused) return pauseStartRef.current - timer.startTime;
    return Date.now() - timer.startTime;
  }, [timer.isRunning, timer.isPaused, timer.startTime, timer.totalTimeMs]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimer({
      startTime: 0,
      totalTimeMs: 0,
      isRunning: false,
      isPaused: false,
    });
  }, []);

  return {
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
    getCurrentTime,
  };
}
