
CREATE TABLE high_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_milliseconds INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_high_scores_quiz_id ON high_scores(quiz_id);
CREATE INDEX idx_high_scores_time_score ON high_scores(quiz_id, time_milliseconds, score DESC);
