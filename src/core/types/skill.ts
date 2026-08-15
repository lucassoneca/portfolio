export type SkillDomain = 'backend' | 'frontend' | 'cloud_devops' | 'database_cache' | 'architecture_testing';

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  yearsOfExp: number;
  highlight?: boolean;
  category: SkillDomain;
  icon?: string;
  tags: string[];
  description: string;
}

export interface SkillGroup {
  id: SkillDomain;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}
