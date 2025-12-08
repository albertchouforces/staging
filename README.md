# Quiz Template Application

A flexible and customizable quiz template for creating image-based multiple choice quizzes.

## Features

- Interactive quiz with visual questions
- Optional audio playback for questions
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
2. (Optional) Place audio files in the `public/audio` folder for questions that need sound
3. Edit `src/react-app/data/quizData.ts`:
   - Customize the quiz configuration
   - Add your questions following the template format
   - Add optional `audioUrl` field to questions that need audio playback
4. Test your quiz locally
5. Deploy to your preferred hosting platform

See `src/react-app/data/quizData.ts` for detailed instructions and examples.

### Supported Audio Formats
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- M4A (.m4a)
- AAC (.aac)

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
