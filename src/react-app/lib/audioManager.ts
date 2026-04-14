// Global audio manager to ensure only one audio plays at a time
class AudioManager {
  private currentPlayingId: string | null = null;
  private listeners: Set<(id: string | null) => void> = new Set();

  play(id: string) {
    if (this.currentPlayingId !== id) {
      this.currentPlayingId = id;
      this.notifyListeners();
    }
  }

  stop(id: string) {
    if (this.currentPlayingId === id) {
      this.currentPlayingId = null;
      this.notifyListeners();
    }
  }

  isPlaying(id: string): boolean {
    return this.currentPlayingId === id;
  }

  getCurrentPlayingId(): string | null {
    return this.currentPlayingId;
  }

  subscribe(listener: (id: string | null) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentPlayingId));
  }
}

export const audioManager = new AudioManager();
