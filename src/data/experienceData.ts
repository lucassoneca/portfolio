import type { ExperienceItem } from '../core/types/experience';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-ads',
    role: 'Graduação em Análise e Desenvolvimento de Sistemas',
    company: 'Ensino Superior / Faculdade de Tecnologia',
    companyUrl: 'https://example.com',
    location: 'Brasil',
    type: 'Full-time',
    period: {
      start: '2022',
      end: '2024 (Concluído)',
    },
    summary:
      'Formação superior com ênfase em engenharia de software, modelagem de banco de dados relacional (SQL), estruturas de dados, lógica de programação e desenvolvimento de sistemas corporativos.',
    achievements: [
      'Conclusão da graduação com foco e especialização em desenvolvimento backend e arquitetura de software.',
      'Desenvolvimento de projetos práticos acadêmicos aplicando padrões de projeto (Design Patterns), orientação a objetos e modelagem de dados.',
      'Estudo aprofundado de arquiteturas limpas (Clean Architecture, Hexagonal Architecture) e princípios SOLID para criação de APIs resilientes.',
    ],
    technologies: ['TypeScript', 'Node.js', 'Java / Spring', 'PostgreSQL', 'MySQL', 'Git & GitHub', 'RESTful APIs', 'Docker'],
    architectureHighlights: [
      'Modelagem e Normalização de Bancos Relacionais (1FN, 2FN, 3FN)',
      'Adoção de Princípios SOLID e Clean Code',
      'Estruturação em Camadas e Inversão de Dependência (IoC)',
    ],
  },
  {
    id: 'exp-practical',
    role: 'Desenvolvimento Backend & Estudos Práticos de Arquitetura',
    company: 'Projetos e Capacitação Contínua',
    companyUrl: 'https://github.com',
    location: 'Remoto',
    type: 'Full-time',
    period: {
      start: '2024',
      end: 'Present',
    },
    summary:
      'Aprofundamento diário em desenvolvimento backend moderno, criação de contratos de API RESTful, conteinerização com Docker e exploração de microsserviços.',
    achievements: [
      'Construção de ecossistema de estudos focados nas tecnologias e padrões mais valorizados no mercado corporativo.',
      'Prática contínua de versionamento profissional de código com Git Flow, commits semânticos e documentação de engenharia.',
      'Desenvolvimento deste próprio portfólio de engenharia aplicando Feature-Sliced Design, TypeScript estrito e tokens modulares.',
    ],
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Clean Architecture', 'REST APIs'],
    architectureHighlights: [
      'Design de APIs RESTful padronizadas com DTOs e validação de contratos',
      'Testes unitários e de integração com foco em cobertura de regras de negócio',
    ],
  },
];
