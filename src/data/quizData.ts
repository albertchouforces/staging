export interface Quiz {
  quizID: string;
  quizName: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  answer: string;
  image?: string;
}

export const quizzes: Quiz[] = [
  {
    quizID: "general-knowledge-1",
    quizName: "General Knowledge Quiz",
    questions: [
      {
        question: "What is the capital of France?",
        answer: "Paris",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80",
      },
      {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
        image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&q=80",
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
      },
      {
        question: "What is the smallest country in the world?",
        answer: "Vatican City",
      },
      {
        question: "What year did World War II end?",
        answer: "1945",
      },
      {
        question: "What is the chemical symbol for gold?",
        answer: "Au",
      },
      {
        question: "How many continents are there?",
        answer: "7",
      },
      {
        question: "What is the tallest mountain in the world?",
        answer: "Mount Everest",
      },
    ],
  },
  {
    quizID: "science-quiz-1",
    quizName: "Science Fundamentals",
    questions: [
      {
        question: "What is the speed of light?",
        answer: "299,792,458 m/s",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
      },
      {
        question: "What is the powerhouse of the cell?",
        answer: "Mitochondria",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        answer: "Carbon Dioxide",
      },
      {
        question: "What is H2O commonly known as?",
        answer: "Water",
      },
      {
        question: "How many bones are in the human body?",
        answer: "206",
      },
      {
        question: "What is the largest organ in the human body?",
        answer: "Skin",
      },
      {
        question: "What element has the atomic number 1?",
        answer: "Hydrogen",
      },
      {
        question: "What force keeps us on the ground?",
        answer: "Gravity",
      },
    ],
  },
  {
    quizID: "buoys",
    quizName: "Buoys and Channel Markers",
    questions: [
      {
        question: "What does this indicate?",
        answer: "Safe Water",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Safe%20Water.png",
      },
      {
        question: "What does this indicate?",
        answer: "Isolated Danger",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Isolated%20Danger.png",
      },
      {
        question: "What does this indicate?",
        answer: "New Danger",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/New%20Danger.png",
      },
      {
        question: "What does this indicate?",
        answer: "Port",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Port.png",
      },
      {
        question: "What does this indicate?",
        answer: "Starboard",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Starboard.png",
      },
      {
        question: "What does this indicate?",
        answer: "North",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/North.png",
      },
      {
        question: "What does this indicate?",
        answer: "East",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/East.png",
      },
      {
        question: "What does this indicate?",
        answer: "South",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/South.png",
      },
      {
        question: "What does this indicate?",
        answer: "West",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/West.png",
      },
      {
        question: "What does this indicate?",
        answer: "Do Not Pass",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Do%20Not%20Pass.png",
      },
    ],
  },
];
