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
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
      },
      {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
        image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80"
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80"
      },
      {
        question: "What is the chemical symbol for gold?",
        answer: "Au"
      },
      {
        question: "In what year did World War II end?",
        answer: "1945"
      },
      {
        question: "What is the smallest country in the world?",
        answer: "Vatican City"
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "William Shakespeare"
      },
      {
        question: "What is the speed of light?",
        answer: "299,792,458 meters per second"
      }
    ]
  },
  {
    quizID: "science",
    quizName: "Science Trivia",
    questions: [
      {
        question: "What is H2O commonly known as?",
        answer: "Water"
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        answer: "Carbon dioxide"
      },
      {
        question: "What is the powerhouse of the cell?",
        answer: "Mitochondria"
      },
      {
        question: "How many bones are in the adult human body?",
        answer: "206"
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond"
      },
      {
        question: "What planet is known as the Red Planet?",
        answer: "Mars"
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
