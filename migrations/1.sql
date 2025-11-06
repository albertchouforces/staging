
CREATE TABLE high_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  accuracy_percentage REAL NOT NULL,
  time_taken_ms INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_high_scores_quiz_id ON high_scores(quiz_id);
CREATE INDEX idx_high_scores_ranking ON high_scores(quiz_id, time_taken_ms ASC, accuracy_percentage DESC);
