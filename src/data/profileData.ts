import type { Profile } from '../core/types/profile';

/**
 * Data de nascimento de Lucas Bezerra da Cruz (01/05/2003).
 * A idade é calculada dinamicamente com base na data atual do sistema.
 */
export const BIRTH_DATE = '2003-05-01';

export const calculateAge = (birthDateString: string): number => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const currentAge = calculateAge(BIRTH_DATE);

export const profileData: Profile = {
  name: 'Lucas Bezerra da Cruz',
  birthDate: BIRTH_DATE,
  age: currentAge,
  title: 'Desenvolvedor Backend & Criação de Sites Modernos',
  headline: `${currentAge} anos • Análise e Desenvolvimento de Sistemas (ADS) • Backend, APIs RESTful, Landing Pages & Sites Modernos`,
  location: 'Brasil',
  availableForHire: false,
  statusText: 'Desenvolvedor Backend & Criação de Sites',
  yearsOfExperience: 2,
  avatarUrl: '',
  bio: [
    `Olá! Me chamo Lucas, tenho ${currentAge} anos e sou formado em Análise e Desenvolvimento de Sistemas (ADS). Minha atuação é focada em desenvolvimento backend, APIs RESTful estruturadas, regras de negócio e bancos de dados.`,
    'Além do ecossistema backend com Java, Spring Boot, Node.js e TypeScript, também crio sites modernos, landing pages de alta conversão e páginas de apresentação responsivas com design refinado.',
    'Comprometido com a escrita de código limpo, aplicação de princípios SOLID, Clean Code e padrões de desenvolvimento consolidados no mercado.',
  ],
  interests: [
    'Desenvolvimento Backend',
    'APIs RESTful & Spring Boot',
    'Criação de Sites & Landing Pages',
    'Modelagem SQL & PostgreSQL',
    'TypeScript & Node.js',
    'Clean Code & SOLID',
  ],
  stats: [
    {
      id: 'age',
      value: `${currentAge}`,
      label: 'Idade',
      sublabel: 'Anos',
    },
    {
      id: 'grad',
      value: 'ADS',
      label: 'Graduação Concluída',
      sublabel: 'Análise e Dev. de Sistemas',
    },
    {
      id: 'focus',
      value: 'Backend',
      label: 'Foco Principal',
      sublabel: 'APIs, Regras & Bancos',
    },
    {
      id: 'web',
      value: 'Web & UI',
      label: 'Criação de Sites',
      sublabel: 'Landing Pages Modernas',
    },
  ],
  socialLinks: [
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/lucassoneca',
      username: 'lucassoneca',
      iconName: 'Github',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lucasbezerradev/',
      username: 'lucasbezerradev',
      iconName: 'Linkedin',
    },
    {
      platform: 'email',
      label: 'E-mail',
      url: 'mailto:lucasbezerracrz@gmail.com',
      username: 'lucasbezerracrz@gmail.com',
      iconName: 'Mail',
    },
  ],
};
