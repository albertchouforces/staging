import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { audioManager } from '@/react-app/lib/audioManager';

interface AudioPlayerProps {
  audioFiles: string[];
  loopCount?: number;
  label?: string;
  colorScheme?: 'blue' | 'orange';
}

export function AudioPlayer({ 
  audioFiles, 
  loopCount = 1, 
  label = 'Play audio',
  colorScheme = 'blue'
}: AudioPlayerProps) {
  // Normalize loop count with defensive bounds (1-10)
  const normalizedLoopCount = Math.min(Math.max(loopCount || 1, 1), 10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const playerIdRef = useRef<string>(Math.random().toString(36).substring(7));
  const isResettingRef = useRef(false);
  const lastLoadedSrcRef = useRef<string>('');

  const colors = {
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      errorBg: 'bg-orange-500',
      errorHover: 'hover:bg-orange-600'
    },
    orange: {
      bg: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      text: 'text-orange-600',
      errorBg: 'bg-red-500',
      errorHover: 'hover:bg-red-600'
    }
  };

  const colorClass = colors[colorScheme];

  const loadAndPlayAudio = useCallback(() => {
    if (!audioRef.current || audioFiles.length === 0 || !isPlayingRef.current) return;
    
    const targetSrc = audioFiles[currentFileIndex];
    
    console.log('[AudioPlayer] loadAndPlayAudio called for:', targetSrc);
    
    if (!targetSrc || targetSrc.trim() === '') {
      console.error('Invalid audio URL: empty or undefined');
      setAudioError(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
      audioManager.stop(playerIdRef.current);
      return;
    }
    
    const audio = audioRef.current;
    
    // Prevent duplicate plays - check if already playing the same source
    if (lastLoadedSrcRef.current === targetSrc && !audio.paused && !audio.ended) {
      console.log('[AudioPlayer] Already playing this source, skipping');
      return;
    }
    
    // Need to load a new file or reset current one
    const needsLoad = lastLoadedSrcRef.current !== targetSrc || audio.ended || audio.currentTime > 0;
    
    console.log('[AudioPlayer] needsLoad:', needsLoad, 'lastLoaded:', lastLoadedSrcRef.current, 'target:', targetSrc, 'readyState:', audio.readyState);
    
    if (needsLoad) {
      // Mark that we're in a reset/load operation
      isResettingRef.current = true;
      
      console.log('[AudioPlayer] Setting src and calling load()');
      audio.src = targetSrc;
      lastLoadedSrcRef.current = targetSrc;
      audio.load();
      
      // After load completes, play the audio
      // Use loadeddata event for reliability across all file types
      const handleLoaded = () => {
        console.log('[AudioPlayer] loadeddata event fired, attempting play');
        if (!isPlayingRef.current || !audioRef.current) {
          console.log('[AudioPlayer] Skipping play - not in playing state');
          return;
        }
        
        // Clear reset flag after a brief delay to ensure any spurious events are ignored
        // This prevents Safari from firing ended/pause events immediately after load
        setTimeout(() => {
          isResettingRef.current = false;
        }, 150);
        
        // Play the audio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('[AudioPlayer] Play promise resolved successfully');
              if (isPlayingRef.current) {
                setIsPlaying(true);
                setAudioError(false);
              }
            })
            .catch((error) => {
              console.warn('[AudioPlayer] Play promise rejected:', error.name, error.message);
              // On error, mark as error and stop
              if (isPlayingRef.current) {
                setAudioError(true);
                setIsPlaying(false);
                isPlayingRef.current = false;
                audioManager.stop(playerIdRef.current);
              }
            });
        }
      };
      
      // Listen for when the audio is loaded and ready
      audio.addEventListener('loadeddata', handleLoaded, { once: true });
      
      // Also try canplaythrough as a backup
      audio.addEventListener('canplaythrough', () => {
        console.log('[AudioPlayer] canplaythrough event fired');
      }, { once: true });
      
      return;
    }
    
    // Already loaded, just play
    console.log('[AudioPlayer] Audio already loaded, playing directly');
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('[AudioPlayer] Direct play succeeded');
          if (isPlayingRef.current) {
            setIsPlaying(true);
            setAudioError(false);
          }
        })
        .catch((error) => {
          console.warn('[AudioPlayer] Direct play failed:', error.name, error.message);
          if (isPlayingRef.current) {
            setAudioError(true);
            setIsPlaying(false);
            isPlayingRef.current = false;
            audioManager.stop(playerIdRef.current);
          }
        });
    }
  }, [audioFiles, currentFileIndex]);

  const toggleAudioPlayback = useCallback(() => {
    if (audioFiles.length === 0) return;
    
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setAudioError(false);
      setCurrentLoop(0);
      setCurrentFileIndex(0);
      isPlayingRef.current = false;
      audioManager.stop(playerIdRef.current);
    } else {
      // Notify the audio manager that this player is starting
      audioManager.play(playerIdRef.current);
      setAudioError(false);
      setCurrentLoop(0);
      setCurrentFileIndex(0);
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  }, [isPlaying, audioFiles.length]);

  useEffect(() => {
    if (isPlaying && audioFiles.length > 0) {
      loadAndPlayAudio();
    }
  }, [isPlaying, currentFileIndex, audioFiles, loadAndPlayAudio]);

  const handleAudioEnded = useCallback(() => {
    console.log('[AudioPlayer] ended event fired, isPlaying:', isPlayingRef.current, 'isResetting:', isResettingRef.current);
    
    // Guard: only proceed if we think we're playing
    if (!isPlayingRef.current) {
      return;
    }
    
    // Safari/iOS fix: Ignore ended events that fire during audio reset/load operations
    // These are spurious events from calling load() and should not advance playback
    if (isResettingRef.current) {
      console.log('[AudioPlayer] Ignoring ended event during reset');
      return;
    }
    
    // Safari fix: Verify the audio actually reached the end naturally
    // Ignore premature ended events (Safari sometimes fires these at position 0)
    if (audioRef.current) {
      const audio = audioRef.current;
      console.log('[AudioPlayer] Audio position:', audio.currentTime, 'of', audio.duration);
      // If duration is known and currentTime is suspiciously far from the end, ignore this event
      if (audio.duration > 0 && audio.currentTime < audio.duration * 0.95) {
        console.log('[AudioPlayer] Ignoring premature ended event');
        return;
      }
    }
    
    // Ensure UI shows playing state during transitions (Safari fix)
    setIsPlaying(true);
    
    if (currentFileIndex < audioFiles.length - 1) {
      // Move to next file in sequence
      setCurrentFileIndex(prev => prev + 1);
    } else {
      // Completed all files in current loop
      const nextLoop = currentLoop + 1;
      
      if (nextLoop < normalizedLoopCount) {
        // Start next loop
        setCurrentLoop(nextLoop);
        setCurrentFileIndex(0);
      } else {
        // All loops complete - stop playback
        setIsPlaying(false);
        setCurrentLoop(0);
        setCurrentFileIndex(0);
        isPlayingRef.current = false;
        audioManager.stop(playerIdRef.current);
      }
    }
  }, [currentLoop, currentFileIndex, audioFiles.length, normalizedLoopCount]);

  const handleAudioError = useCallback(() => {
    if (!isPlayingRef.current) return;
    
    const audio = audioRef.current;
    if (audio?.error) {
      console.warn('Audio error:', audio.error.code, audio.error.message);
      
      // Ignore abort errors during load operations
      if (audio.error.code === 1) {
        return;
      }
      
      // Real error - show error state
      setAudioError(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
      audioManager.stop(playerIdRef.current);
    }
  }, []);

  // Handle when audio actually starts playing
  const handlePlaying = useCallback(() => {
    if (isPlayingRef.current) {
      setIsPlaying(true);
      setAudioError(false);
    }
  }, []);

  // Handle when audio pauses
  const handlePause = useCallback(() => {
    console.log('[AudioPlayer] pause event fired, isPlaying:', isPlayingRef.current, 'isResetting:', isResettingRef.current);
    
    // Safari/iOS fires pause events unpredictably (sometimes before ended, sometimes during transitions)
    // Only update state for explicit user-initiated pauses, never for system events
    // We'll rely on onEnded for natural playback completion
    if (!audioRef.current || !isPlayingRef.current) return;
    
    const audio = audioRef.current;
    
    // Ignore pause events during reset/load operations
    if (isResettingRef.current) {
      console.log('[AudioPlayer] Ignoring pause during reset');
      return;
    }
    
    // Ignore pause events that occur:
    // 1. At the end of playback (ended will handle this)
    // 2. During file transitions (currentTime = 0 with data loaded)
    // 3. During buffering/loading states
    // 4. Very close to the end (within last 5% - let ended event handle it)
    if (audio.ended || 
        audio.currentTime === 0 || 
        audio.readyState < 2 ||
        (audio.duration > 0 && audio.currentTime >= audio.duration * 0.95)) {
      console.log('[AudioPlayer] Ignoring pause - system event');
      return;
    }
    
    // Safari fix: Verify this is a real pause, not a system event
    // This prevents Safari's spurious pause events from breaking playback
    setTimeout(() => {
      if (audioRef.current && 
          audioRef.current.paused && 
          !audioRef.current.ended && 
          isPlayingRef.current &&
          !isResettingRef.current) {
        console.log('[AudioPlayer] Real pause detected, stopping playback');
        // CRITICAL: Keep isPlayingRef in sync with isPlaying state
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    }, 75);
  }, []);

  // Handle waiting (buffering) state
  const handleWaiting = useCallback(() => {
    // Keep playing state true while buffering
    if (isPlayingRef.current) {
      setIsPlaying(true);
    }
  }, []);

  // Create a stable string representation of audioFiles for comparison
  const audioFilesKey = useMemo(() => audioFiles.join('|'), [audioFiles]);

  // Listen for other audio players starting
  useEffect(() => {
    const unsubscribe = audioManager.subscribe((currentPlayingId) => {
      // If another audio player started, stop this one
      if (currentPlayingId !== null && currentPlayingId !== playerIdRef.current && isPlayingRef.current) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setAudioError(false);
        setCurrentLoop(0);
        setCurrentFileIndex(0);
        isPlayingRef.current = false;
      }
    });

    return unsubscribe;
  }, []);

  // Reset state when audioFiles actually change (not just array reference)
  useEffect(() => {
    setAudioError(false);
    setIsPlaying(false);
    setCurrentLoop(0);
    setCurrentFileIndex(0);
    isPlayingRef.current = false;
    lastLoadedSrcRef.current = '';
    audioManager.stop(playerIdRef.current);
  }, [audioFilesKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      }
      lastLoadedSrcRef.current = '';
      audioManager.stop(playerIdRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1.5 bg-gray-50 px-2 py-2 rounded-lg border border-gray-200 min-w-0 relative">
      <Volume2 size={12} className="text-gray-400 absolute top-1 right-1" />
      <div className="relative mb-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAudioPlayback();
          }}
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors text-white ${
            audioError 
              ? `${colorClass.errorBg} ${colorClass.errorHover}` 
              : `${colorClass.bg} ${colorClass.hover}`
          }`}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        {isPlaying && !audioError && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-3">
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-1`} style={{ height: '4px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-2`} style={{ height: '6px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-3`} style={{ height: '8px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-2`} style={{ height: '6px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-1`} style={{ height: '4px' }}></div>
          </div>
        )}
      </div>
      {label && (
        <span className="text-[9px] text-gray-600 text-center leading-tight max-w-full truncate px-0.5 w-full">
          {audioError ? 'Audio unavailable' : label}
        </span>
      )}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onWaiting={handleWaiting}
        preload="none"
      />
    </div>
  );
}
