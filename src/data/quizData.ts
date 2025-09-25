// =================================================================
// QUIZ COLLECTION - HOW TO ADD YOUR OWN QUIZZES
// =================================================================
//
// This template allows you to create multiple image-based multiple choice quizzes.
// Follow these steps to add a new quiz:
//
// 1. PREPARE YOUR IMAGES:
//    - Place all question images in the public/images/{quiz-name}/ folder
//    - Recommended image dimensions: 800x600px or similar 4:3/16:9 ratio
//    - Supported formats: PNG, JPG, SVG
//    - Example path: public/images/animals/lion.jpg will be referenced as "/images/animals/lion.jpg"
//
// 2. ADD YOUR QUIZ CONFIGURATION:
//    - Add a new quiz configuration to the QUIZ_COLLECTION below
//    - Each quiz needs:
//      * id: Unique identifier for the quiz
//      * title: Quiz title
//      * description: Brief quiz description
//      * themeColor: Choose from available theme colors
//      * service: Unique identifier for storage (use snake_case) - represents the quiz_name
//      * startScreenImage: Optional image for quiz card
//      * studyGuide: Optional URL or path to study guide/materials:
//         - Local images: Will be shown in a popup modal
//         - External URLs (http/https): Will be opened in a new browser tab
//         - Document files (PDFs, etc.): Will prompt a download
//      * advancedChallenge: Optional boolean to mark as advanced challenge
//      * hidden: Optional boolean to hide the quiz from display
//      * questions: Array of questions following the QuestionData format
//
// Available theme colors:
// - Basic: 'blue', 'green', 'red', 'purple', 'orange', 'pink'
// - Cool: 'sky', 'cyan', 'teal', 'indigo', 'violet'
// - Warm: 'rose', 'amber', 'fuchsia'
// - Nature: 'lime', 'emerald'
//
// =================================================================

import type { QuestionData, QuizConfig } from '../types';

interface QuizDefinition {
  config: QuizConfig;
  questions: QuestionData[];
}

// Collection of all available quizzes
export const QUIZ_COLLECTION: QuizDefinition[] = [
  {
    config: {
      id: "Signal Flags",
      title: "Signal Flags",
      description: "Test your knowledge of Signal Flags.",
      themeColor: 'purple',
      service: "Signal Flags",
      startScreenImage: "/images/naval_communications_dep_badge.gif",
      studyGuide: "https://github.com/albertchouforces/staging/raw/e8dc17661db4348c91e0bd5a4a7009b3c8bd41bc/public/Flags.pdf",
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What does this represent?",
        correctAnswer: "Alfa",
        description: "Morse Code .-",
        fact: "Single meaning: 'Divers/Friendly underwater demolition personnel down.'  International meaning: 'Diver down. Keep well clear at slow speed.'",
        imageUrl: "/images/Alfa.png"  // Place image in public/images/
      },
      {
        id: 2,
        question: "What does this represent?",
        correctAnswer: "Bravo",
        description: "Morse Code -...",
        fact: "Single meaning: 'Weapons practice. Fuelling or transferring explosives.'  International meaning: 'Taking in, discharging or carrying dangerous goods.'",
        imageUrl: "/images/Bravo.png"
      },
      {
        id: 3,
        question: "What does this represent?",
        correctAnswer: "Charlie",
        description: "Morse Code -.-.",
        fact: "Single meaning: 'Affirmative.'  International meaning: 'Yes. (Affirmative)'",
        imageUrl: "/images/Charlie.png"
      },
      {
        id: 4,
        question: "What does this represent?",
        correctAnswer: "Delta",
        description: "Morse Code -..",
        fact: "Single meaning: 'Degaussing.'. International meaning: 'Keep clear, I am manoeuvring with difficulty.'",
        imageUrl: "/images/Delta.png"
      },
      {
        id: 5,
        question: "What does this represent?",
        correctAnswer: "Echo",
        description: "Morse Code .",
        fact: "International meaning: 'I am altering my course to Starboard.'",
        imageUrl: "/images/Echo.png"
      },
      {
        id: 6,
        question: "What does this represent?",
        correctAnswer: "Foxtrot",
        description: "Morse Code ..-.",
        fact: "Single meaning: 'Flight operations.'  International meaning: 'I am disabled. Communicate with me.'",
        imageUrl: "/images/Foxtrot.png"
      },
      {
        id: 7,
        question: "What does this represent?",
        correctAnswer: "Golf",
        description: "Morse Code --.",
        fact: "Single meaning: 'Guide.'  International meaning: 'I require a pilot.'",
        imageUrl: "/images/Golf.png"
      },
      {
        id: 8,
        question: "What does this represent?",
        correctAnswer: "Hotel",
        description: "Morse Code ....",
        fact: "Single meaning: 'Helicopter operations.'  International meaning: 'I have a pilot onboard.'",
        imageUrl: "/images/Hotel.png"
      },
      {
        id: 9,
        question: "What does this represent?",
        correctAnswer: "India",
        description: "Morse Code ..",
        fact: "Single meaning: 'Going alongside in Port/Anchor.'  International meaning: 'Altering my course to Port.'",
        imageUrl: "/images/India.png"
      },
      {
        id: 10,
        question: "What does this represent?",
        correctAnswer: "Juliett",
        description: "Morse Code .---",
        fact: "Single meaning: 'Semaphore message.'  International meaning: 'I am on fire. Dangerous cargo, keep well clear.'",
        imageUrl: "/images/Juliett.png"
      },
      {
        id: 11,
        question: "What does this represent?",
        correctAnswer: "Kilo",
        description: "Morse Code -.-",
        fact: "Single meaning: 'Personnel working aloft.'  International meaning: 'I wish to communicate with you.'",
        imageUrl: "/images/Kilo.png"
      },
      {
        id: 12,
        question: "What does this represent?",
        correctAnswer: "Lima",
        description: "Morse Code .-..",
        fact: "Single meaning: 'Radhaz/Hero warning.'  International meaning: 'You should stop your vessel instantly.'",
        imageUrl: "/images/Lima.png"
      },
      {
        id: 13,
        question: "What does this represent?",
        correctAnswer: "Mike",
        description: "Morse Code --",
        fact: "Single meaning: 'Medical/Dental Guard Duty ship. Disregard my movements.'  International meaning: 'My vessel is stopped.'",
        imageUrl: "/images/Mike.png"
      },
      {
        id: 14,
        question: "What does this represent?",
        correctAnswer: "November",
        description: "Morse Code -.",
        fact: "Single meaning: 'Your movements not understood. Not keeping Visual watch.'  International meaning: 'No. (Negative)'",
        imageUrl: "/images/November.png"
      },
      {
        id: 15,
        question: "What does this represent?",
        correctAnswer: "Oscar",
        description: "Morse Code ---",
        fact: "Single and International meaning: 'Man overboard.'",
        imageUrl: "/images/Oscar.png"
      },
      {
        id: 16,
        question: "What does this represent?",
        correctAnswer: "Papa",
        description: "Morse Code .--.",
        fact: "Single meaning: 'General recall. Position indicator.'  International meaning: 'Recall. All persons to repair onboard. Vessel about to sail.'",
        imageUrl: "/images/Papa.png"
      },
      {
        id: 17,
        question: "What does this represent?",
        correctAnswer: "Quebec",
        description: "Morse Code --.-",
        fact: "Single meaning: 'Boat recall - own boats or those addressed.'  International meaning: 'Vessel is healthy. Request free pratique.'",
        imageUrl: "/images/Quebec.png"
      },
      {
        id: 18,
        question: "What does this represent?",
        correctAnswer: "Romeo",
        description: "Morse Code .-.",
        fact: "Single meaning: 'Going alongside for Replenishing/Transfer/Fuelling at sea. Ready Duty ship. MCM Operations.'",
        imageUrl: "/images/Romeo.png"
      },
      {
        id: 19,
        question: "What does this represent?",
        correctAnswer: "Sierra",
        description: "Morse Code ...",
        fact: "Single meaning: 'Flag Hoist Drill signal.'  International meaning: 'My engines are going full speed astern.'",
        imageUrl: "/images/Sierra.png"
      },
      {
        id: 20,
        question: "What does this represent?",
        correctAnswer: "Tango",
        description: "Morse Code -",
        fact: "Single meaning: 'Time indicator.'  International meaning: 'Keep clear of me I am engaged in pair trawling.'",
        imageUrl: "/images/Tango.png"
      },
      {
        id: 21,
        question: "What does this represent?",
        correctAnswer: "Uniform",
        description: "Morse Code ..-",
        fact: "Single meaning: 'Anchoring, Mooring & Weighing.'  International meaning: 'You are running into danger.'",
        imageUrl: "/images/Uniform.png"
      },
      {
        id: 22,
        question: "What does this represent?",
        correctAnswer: "Victor",
        description: "Morse Code ...-",
        fact: "Single meaning: 'Streaming/Recovering towed sonic devices - not including minesweeping equipment.'  International meaning: 'I require assistance.'",
        imageUrl: "/images/Victor.png"
      },
      {
        id: 23,
        question: "What does this represent?",
        correctAnswer: "Whiskey",
        description: "Morse Code .--",
        fact: "Single meaning: 'Flag Hoise information addressee.'  International meaning: 'I require medical assistance.'",
        imageUrl: "/images/Whiskey.png"
      },
      {
        id: 24,
        question: "What does this represent?",
        correctAnswer: "Xray",
        description: "Morse Code -..-",
        fact: "Single meaning: 'Evolution or Exercise completed. X-ray tack (Signal). Carry out for Exercise the meaning of the signal.'  International meaning: 'Stop carrying out your intentions & watch for my signals.'",
        imageUrl: "/images/Xray.png"
      },
      {
        id: 25,
        question: "What does this represent?",
        correctAnswer: "Yankee",
        description: "Morse Code -.--",
        fact: "Single meaning: 'Acknowledge. OTC's Location. Visual Communication Duty Ship.'  International meaning: 'I am dragging my anchor.'",
        imageUrl: "/images/Yankee.png"
      },
      {
        id: 26,
        question: "What does this represent?",
        correctAnswer: "Zulu",
        description: "Morse Code --..",
        fact: "International meaning: 'I require a tug.'",
        imageUrl: "/images/Zulu.png"
      },
      {
        id: 27,
        question: "What does this represent?",
        correctAnswer: "One",
        description: "Morse Code .----",
        fact: "Single meaning: 'ASW Action Table'",
        imageUrl: "/images/One.png"
      },
      {
        id: 28,
        question: "What does this represent?",
        correctAnswer: "Two",
        description: "Morse Code ..---",
        fact: "Single meaning: 'Surface Action Table'",
        imageUrl: "/images/Two.png"
      },
      {
        id: 29,
        question: "What does this represent?",
        correctAnswer: "Three",
        description: "Morse Code ...--",
        fact: "Single meaning: 'Boat signal. (Steer away)'",
        imageUrl: "/images/Three.png"
      },
      {
        id: 30,
        question: "What does this represent?",
        correctAnswer: "Four",
        description: "Morse Code ....-",
        fact: "Single meaning: 'ASW Exercises.'",
        imageUrl: "/images/Four.png"
      },
      {
        id: 31,
        question: "What does this represent?",
        correctAnswer: "Five",
        description: "Morse Code .....",
        fact: "Single meaning: 'Breakdown.'",
        imageUrl: "/images/Five.png"
      },
      {
        id: 32,
        question: "What does this represent?",
        correctAnswer: "Six",
        description: "Morse Code -....",
        fact: "Single meaning: 'Act at your discretion.'",
        imageUrl: "/images/Six.png"
      },
      {
        id: 33,
        question: "What does this represent?",
        correctAnswer: "Seven",
        description: "Morse Code --...",
        fact: "Single meaning: 'AAW Action Table.'",
        imageUrl: "/images/Seven.png"
      },
      {
        id: 34,
        question: "What does this represent?",
        correctAnswer: "Eight",
        description: "Morse Code ---..",
        fact: "Single meaning: 'Boat signal. (Steer towards)'",
        imageUrl: "/images/Eight.png"
      },
      {
        id: 35,
        question: "What does this represent?",
        correctAnswer: "Nine",
        description: "Morse Code ----.",
        fact: "Single meaning: 'Torpedo Action Table.'",
        imageUrl: "/images/Nine.png"
      },
      {
        id: 36,
        question: "What does this represent?",
        correctAnswer: "Zero",
        description: "Morse Code -----",
        fact: "Single meaning: 'Guard Mail. Military Guard.'.",
        imageUrl: "/images/Zero.png"
      },
      {
        id: 37,
        question: "What does this represent?",
        correctAnswer: "Division",
        description: "",
        fact: "",
        imageUrl: "/images/Division.png"
      },
      {
        id: 38,
        question: "What does this represent?",
        correctAnswer: "Port",
        description: "",
        fact: "Single meaning: 'Indefinite turn to Port. Out of Routine.'",
        imageUrl: "/images/Port.png"
      },
      {
        id: 39,
        question: "What does this represent?",
        correctAnswer: "Squadron",
        description: "",
        fact: "",
        imageUrl: "/images/Squadron.png"
      }
    ]
  },
  {
    config: {
      id: "Pennants",
      title: "Pennants",
      description: "Test your knowledge of Pennants.",
      themeColor: 'amber',
      service: "Pennants",
      startScreenImage: "/images/naval_communications_dep_badge.gif",
      studyGuide: "",
      hidden: false // Example of a hidden quiz
    },
    questions: [
      {
        id: 1,
        question: "What does this represent?",
        correctAnswer: "Pennant One",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant One.png"
      },
      {
        id: 2,
        question: "What does this represent?",
        correctAnswer: "Pennant Two",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Two.png"
      },
      {
        id: 3,
        question: "What does this represent?",
        correctAnswer: "Pennant Three",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Three.png"
      },
      {
        id: 4,
        question: "What does this represent?",
        correctAnswer: "Pennant Four",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Four.png"
      },
      {
        id: 5,
        question: "What does this represent?",
        correctAnswer: "Pennant Five",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Five.png"
      },
      {
        id: 6,
        question: "What does this represent?",
        correctAnswer: "Pennant Six",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Six.png"
      },
      {
        id: 7,
        question: "What does this represent?",
        correctAnswer: "Pennant Seven",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Seven.png"
      },
      {
        id: 8,
        question: "What does this represent?",
        correctAnswer: "Pennant Eight",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Eight.png"
      },
      {
        id: 9,
        question: "What does this represent?",
        correctAnswer: "Pennant Nine",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Nine.png"
      },
      {
        id: 10,
        question: "What does this represent?",
        correctAnswer: "Pennant Zero",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Zero.png"
      },
      {
        id: 11,
        question: "What does this represent?",
        correctAnswer: "Screen",
        description: "",
        fact: "",
        imageUrl: "/images/Screen.png"
      },
      {
        id: 12,
        question: "What does this represent?",
        correctAnswer: "Code",
        description: "",
        fact: "Single meaning: 'Acknowledgement. Fractions. Use INTERCO.' It is also known as the Answering Pennant.",
        imageUrl: "/images/Code Answer.png"
      },
      {
        id: 13,
        question: "What does this represent?",
        correctAnswer: "Corpen",
        description: "",
        fact: "Single meaning: 'Stop the turn.'",
        imageUrl: "/images/Corpen.png"
      },
      {
        id: 14,
        question: "What does this represent?",
        correctAnswer: "Desig",
        description: "",
        fact: "Single meaning: 'Plaint Text. Proceeding to Station/Berth. *Daylight Signalling lantern. Acknowledge DSL.*'",
        imageUrl: "/images/Desig.png"
      },
      {
        id: 15,
        question: "What does this represent?",
        correctAnswer: "Emergency",
        description: "",
        fact: "Single meaning: 'Signal(s) flying are to be obeyed as soon as understood.'",
        imageUrl: "/images/Emergency.png"
      },
      {
        id: 16,
        question: "What does this represent?",
        correctAnswer: "Flotilla",
        description: "",
        fact: "",
        imageUrl: "/images/Flotilla.png"
      },
      {
        id: 17,
        question: "What does this represent?",
        correctAnswer: "Formation",
        description: "",
        fact: "Single meaning: 'Refuse Boat is required.'",
        imageUrl: "/images/Formation.png"
      },
      {
        id: 18,
        question: "What does this represent?",
        correctAnswer: "Interogative",
        description: "",
        fact: "Single meaning: 'Signals not understood.'",
        imageUrl: "/images/Interogative.png"
      },
      {
        id: 19,
        question: "What does this represent?",
        correctAnswer: "Negative",
        description: "",
        fact: "Single meaning: 'Negative. Flag Hoist Exemp Addressees.'",
        imageUrl: "/images/Negative.png"
      },
      {
        id: 20,
        question: "What does this represent?",
        correctAnswer: "Preparative",
        description: "",
        fact: "Single meaning: 'Replenishing (Receiving Vessel). Colours & Sunset. Preparative.'",
        imageUrl: "/images/Preparative.png"
      },
      {
        id: 21,
        question: "What does this represent?",
        correctAnswer: "Speed",
        description: "",
        fact: "",
        imageUrl: "/images/Speed.png"
      },
      {
        id: 22,
        question: "What does this represent?",
        correctAnswer: "Starboard",
        description: "",
        fact: "Single meaning: 'Indefinite turn to Starboard SCOPA.'",
        imageUrl: "/images/Starboard.png"
      },
      {
        id: 23,
        question: "What does this represent?",
        correctAnswer: "Sub Division",
        description: "",
        fact: "",
        imageUrl: "/images/Sub Division.png"
      },
      {
        id: 24,
        question: "What does this represent?",
        correctAnswer: "Turn",
        description: "",
        fact: "Single meaning: 'Water barge is required.'",
        imageUrl: "/images/Turn.png"
      },
      {
        id: 25,
        question: "What does this represent?",
        correctAnswer: "First Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Flag Officer or Sqn Commander.'",
        imageUrl: "/images/First Substitute.png"
      },
      {
        id: 26,
        question: "What does this represent?",
        correctAnswer: "Second Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Chief of Staff.'",
        imageUrl: "/images/Second Substitute.png"
      },
      {
        id: 27,
        question: "What does this represent?",
        correctAnswer: "Third Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Commanding Officer/X.O.'",
        imageUrl: "/images/Third Substitute.png"
      },
      {
        id: 28,
        question: "What does this represent?",
        correctAnswer: "Fourth Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Civil or Military Official.'",
        imageUrl: "/images/Fourth Substitute.png"
      },
      {
        id: 29,
        question: "What does this represent?",
        correctAnswer: "Station",
        description: "",
        fact: "Single meaning: 'Take proper or assigned station.'",
        imageUrl: "/images/Station.png"
      }  
    ]
  },
  {
    config: {
      id: "Signal Flags and Pennants",
      title: "Signal Flags and Pennants",
      description: "Test your knowledge of all Signal Flags and Pennants.",
      themeColor: 'teal',
      service: "Signal Flags and Pennants",
      startScreenImage: "/images/naval_communications_dep_badge.gif",
      studyGuide: "https://navalknots.pages.dev/images/Bowline1.png",
      advancedChallenge: true,
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What does this represent?",
        correctAnswer: "Alfa",
        description: "Morse Code .-",
        fact: "Single meaning: 'Divers/Friendly underwater demolition personnel down.'  International meaning: 'Diver down. Keep well clear at slow speed.'",
        imageUrl: "/images/Alfa.png"  // Place image in public/images/
      },
      {
        id: 2,
        question: "What does this represent?",
        correctAnswer: "Bravo",
        description: "Morse Code -...",
        fact: "Single meaning: 'Weapons practice. Fuelling or transferring explosives.'  International meaning: 'Taking in, discharging or carrying dangerous goods.'",
        imageUrl: "/images/Bravo.png"
      },
      {
        id: 3,
        question: "What does this represent?",
        correctAnswer: "Charlie",
        description: "Morse Code -.-.",
        fact: "Single meaning: 'Affirmative.'  International meaning: 'Yes. (Affirmative)'",
        imageUrl: "/images/Charlie.png"
      },
      {
        id: 4,
        question: "What does this represent?",
        correctAnswer: "Delta",
        description: "Morse Code -..",
        fact: "Single meaning: 'Degaussing.'. International meaning: 'Keep clear, I am manoeuvring with difficulty.'",
        imageUrl: "/images/Delta.png"
      },
      {
        id: 5,
        question: "What does this represent?",
        correctAnswer: "Echo",
        description: "Morse Code .",
        fact: "International meaning: 'I am altering my course to Starboard.'",
        imageUrl: "/images/Echo.png"
      },
      {
        id: 6,
        question: "What does this represent?",
        correctAnswer: "Foxtrot",
        description: "Morse Code ..-.",
        fact: "Single meaning: 'Flight operations.'  International meaning: 'I am disabled. Communicate with me.'",
        imageUrl: "/images/Foxtrot.png"
      },
      {
        id: 7,
        question: "What does this represent?",
        correctAnswer: "Golf",
        description: "Morse Code --.",
        fact: "Single meaning: 'Guide.'  International meaning: 'I require a pilot.'",
        imageUrl: "/images/Golf.png"
      },
      {
        id: 8,
        question: "What does this represent?",
        correctAnswer: "Hotel",
        description: "Morse Code ....",
        fact: "Single meaning: 'Helicopter operations.'  International meaning: 'I have a pilot onboard.'",
        imageUrl: "/images/Hotel.png"
      },
      {
        id: 9,
        question: "What does this represent?",
        correctAnswer: "India",
        description: "Morse Code ..",
        fact: "Single meaning: 'Going alongside in Port/Anchor.'  International meaning: 'Altering my course to Port.'",
        imageUrl: "/images/India.png"
      },
      {
        id: 10,
        question: "What does this represent?",
        correctAnswer: "Juliett",
        description: "Morse Code .---",
        fact: "Single meaning: 'Semaphore message.'  International meaning: 'I am on fire. Dangerous cargo, keep well clear.'",
        imageUrl: "/images/Juliett.png"
      },
      {
        id: 11,
        question: "What does this represent?",
        correctAnswer: "Kilo",
        description: "Morse Code -.-",
        fact: "Single meaning: 'Personnel working aloft.'  International meaning: 'I wish to communicate with you.'",
        imageUrl: "/images/Kilo.png"
      },
      {
        id: 12,
        question: "What does this represent?",
        correctAnswer: "Lima",
        description: "Morse Code .-..",
        fact: "Single meaning: 'Radhaz/Hero warning.'  International meaning: 'You should stop your vessel instantly.'",
        imageUrl: "/images/Lima.png"
      },
      {
        id: 13,
        question: "What does this represent?",
        correctAnswer: "Mike",
        description: "Morse Code --",
        fact: "Single meaning: 'Medical/Dental Guard Duty ship. Disregard my movements.'  International meaning: 'My vessel is stopped.'",
        imageUrl: "/images/Mike.png"
      },
      {
        id: 14,
        question: "What does this represent?",
        correctAnswer: "November",
        description: "Morse Code -.",
        fact: "Single meaning: 'Your movements not understood. Not keeping Visual watch.'  International meaning: 'No. (Negative)'",
        imageUrl: "/images/November.png"
      },
      {
        id: 15,
        question: "What does this represent?",
        correctAnswer: "Oscar",
        description: "Morse Code ---",
        fact: "Single and International meaning: 'Man overboard.'",
        imageUrl: "/images/Oscar.png"
      },
      {
        id: 16,
        question: "What does this represent?",
        correctAnswer: "Papa",
        description: "Morse Code .--.",
        fact: "Single meaning: 'General recall. Position indicator.'  International meaning: 'Recall. All persons to repair onboard. Vessel about to sail.'",
        imageUrl: "/images/Papa.png"
      },
      {
        id: 17,
        question: "What does this represent?",
        correctAnswer: "Quebec",
        description: "Morse Code --.-",
        fact: "Single meaning: 'Boat recall - own boats or those addressed.'  International meaning: 'Vessel is healthy. Request free pratique.'",
        imageUrl: "/images/Quebec.png"
      },
      {
        id: 18,
        question: "What does this represent?",
        correctAnswer: "Romeo",
        description: "Morse Code .-.",
        fact: "Single meaning: 'Going alongside for Replenishing/Transfer/Fuelling at sea. Ready Duty ship. MCM Operations.'",
        imageUrl: "/images/Romeo.png"
      },
      {
        id: 19,
        question: "What does this represent?",
        correctAnswer: "Sierra",
        description: "Morse Code ...",
        fact: "Single meaning: 'Flag Hoist Drill signal.'  International meaning: 'My engines are going full speed astern.'",
        imageUrl: "/images/Sierra.png"
      },
      {
        id: 20,
        question: "What does this represent?",
        correctAnswer: "Tango",
        description: "Morse Code -",
        fact: "Single meaning: 'Time indicator.'  International meaning: 'Keep clear of me I am engaged in pair trawling.'",
        imageUrl: "/images/Tango.png"
      },
      {
        id: 21,
        question: "What does this represent?",
        correctAnswer: "Uniform",
        description: "Morse Code ..-",
        fact: "Single meaning: 'Anchoring, Mooring & Weighing.'  International meaning: 'You are running into danger.'",
        imageUrl: "/images/Uniform.png"
      },
      {
        id: 22,
        question: "What does this represent?",
        correctAnswer: "Victor",
        description: "Morse Code ...-",
        fact: "Single meaning: 'Streaming/Recovering towed sonic devices - not including minesweeping equipment.'  International meaning: 'I require assistance.'",
        imageUrl: "/images/Victor.png"
      },
      {
        id: 23,
        question: "What does this represent?",
        correctAnswer: "Whiskey",
        description: "Morse Code .--",
        fact: "Single meaning: 'Flag Hoise information addressee.'  International meaning: 'I require medical assistance.'",
        imageUrl: "/images/Whiskey.png"
      },
      {
        id: 24,
        question: "What does this represent?",
        correctAnswer: "Xray",
        description: "Morse Code -..-",
        fact: "Single meaning: 'Evolution or Exercise completed. X-ray tack (Signal). Carry out for Exercise the meaning of the signal.'  International meaning: 'Stop carrying out your intentions & watch for my signals.'",
        imageUrl: "/images/Xray.png"
      },
      {
        id: 25,
        question: "What does this represent?",
        correctAnswer: "Yankee",
        description: "Morse Code -.--",
        fact: "Single meaning: 'Acknowledge. OTC's Location. Visual Communication Duty Ship.'  International meaning: 'I am dragging my anchor.'",
        imageUrl: "/images/Yankee.png"
      },
      {
        id: 26,
        question: "What does this represent?",
        correctAnswer: "Zulu",
        description: "Morse Code --..",
        fact: "International meaning: 'I require a tug.'",
        imageUrl: "/images/Zulu.png"
      },
      {
        id: 27,
        question: "What does this represent?",
        correctAnswer: "One",
        description: "Morse Code .----",
        fact: "Single meaning: 'ASW Action Table'",
        imageUrl: "/images/One.png"
      },
      {
        id: 28,
        question: "What does this represent?",
        correctAnswer: "Two",
        description: "Morse Code ..---",
        fact: "Single meaning: 'Surface Action Table'",
        imageUrl: "/images/Two.png"
      },
      {
        id: 29,
        question: "What does this represent?",
        correctAnswer: "Three",
        description: "Morse Code ...--",
        fact: "Single meaning: 'Boat signal. (Steer away)'",
        imageUrl: "/images/Three.png"
      },
      {
        id: 30,
        question: "What does this represent?",
        correctAnswer: "Four",
        description: "Morse Code ....-",
        fact: "Single meaning: 'ASW Exercises.'",
        imageUrl: "/images/Four.png"
      },
      {
        id: 31,
        question: "What does this represent?",
        correctAnswer: "Five",
        description: "Morse Code .....",
        fact: "Single meaning: 'Breakdown.'",
        imageUrl: "/images/Five.png"
      },
      {
        id: 32,
        question: "What does this represent?",
        correctAnswer: "Six",
        description: "Morse Code -....",
        fact: "Single meaning: 'Act at your discretion.'",
        imageUrl: "/images/Six.png"
      },
      {
        id: 33,
        question: "What does this represent?",
        correctAnswer: "Seven",
        description: "Morse Code --...",
        fact: "Single meaning: 'AAW Action Table.'",
        imageUrl: "/images/Seven.png"
      },
      {
        id: 34,
        question: "What does this represent?",
        correctAnswer: "Eight",
        description: "Morse Code ---..",
        fact: "Single meaning: 'Boat signal. (Steer towards)'",
        imageUrl: "/images/Eight.png"
      },
      {
        id: 35,
        question: "What does this represent?",
        correctAnswer: "Nine",
        description: "Morse Code ----.",
        fact: "Single meaning: 'Torpedo Action Table.'",
        imageUrl: "/images/Nine.png"
      },
      {
        id: 36,
        question: "What does this represent?",
        correctAnswer: "Zero",
        description: "Morse Code -----",
        fact: "Single meaning: 'Guard Mail. Military Guard.'.",
        imageUrl: "/images/Zero.png"
      },
      {
        id: 37,
        question: "What does this represent?",
        correctAnswer: "Division",
        description: "",
        fact: "",
        imageUrl: "/images/Division.png"
      },
      {
        id: 38,
        question: "What does this represent?",
        correctAnswer: "Port",
        description: "",
        fact: "Single meaning: 'Indefinite turn to Port. Out of Routine.'",
        imageUrl: "/images/Port.png"
      },
      {
        id: 39,
        question: "What does this represent?",
        correctAnswer: "Squadron",
        description: "",
        fact: "",
        imageUrl: "/images/Squadron.png"
      },
      {
        id: 40,
        question: "What does this represent?",
        correctAnswer: "Pennant One",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant One.png"
      },
      {
        id: 41,
        question: "What does this represent?",
        correctAnswer: "Pennant Two",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Two.png"
      },
      {
        id: 42,
        question: "What does this represent?",
        correctAnswer: "Pennant Three",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Three.png"
      },
      {
        id: 43,
        question: "What does this represent?",
        correctAnswer: "Pennant Four",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Four.png"
      },
      {
        id: 44,
        question: "What does this represent?",
        correctAnswer: "Pennant Five",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Five.png"
      },
      {
        id: 45,
        question: "What does this represent?",
        correctAnswer: "Pennant Six",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Six.png"
      },
      {
        id: 46,
        question: "What does this represent?",
        correctAnswer: "Pennant Seven",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Seven.png"
      },
      {
        id: 47,
        question: "What does this represent?",
        correctAnswer: "Pennant Eight",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Eight.png"
      },
      {
        id: 48,
        question: "What does this represent?",
        correctAnswer: "Pennant Nine",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Nine.png"
      },
      {
        id: 49,
        question: "What does this represent?",
        correctAnswer: "Pennant Zero",
        description: "",
        fact: "",
        imageUrl: "/images/Pennant Zero.png"
      },
      {
        id: 50,
        question: "What does this represent?",
        correctAnswer: "Screen",
        description: "",
        fact: "",
        imageUrl: "/images/Screen.png"
      },
      {
        id: 51,
        question: "What does this represent?",
        correctAnswer: "Code",
        description: "",
        fact: "Single meaning: 'Acknowledgement. Fractions. Use INTERCO.' It is also known as the Answering Pennant.",
        imageUrl: "/images/Code Answer.png"
      },
      {
        id: 52,
        question: "What does this represent?",
        correctAnswer: "Corpen",
        description: "",
        fact: "Single meaning: 'Stop the turn.'",
        imageUrl: "/images/Corpen.png"
      },
      {
        id: 53,
        question: "What does this represent?",
        correctAnswer: "Desig",
        description: "",
        fact: "Single meaning: 'Plaint Text. Proceeding to Station/Berth. *Daylight Signalling lantern. Acknowledge DSL.*'",
        imageUrl: "/images/Desig.png"
      },
      {
        id: 54,
        question: "What does this represent?",
        correctAnswer: "Emergency",
        description: "",
        fact: "Single meaning: 'Signal(s) flying are to be obeyed as soon as understood.'",
        imageUrl: "/images/Emergency.png"
      },
      {
        id: 55,
        question: "What does this represent?",
        correctAnswer: "Flotilla",
        description: "",
        fact: "",
        imageUrl: "/images/Flotilla.png"
      },
      {
        id: 56,
        question: "What does this represent?",
        correctAnswer: "Formation",
        description: "",
        fact: "Single meaning: 'Refuse Boat is required.'",
        imageUrl: "/images/Formation.png"
      },
      {
        id: 57,
        question: "What does this represent?",
        correctAnswer: "Interogative",
        description: "",
        fact: "Single meaning: 'Signals not understood.'",
        imageUrl: "/images/Interogative.png"
      },
      {
        id: 58,
        question: "What does this represent?",
        correctAnswer: "Negative",
        description: "",
        fact: "Single meaning: 'Negative. Flag Hoist Exemp Addressees.'",
        imageUrl: "/images/Negative.png"
      },
      {
        id: 59,
        question: "What does this represent?",
        correctAnswer: "Preparative",
        description: "",
        fact: "Single meaning: 'Replenishing (Receiving Vessel). Colours & Sunset. Preparative.'",
        imageUrl: "/images/Preparative.png"
      },
      {
        id: 60,
        question: "What does this represent?",
        correctAnswer: "Speed",
        description: "",
        fact: "",
        imageUrl: "/images/Speed.png"
      },
      {
        id: 61,
        question: "What does this represent?",
        correctAnswer: "Starboard",
        description: "",
        fact: "Single meaning: 'Indefinite turn to Starboard SCOPA.'",
        imageUrl: "/images/Starboard.png"
      },
      {
        id: 62,
        question: "What does this represent?",
        correctAnswer: "Sub Division",
        description: "",
        fact: "",
        imageUrl: "/images/Sub Division.png"
      },
      {
        id: 63,
        question: "What does this represent?",
        correctAnswer: "Turn",
        description: "",
        fact: "Single meaning: 'Water barge is required.'",
        imageUrl: "/images/Turn.png"
      },
      {
        id: 64,
        question: "What does this represent?",
        correctAnswer: "First Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Flag Officer or Sqn Commander.'",
        imageUrl: "/images/First Substitute.png"
      },
      {
        id: 65,
        question: "What does this represent?",
        correctAnswer: "Second Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Chief of Staff.'",
        imageUrl: "/images/Second Substitute.png"
      },
      {
        id: 66,
        question: "What does this represent?",
        correctAnswer: "Third Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Commanding Officer/X.O.'",
        imageUrl: "/images/Third Substitute.png"
      },
      {
        id: 67,
        question: "What does this represent?",
        correctAnswer: "Fourth Substitute",
        description: "",
        fact: "Single meaning: 'Absentee Indicator - Civil or Military Official.'",
        imageUrl: "/images/Fourth Substitute.png"
      },
      {
        id: 68,
        question: "What does this represent?",
        correctAnswer: "Station",
        description: "",
        fact: "Single meaning: 'Take proper or assigned station.'",
        imageUrl: "/images/Station.png"
      }  
    ]
  }
];

// =================================================================
// EXAMPLE OF ADDING A NEW QUIZ
// =================================================================
/*
// Add this to the QUIZ_COLLECTION array:
{
  config: {
    id: "music",
    title: "Musical Instruments",
    description: "Test your knowledge of musical instruments",
    themeColor: 'violet',
    service: "musical_instruments_quiz",
    startScreenImage: "/images/music/music-start.jpg",
    studyGuide: "/images/music/study-guide.jpg",  // Optional study guide image
    advancedChallenge: false,  // Optional advanced challenge flag
    hidden: false  // Optional hidden flag
  },
  questions: [
    {
      id: 1,
      question: "What instrument is this?",
      correctAnswer: "Grand Piano",
      description: "A large keyboard instrument",
      fact: "A modern grand piano has about 230 strings!",
      imageUrl: "/images/music/grand-piano.jpg"
    },
    // Add more questions...
  ]
}
*/

// =================================================================
// TIPS FOR CREATING GOOD QUIZZES
// =================================================================
// 1. Use a consistent theme for each quiz
// 2. Choose appropriate theme colors that match the quiz content
// 3. Organize images in separate folders for each quiz
// 4. Use high-quality, clear images
// 5. Keep questions focused and unambiguous
// 6. Add interesting facts to make the quiz educational
// 7. Test all image paths before deploying
// 8. If providing a study guide, ensure it's clear and relevant
// 9. Use advancedChallenge flag for more difficult quizzes
// 10. Use hidden flag to temporarily disable quizzes
// =================================================================
