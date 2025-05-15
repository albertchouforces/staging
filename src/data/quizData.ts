import { Quiz } from '../types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 'history',
    title: 'World History',
    description: 'Test your knowledge of major historical events and figures',
    questions: [
      {
        id: 'h1',
        question: 'In which year did World War II end?',
        correctAnswer: '1945',
        imageUrl: 'https://images.unsplash.com/photo-1504221507732-5246c045949b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'h2',
        question: 'Who was the first President of the United States?',
        correctAnswer: 'George Washington',
      },
      {
        id: 'h3',
        question: 'Which empire was ruled by Genghis Khan?',
        correctAnswer: 'Mongol Empire',
        imageUrl: 'https://images.unsplash.com/photo-1566055909643-a51b4271d2bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'h4',
        question: 'In which year did the Berlin Wall fall?',
        correctAnswer: '1989',
      },
      {
        id: 'h5',
        question: 'Who painted the Mona Lisa?',
        correctAnswer: 'Leonardo da Vinci',
      }
    ],
  },
  {
    id: 'science',
    title: 'Science Quiz',
    description: 'Challenge yourself with these science questions',
    questions: [
      {
        id: 's1',
        question: 'What is the chemical symbol for gold?',
        correctAnswer: 'Au',
      },
      {
        id: 's2',
        question: 'What is the hardest natural substance on Earth?',
        correctAnswer: 'Diamond',
      },
      {
        id: 's3',
        question: 'Which planet is known as the Red Planet?',
        correctAnswer: 'Mars',
        imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 's4',
        question: 'What is the largest organ in the human body?',
        correctAnswer: 'Skin',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 's5',
        question: 'What particle has a positive charge?',
        correctAnswer: 'Proton',
      }
    ],
  }
];
