export type Language = 'pt' | 'en';

export interface I18nDictionary {
  nav: {
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
    terminal: string;
    hireMe: string;
  };
  hero: {
    statusAvailable: string;
    statusBusy: string;
    greeting: string;
    headline: string;
    subheadline: string;
    viewProjects: string;
    aboutMe: string;
    openTerminal: string;
    stats: {
      experience: string;
      projects: string;
      uptime: string;
      contributions: string;
    };
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    interests: string;
    lifestyle: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      fullstack: string;
      backend: string;
      frontend: string;
      cloud: string;
      architecture: string;
    };
    searchPlaceholder: string;
    viewCaseStudy: string;
    viewCode: string;
    viewLive: string;
    metricsLabel: string;
    architecturePattern: string;
    modal: {
      caseStudyTitle: string;
      problem: string;
      solution: string;
      architectureDeepDive: string;
      tradeOffs: string;
      challenges: string;
      metricsAchieved: string;
      keyLessons: string;
      codeHighlight: string;
      close: string;
    };
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    yearsOfExperience: string;
    proficiency: string;
    domains: {
      backend: string;
      frontend: string;
      cloud_devops: string;
      database_cache: string;
      architecture_testing: string;
    };
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    achievements: string;
    technologies: string;
    architectureDecisions: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      successTitle: string;
      successMessage: string;
    };
    directLinks: string;
    copyEmail: string;
    emailCopied: string;
    availableBadge: string;
  };
  terminal: {
    title: string;
    subtitle: string;
    welcomeMsg: string;
    typeHelp: string;
    placeholder: string;
    minimize: string;
    maximize: string;
    close: string;
  };
  footer: {
    tagline: string;
    designedWith: string;
    architectureNotes: string;
    rights: string;
  };
}
