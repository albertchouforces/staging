export interface Knot {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCases: string[];
  steps: {
    description: string;
    imagePosition: string;
  }[];
}

export interface Scenario {
  id: string;
  knot: string;
  use: string;
  scenario: string;
  why: string;
  image?: string; // Optional image URL
}
