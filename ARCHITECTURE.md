# 🏛️ Architecture & Engineering Guidelines — Developer Portfolio
**Desenvolvedor:** Lucas Bezerra da Cruz  
**Formação:** Graduação em Análise e Desenvolvimento de Sistemas (ADS)  
**Perfil:** Desenvolvedor Backend  
**GitHub:** https://github.com/lucassoneca  
**LinkedIn:** https://www.linkedin.com/in/lucasbezerradev/  

Este documento descreve detalhadamente a arquitetura de software, padrões de design, convenções e decisões técnicas implementadas neste portfólio.

---

## 🎯 1. Princípios Arquiteturais Fundamentais

O projeto adota uma variação pragmática do **Feature-Sliced Design (FSD)** e **Clean Architecture**, dividindo o código em camadas com responsabilidades bem delimitadas e baixo acoplamento:

```
src/
├── core/             # Núcleo compartilhado, invariantes e tipos fundamentais
│   ├── config/       # Constantes e configurações globais
│   ├── i18n/         # Dicionários e Context Provider de internacionalização (PT/EN)
│   ├── theme/        # Context Provider e tokens de múltiplos temas
│   └── types/        # Tipagens estritas (Project, Architecture, Skill, Profile)
│
├── shared/           # Blocos de construção genéricos e agnósticos de domínio
│   ├── ui/           # Atomic Design Components (Button, Card, Badge, Modal, SectionHeader)
│   ├── components/   # Componentes transversais (Navbar, Footer, CyberBackground Canvas)
│   └── hooks/        # Hooks reutilizáveis (useScrollSpy, etc.)
│
├── features/         # Módulos de negócio independentes com alta coesão
│   ├── hero/                 # Apresentação, métricas de formação e CTAs
│   ├── architecture-viewer/  # Visualizador interativo de topologia System Design
│   ├── projects/             # Showcase com filtros e modais de Estudo de Caso
│   ├── skills/               # Matriz de competências técnicas com proficiências
│   ├── experience/           # Formação acadêmica (ADS) e trajetória técnica
│   ├── terminal/             # Terminal CLI interativo para desenvolvedores (Unix-like)
│   └── contact/              # Central de contato, validação e formulário reativo
│
├── data/             # Camada de abstração de dados tipados (Data Repository)
│   ├── profileData.ts
│   ├── projectsData.ts
│   ├── skillsData.ts
│   ├── architectureData.ts
│   └── experienceData.ts
│
└── styles/           # Sistema de Design em Vanilla CSS
    ├── variables.css # Design tokens (Cores, Tipografia, Sombras, Glassmorphism)
    ├── reset.css     # Normalização cross-browser e scrollbars customizadas
    ├── animations.css# Keyframes fluidos de micro-interações
    └── index.css     # Ponto de entrada CSS unificado
```

---

## 💎 2. Padrões de Projeto & SOLID no Frontend

### 2.1 Single Responsibility Principle (SRP)
- Cada componente React possui uma única responsabilidade visual ou comportamental.
- Regras de negócio e transformações de estado são encapsuladas em hooks e funções puras dedicadas (ex: `commandParser.tsx`, `ThemeContext.tsx`, `useI18n`).

### 2.2 Dependency Inversion & Repository Pattern
- A camada de UI consome dados através de contratos de interfaces estritas (`Project`, `SystemArchitecture`, `SkillGroup`).
- Os dados em `src/data/` funcionam como repositórios desacoplados que facilitam o cadastro e manutenção de novos projetos.

### 2.3 Factory & Strategy Patterns
- **Factory**: Gerenciamento dinâmico de temas (`THEMES`) e tradução (`dictionaries[language]`).
- **Strategy**: O parser de comandos do terminal (`commandParser.tsx`) resolve estratégias de execução com base no comando digitado sem poluir a renderização.

---

## 🎨 3. Design System & Tokens (CSS Variables)

- **Zero Heavy Runtime CSS-in-JS**: O design system é construído sobre CSS Variables nativas, garantindo **zero overhead de JavaScript no tempo de execução**.
- **Glassmorphism & Neomorfismo Sutil**: Efeitos de `backdrop-filter: blur()`, bordas translúcidas e iluminação neon cibernética adaptada para 4 temas:
  1. `dark-obsidian` (Padrão corporativo escuro com toques Indigo)
  2. `cyber-matrix` (Estilo terminal hacker com neon verde esmeralda)
  3. `midnight-neon` (Azul profundo com ciano de alta visibilidade)
  4. `clean-light` (Modo claro minimalista de alto contraste)

---

## 🛠️ 4. Como Cadastrar Seus Novos Projetos

Quando você concluir um novo projeto que queira exibir:
1. Abra o arquivo [projectsData.ts](file:///C:/Users/Lucas/.gemini/antigravity-ide/scratch/portfolio-dev/src/data/projectsData.ts).
2. Adicione o objeto do seu projeto seguindo a interface `Project`:
```typescript
{
  id: 'meu-projeto-backend',
  title: 'API de Gerenciamento Financeiro',
  tagline: 'API RESTful construída com Node.js, TypeScript, PostgreSQL e Clean Architecture',
  description: 'Sistema backend com autenticação JWT, controle transacional e testes automatizados.',
  category: 'backend',
  featured: true,
  priority: 1,
  tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Clean Architecture', 'Jest'],
  techStack: ['Node.js', 'TypeScript', 'Prisma / SQL', 'Docker', 'Jest'],
  architecturePattern: 'Clean Architecture (Ports & Adapters)',
  githubUrl: 'https://github.com/lucassoneca/meu-repo',
  metrics: [
    { label: 'Cobertura de Testes', value: '95%' },
    { label: 'Tempo de Resposta', value: '< 20ms' },
  ],
  caseStudy: {
    overview: 'Visão geral do projeto...',
    problem: 'O desafio técnico resolvido...',
    solution: 'A arquitetura adotada...',
    architecture: {
      pattern: 'Clean Architecture',
      description: 'Isolamento de regras de negócio dos controladores e banco...',
      tradeOffs: ['Separação em camadas para máxima testabilidade.'],
      keyComponents: ['Controllers', 'Use Cases', 'Repositories', 'Entities'],
    },
    challenges: ['Implementação de autenticação JWT segura.'],
    metrics: [{ label: 'Performance', value: '100% testado', description: 'Testes de integração' }],
    lessonsLearned: ['Benefícios do desacoplamento de camadas.'],
  },
}
```
3. O portfólio irá gerar automaticamente os cards interativos, filtros por categoria e os modais de estudo de caso!
