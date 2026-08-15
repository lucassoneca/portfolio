export type ProjectCategory = 'all' | 'fullstack' | 'backend' | 'frontend' | 'cloud' | 'architecture';

export interface ArchitectureDetail {
  pattern: string;
  description: string;
  tradeOffs: string[];
  keyComponents: string[];
}

export interface MetricHighlight {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  architecture: ArchitectureDetail;
  challenges: string[];
  metrics: MetricHighlight[];
  lessonsLearned: string[];
  codeSnippets?: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  priority: number;
  tags: string[];
  techStack: string[];
  architecturePattern: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  docsUrl?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  caseStudy: CaseStudy;
  image?: string;
}
