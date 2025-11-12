export interface QuizQuestion {
  question: string;
  answer: string;
  image?: string;
}

export interface Quiz {
  quizID: string;
  quizName: string;
  questions: QuizQuestion[];
}

export const quizData: Quiz[] = [
  {
    quizID: "general-knowledge",
    quizName: "General Knowledge",
    questions: [
      {
        question: "What is the capital of France?",
        answer: "Paris",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop"
      },
      {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop"
      },
      {
        question: "What is the largest ocean on Earth?",
        answer: "Pacific Ocean",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop"
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop"
      },
      {
        question: "What is the chemical symbol for gold?",
        answer: "Au"
      },
      {
        question: "Which continent is the largest by area?",
        answer: "Asia"
      },
      {
        question: "What year did World War II end?",
        answer: "1945"
      },
      {
        question: "What is the smallest country in the world?",
        answer: "Vatican City"
      }
    ]
  },
  {
    quizID: "science",
    quizName: "Science & Nature",
    questions: [
      {
        question: "What is the speed of light in vacuum?",
        answer: "299,792,458 meters per second"
      },
      {
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        answer: "Carbon dioxide"
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond"
      },
      {
        question: "How many bones are in an adult human body?",
        answer: "206"
      },
      {
        question: "What is the largest mammal in the world?",
        answer: "Blue whale",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
      },
      {
        question: "What type of animal is a Komodo dragon?",
        answer: "Lizard",
        image: "https://images.unsplash.com/photo-1580594736932-8b4e3cddaec4?w=800&h=600&fit=crop"
      },
      {
        question: "What is the study of earthquakes called?",
        answer: "Seismology"
      },
      {
        question: "Which blood type is known as the universal donor?",
        answer: "O negative"
      }
    ]
  },
  {
    quizID: "technology",
    quizName: "Technology",
    questions: [
      {
        question: "What does CPU stand for?",
        answer: "Central Processing Unit"
      },
      {
        question: "Who founded Apple Inc.?",
        answer: "Steve Jobs"
      },
      {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language"
      },
      {
        question: "What year was the first iPhone released?",
        answer: "2007"
      },
      {
        question: "What does AI stand for?",
        answer: "Artificial Intelligence"
      },
      {
        question: "Which programming language is known for web development?",
        answer: "JavaScript"
      },
      {
        question: "What does RAM stand for?",
        answer: "Random Access Memory"
      },
      {
        question: "Who founded Microsoft?",
        answer: "Bill Gates"
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
