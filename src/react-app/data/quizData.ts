// =================================================================
// QUIZ COLLECTION - UNIFIED QUIZ DATA STRUCTURE
// =================================================================
//
// This file contains all quiz definitions in a unified structure.
// Each quiz has its config and questions together for easy management.
//
// HOW TO ADD A NEW QUIZ:
//
// 1. Add a new object to the QUIZ_COLLECTION array below
// 2. Fill in the config section:
//    - id: Unique identifier (e.g., "signal-flags")
//    - title: Display title
//    - description: Brief description
//    - themeColor: Choose from available colors
//    - quizKey: Unique key for localStorage (e.g., "signalflags")
//    - startScreenImage: Optional image path
//    - studyGuide: Optional URL to study material
//    - category: Optional category tag
//    - hidden: Set to true to hide from start screen
//    - isAdvanced: Set to true to show under "Advanced Challenge" heading
//
// 3. Add questions array with your questions
//    - id: Unique number within this quiz
//    - question: The question text
//    - correctAnswer: The correct answer (exact match)
//    - description: Context shown with question
//    - fact: Interesting fact shown after answering
//    - imageUrl: Path to image (relative to public folder)
//
// =================================================================

import type { QuizDefinition } from '@/react-app/types';

export const QUIZ_COLLECTION: QuizDefinition[] = [
  {
    config: {
      id: "signal-flags",
      title: "Signal Flags",
      description: "Test your knowledge of Signal Flags.",
      themeColor: 'purple',
      quizKey: "signalflags",
      startScreenImage: "/images/naval_communications_dep_badge.gif",
      studyGuide: "",
      factHeading: "",
      category: "Naval Communications",
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What does this represent?",
        correctAnswer: "Alfa",
        description: "Morse Code .-",
        fact: "Single meaning: 'Divers/Friendly underwater demolition personnel down.'  International meaning: 'Diver down. Keep well clear at slow speed.'",
        imageUrl: "/images/Alfa.png"
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
      id: "pennants",
      title: "Pennants",
      description: "Test your knowledge of Pennants.",
      themeColor: 'amber',
      quizKey: "pennants",
      startScreenImage: "/images/naval_communications_dep_badge.gif",
      studyGuide: "",
      factHeading: "",
      category: "Naval Communications",
      hidden: false
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
      id: "combined",
      title: "Signal Flags and Pennants",
      description: "Test your knowledge of all Signal Flags and Pennants.",
      themeColor: 'teal',
      quizKey: "sfp_combined",
      startScreenImage: "/images/naval_communications_dep_badge.gif",
      studyGuide: "",
      factHeading: "",
      category: "Naval Communications",
      hidden: false,
      isAdvanced: true
    },
    questions: [
      // Combined questions from both quizzes
      // Signal Flags (1-39)
      {
        id: 1,
        question: "What does this represent?",
        correctAnswer: "Alfa",
        description: "Morse Code .-",
        fact: "Single meaning: 'Divers/Friendly underwater demolition personnel down.'  International meaning: 'Diver down. Keep well clear at slow speed.'",
        imageUrl: "/images/Alfa.png"
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
      // Pennants (40-68)
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
// HELPER FUNCTION - Get quiz by index or ID
// =================================================================
export function getQuizByIndex(index: number): QuizDefinition | undefined {
  return QUIZ_COLLECTION[index];
}

export function getQuizById(id: string): QuizDefinition | undefined {
  return QUIZ_COLLECTION.find(quiz => quiz.config.id === id);
}

// Filter out hidden quizzes for display
export function getVisibleQuizzes(): QuizDefinition[] {
  return QUIZ_COLLECTION.filter(quiz => !quiz.config.hidden);
}
