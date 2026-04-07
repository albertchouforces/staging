# Quiz Template Application

A flexible and customizable quiz template for creating image-based multiple choice quizzes.

## Features

- Interactive quiz with visual questions
- Multiple choice answers
- Immediate feedback
- Real-time timer with pause functionality
- Progress tracking
- High scores system
- Modern, responsive design

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Creating Your Own Quiz

1. Place your question images in the `public/images` folder
2. Edit `src/data/templateQuiz.ts`:
   - Customize the `QUIZ_CONFIG`
   - Add your questions following the template format
3. Test your quiz locally
4. Deploy to your preferred hosting platform

See `src/data/templateQuiz.ts` for detailed instructions and examples.

## Project Structure

```
src/
├── components/         # React components
├── data/              # Quiz questions and config
├── lib/               # Utility functions
├── types/             # TypeScript definitions
└── App.tsx            # Main application
```

## Technical Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- lucide-react (icons)

## License

This project is available for educational and personal use.
