// Type for match pair items - can be text, image URL, audio URL, array of audio URLs, or nested array for OR audio
export type MatchItem = string | string[] | string[][] | { type: 'text' | 'image' | 'audio'; value: string | string[] };

// Interface for image hotspot regions
export interface Hotspot {
  id: number;
  label: string; // Display label (A, B, C, etc.)
  x: number; // X position in pixels (based on original image dimensions)
  y: number; // Y position in pixels (based on original image dimensions)
  width?: number; // Optional width in pixels (if not provided, auto-sizes to fit label)
  height?: number; // Optional height in pixels (if not provided, auto-sizes to fit label)
  correctAnswer: string; // The correct answer for this hotspot
}

export interface QuestionData {
  id: number;
  question: string;   // The question to display
  correctAnswer: string | string[] | [MatchItem, MatchItem][] | [MatchItem, MatchItem, MatchItem][];   // String (single answer), string[] (multi-select), array of pairs (matching), or array of triplets (matching with OR)
  answerPool?: string[];   // Optional custom answer options for this question (will be scrambled)
  description: string;    // Brief context shown with the question
  fact?: string;          // Optional interesting fact shown after answering
  imageUrl?: string;      // Optional path to question image
  audioUrl?: string | string[] | string[][];     // Optional audio - single file, array of files (play sequentially), or array of arrays (multiple playback options)
  audioLoopCount?: number; // Optional number of times to loop audio sequence (default: 1, plays once)
  factAudioUrl?: string | string[] | string[][];  // Optional fact audio - single file, array of files (play sequentially), or array of arrays (multiple playback options)
  factAudioLoopCount?: number; // Optional number of times to loop fact audio sequence (default: 1, plays once)
  fillInTheBlank?: boolean; // Optional per-question fill-in-the-blank mode (overrides quiz-level setting for this question)
  sortLeft?: boolean; // Optional flag to sort left column alphabetically in matching questions (overrides randomization)
  sortRight?: boolean; // Optional flag to sort right column alphabetically in matching questions (overrides randomization)
  hotspots?: Hotspot[]; // Optional array of hotspots for image hotspot questions
  factHeading?: string; // Optional fact heading (used in composite quizzes to preserve source quiz's heading)
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
  themeColor: string; // Accepts predefined color names (blue, green, etc.) or hex codes (#RRGGBB)
  quizKey: string;     // Unique key for storage and database identification
  startScreenImage?: string;
  studyGuide?: string; // Optional URL or path to study guide image
  advancedChallenge?: boolean; // Indicates if this is an advanced challenge
  category?: string;   // Optional category for grouping quizzes (e.g., "Advanced Challenges", "Beginner Level")
  hidden?: boolean;    // Optional flag to hide the quiz from display
  factHeading?: string; // Optional custom heading for facts section (defaults to "Did you know?")
  fillInTheBlank?: boolean; // Enable fill-in-the-blank mode where (blank) in question text becomes interactive
  startQuestion?: number; // Optional question ID to force as the first question (useful for testing specific questions)
  sourceQuizIds?: string[]; // Optional array of quiz IDs to pool questions from (creates composite quiz)
  questionCount?: number; // Optional total number of questions to include from source quizzes (evenly distributed)
  disableLeaderboards?: boolean; // Optional flag to disable both local and global leaderboards for this quiz
}

export interface QuizDefinition {
  config: QuizConfig;
  questions: QuestionData[];
}
