import { Knot } from '../types';

export const knots: Knot[] = [
  {
    id: 'bowline',
    name: 'Bowline',
    description: 'The bowline creates a fixed loop at the end of a line. It\'s known as the "king of knots" because of its importance and utility.',
    difficulty: 'beginner',
    useCases: [
      'Creating a secure loop that won\'t slip or bind',
      'Rescue operations for securing around a person',
      'Securing a line to a ring or post',
      'Mooring a boat to a dock or buoy'
    ],
    steps: [
      {
        description: 'Form a small loop in the standing part of the line, leaving enough rope for the working end.',
        imagePosition: '0%',
      },
      {
        description: 'Pass the working end up through the loop from underneath.',
        imagePosition: '20%',
      },
      {
        description: 'Wrap the working end around behind the standing part.',
        imagePosition: '40%',
      },
      {
        description: 'Bring the working end back down through the loop.',
        imagePosition: '60%',
      },
      {
        description: 'Pull the knot tight by holding the loop and pulling on the standing part.',
        imagePosition: '80%',
      },
    ]
  },
  {
    id: 'clove-hitch',
    name: 'Clove Hitch',
    description: 'A quick and easy knot used to secure a line to a post or rail temporarily.',
    difficulty: 'beginner',
    useCases: [
      'Quickly securing a line to a pole or post',
      'Starting point for lashings in pioneering projects',
      'Temporary mooring of small boats',
      'Setting up a ridge line for tarps or shelters'
    ],
    steps: [
      {
        description: 'Wrap the rope around the post.',
        imagePosition: '0%',
      },
      {
        description: 'Cross the working end over the standing part and wrap around the post again.',
        imagePosition: '33%',
      },
      {
        description: 'Pass the working end under itself, in the space between the rope and the post.',
        imagePosition: '66%',
      }
    ]
  },
  {
    id: 'figure-eight',
    name: 'Figure Eight Knot',
    description: 'A stopper knot that prevents a line from passing through a hole or block.',
    difficulty: 'beginner',
    useCases: [
      'Preventing a rope from running through a pulley or hole',
      'Creating a stopper at the end of a rope',
      'Base for more complex knots like the Figure Eight Follow Through',
      'Sailing applications to secure lines'
    ],
    steps: [
      {
        description: 'Form a loop in the rope, passing the working end over the standing part.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the working end around and behind the standing part.',
        imagePosition: '33%',
      },
      {
        description: 'Thread the working end up through the original loop.',
        imagePosition: '66%',
      }
    ]
  },
  {
    id: 'sheet-bend',
    name: 'Sheet Bend',
    description: 'Used to join two ropes of unequal sizes. More secure than a square knot for this purpose.',
    difficulty: 'intermediate',
    useCases: [
      'Joining two ropes of different diameters or materials',
      'Attaching a fishing line to a leader',
      'Extending rope when you need additional length',
      'Securing a sheet to the clew of a sail'
    ],
    steps: [
      {
        description: 'Form a bight in the thicker rope.',
        imagePosition: '0%',
      },
      {
        description: 'Pass the working end of the thinner rope up through the bight.',
        imagePosition: '25%',
      },
      {
        description: 'Wrap the working end around behind the bight.',
        imagePosition: '50%',
      },
      {
        description: 'Tuck the working end under itself, in front of the bight.',
        imagePosition: '75%',
      }
    ]
  }
];
