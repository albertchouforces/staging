export interface QuizQuestion {
  question: string;
  answer: string;
  image?: string; // Optional URL for question image
}

export interface Quiz {
  quizID: string;
  quizName: string;
  questions: QuizQuestion[];
}

export const quizData: Quiz[] = [
  {
    quizID: "web-dev",
    quizName: "Web Development Basics",
    questions: [
      {
        question: "What language is primarily used for styling web pages?",
        answer: "CSS",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1650&auto=format&fit=crop"
      },
      {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop"
      },
      {
        question: "Which of these is a JavaScript framework?",
        answer: "React",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1470&auto=format&fit=crop"
      },
      {
        question: "What is the current HTML version?",
        answer: "HTML5"
      },
      {
        question: "Which of these is used for version control?",
        answer: "Git"
      }
    ]
  },
  {
    quizID: "science",
    quizName: "General Science",
    questions: [
      {
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        image: "https://images.unsplash.com/photo-1610375461369-d613b666be2b?q=80&w=1470&auto=format&fit=crop"
      },
      {
        question: "Which planet is closest to the sun?",
        answer: "Mercury",
        image: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?q=80&w=1470&auto=format&fit=crop"
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond",
        image: "https://images.unsplash.com/photo-1551732998-9573f695fdbb?q=80&w=1470&auto=format&fit=crop"
      },
      {
        question: "What is the largest organ in the human body?",
        answer: "Skin"
      },
      {
        question: "What type of energy is stored in a battery?",
        answer: "Chemical energy"
      }
    ]
  },
  {
    quizID: "buoys",
    quizName: "Buoys and Channel Markers",
    questions: [
      {
        question: "What does this indicate?",
        answer: "Safe Water",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Safe%20Water.png"
      },
      {
        question: "What does this indicate?",
        answer: "Isolated Danger",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Isolated%20Danger.png"
      },
      {
        question: "What does this indicate?",
        answer: "New Danger",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/New%20Danger.png"
      },
      {
        question: "What does this indicate?",
        answer: "Port",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Port.png"
      },
      {
        question: "What does this indicate?",
        answer: "Starboard",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Starboard.png"
      },
      {
        question: "What does this indicate?",
        answer: "North",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/North.png"
      },
      {
        question: "What does this indicate?",
        answer: "East",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/East.png"
      },
      {
        question: "What does this indicate?",
        answer: "South",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/South.png"
      },
      {
        question: "What does this indicate?",
        answer: "West",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/West.png"
      },
      {
        question: "What does this indicate?",
        answer: "Do Not Pass",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Do%20Not%20Pass.png"
      }
    ]
  }
];
