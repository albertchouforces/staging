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
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
        image: "https://images.unsplash.com/photo-1614732414444-096040ec8c1b?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "What is the largest ocean on Earth?",
        answer: "Pacific Ocean",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "In which year did World War II end?",
        answer: "1945"
      },
      {
        question: "What is the smallest country in the world?",
        answer: "Vatican City"
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        answer: "Oxygen"
      },
      {
        question: "Who wrote the novel '1984'?",
        answer: "George Orwell"
      }
    ]
  },
  {
    quizID: "science",
    quizName: "Science Quiz",
    questions: [
      {
        question: "What is the speed of light in a vacuum?",
        answer: "299,792,458 meters per second",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond",
        image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "How many bones are there in an adult human body?",
        answer: "206",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        answer: "Carbon dioxide",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter"
      },
      {
        question: "What type of animal is a dolphin?",
        answer: "Mammal"
      },
      {
        question: "What is the chemical formula for water?",
        answer: "H2O"
      },
      {
        question: "How many chambers does a human heart have?",
        answer: "Four"
      }
    ]
  },
  {
    quizID: "history",
    quizName: "World History",
    questions: [
      {
        question: "Who was the first person to walk on the moon?",
        answer: "Neil Armstrong",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "In which year did the Berlin Wall fall?",
        answer: "1989",
        image: "https://images.unsplash.com/photo-1596031956239-c36b34c1bd95?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "Which ancient wonder of the world was located in Alexandria?",
        answer: "Lighthouse of Alexandria",
        image: "https://images.unsplash.com/photo-1465056836041-7f43ac209b51?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "Who was the first President of the United States?",
        answer: "George Washington",
        image: "https://images.unsplash.com/photo-1518736032781-46ba1d8e8b8a?w=800&h=600&fit=crop&crop=entropy&auto=format"
      },
      {
        question: "Which empire was ruled by Julius Caesar?",
        answer: "Roman Empire"
      },
      {
        question: "What year did the Titanic sink?",
        answer: "1912"
      },
      {
        question: "Which country gifted the Statue of Liberty to the United States?",
        answer: "France"
      },
      {
        question: "Who invented the printing press?",
        answer: "Johannes Gutenberg"
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
