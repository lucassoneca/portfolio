export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'whatsapp' | 'twitter' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  username: string;
  iconName: string;
}

export interface ProfileStat {
  id: string;
  value: string | number;
  label: string;
  sublabel?: string;
}

export interface Profile {
  name: string;
  birthDate: string; // ISO format 'YYYY-MM-DD'
  age: number;
  title: string;
  headline: string;
  location: string;
  availableForHire: boolean;
  statusText: string;
  yearsOfExperience: number;
  avatarUrl: string;
  bio: string[];
  interests: string[];
  stats: ProfileStat[];
  socialLinks: SocialLink[];
  resumeUrl?: string;
}
