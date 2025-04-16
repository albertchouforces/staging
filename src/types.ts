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
