export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  period: {
    start: string;
    end: string | 'Present';
  };
  summary: string;
  achievements: string[];
  technologies: string[];
  architectureHighlights: string[];
}
