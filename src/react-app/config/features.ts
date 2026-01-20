// Feature flags for the application
export const ENABLE_GLOBAL_LEADERBOARD = true;

// When false, hides time from leaderboards and UI, ranks by newest score instead
// Time is still recorded in the background for potential future use
export const ENABLE_TIME_TRACKING = true;

// When false, disables randomization of question order and answer options
// Useful for testing quizzes in their original order
export const ENABLE_RANDOMIZATION = false;

// When true, uses a dropdown selector for quiz selection in the Global Leaderboard
// When false, displays individual buttons for each quiz
// Dropdown is recommended for apps with many quizzes for better scalability
export const USE_DROPDOWN_QUIZ_SELECTOR = true;
