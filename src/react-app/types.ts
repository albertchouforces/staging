// Type for match pair items - can be text, image URL, audio URL, array of audio URLs, or nested array for OR audio
export type MatchItem = string | string[] | string[][] | { type: 'text' | 'image' | 'audio'; value: string | string[] };

export interface QuestionData {
  id: number;
  question: string;   // The question to display
  correctAnswer: string | string[] | [MatchItem, MatchItem][] | [MatchItem, MatchItem, MatchItem][];   // String (single answer), string[] (multi-select), array of pairs (matching), or array of triplets (matching with OR)
  answerPool?: string[];   // Optional custom answer options for this question (will be scrambled)
  description: string;    // Brief context shown with the question
  fact: string;          // Interesting fact shown after answering
  imageUrl?: string;      // Optional path to question image
  audioUrl?: string | string[] | string[][];     // Optional audio - single file, array of files (play sequentially), or array of arrays (multiple playback options)
  audioLoopCount?: number; // Optional number of times to loop audio sequence (default: 1, plays once)
  factAudioUrl?: string | string[] | string[][];  // Optional fact audio - single file, array of files (play sequentially), or array of arrays (multiple playback options)
  factAudioLoopCount?: number; // Optional number of times to loop fact audio sequence (default: 1, plays once)
}

export interface HighScoreEntry {
  userName: string;
  score: number;
  accuracy: number;
  time: number;
  date: string;
}

export interface BestRun {
  userName: string;
  time: number;
  score: number;
  accuracy: number;
}

export interface QuizStats {
  highScore: number;
  bestRun: BestRun | null;
  highScores: HighScoreEntry[];
}

export interface QuizConfig {
  id: string;          // Unique identifier for the quiz
  title: string;
  description: string;
  themeColor: 
    | 'blue' 
    | 'green' 
    | 'sky' 
    | 'red' 
    | 'purple' 
    | 'orange' 
    | 'pink'
    | 'indigo'
    | 'teal'
    | 'rose'
    | 'amber'
    | 'lime'
    | 'cyan'
    | 'violet'
    | 'fuchsia'
    | 'emerald';
  quizKey: string;     // Unique key for storage and database identification
  startScreenImage?: string;
  studyGuide?: string; // Optional URL or path to study guide image
  advancedChallenge?: boolean; // Indicates if this is an advanced challenge
  hidden?: boolean;    // Optional flag to hide the quiz from display
  factHeading?: string; // Optional custom heading for facts section (defaults to "Did you know?")
}

export interface QuizDefinition {
  config: QuizConfig;
  questions: QuestionData[];
}
