
export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'Conceptual Design' | 'Fabrication' | 'Logistics';
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  image: string;
  description: string;
  wireframe: string;
}

export type StepType = 'Dream' | 'Design' | 'Define';

export interface Step {
  id: StepType;
  title: string;
  description: string;
}
