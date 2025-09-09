export interface Quiz {
  quizID: string;
  quizName: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
  image?: string;
}

export const quizzes: Quiz[] = [
  {
    quizID: "general-knowledge",
    quizName: "General Knowledge",
    questions: [
      {
        question: "What is the capital of France?",
        answer: "Paris",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop"
      },
      {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&h=300&fit=crop"
      },
      {
        question: "What is the largest mammal in the world?",
        answer: "Blue whale",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop"
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop"
      },
      {
        question: "What is the smallest country in the world?",
        answer: "Vatican City"
      },
      {
        question: "In which year did World War II end?",
        answer: "1945"
      },
      {
        question: "What is the chemical symbol for gold?",
        answer: "Au"
      },
      {
        question: "Which ocean is the largest?",
        answer: "Pacific Ocean"
      }
    ]
  },
  {
    quizID: "science",
    quizName: "Science & Nature",
    questions: [
      {
        question: "What is the speed of light in vacuum?",
        answer: "299,792,458 m/s",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop"
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        answer: "Carbon dioxide",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop"
      },
      {
        question: "How many bones are in an adult human body?",
        answer: "206",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop"
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=300&fit=crop"
      },
      {
        question: "Which blood type is known as the universal donor?",
        answer: "O negative"
      },
      {
        question: "What is the largest organ in the human body?",
        answer: "Skin"
      },
      {
        question: "How many chambers does a human heart have?",
        answer: "Four"
      },
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        answer: "Nitrogen"
      }
    ]
  },
  {
    quizID: "technology",
    quizName: "Technology",
    questions: [
      {
        question: "Who founded Microsoft?",
        answer: "Bill Gates and Paul Allen",
        image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500&h=300&fit=crop"
      },
      {
        question: "What does CPU stand for?",
        answer: "Central Processing Unit",
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=300&fit=crop"
      },
      {
        question: "In what year was the first iPhone released?",
        answer: "2007",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop"
      },
      {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop"
      },
      {
        question: "Which company developed the Android operating system?",
        answer: "Google"
      },
      {
        question: "What does RAM stand for?",
        answer: "Random Access Memory"
      },
      {
        question: "Who is the founder of Tesla?",
        answer: "Elon Musk"
      },
      {
        question: "What programming language is known for its use in web development?",
        answer: "JavaScript"
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
