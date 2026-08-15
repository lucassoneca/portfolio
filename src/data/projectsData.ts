import type { Project } from '../core/types/project';

export const projectsData: Project[] = [
  {
    id: 'forumhub',
    title: 'ForumHub — API REST de Fórum & Autenticação JWT',
    tagline: 'API RESTful completa com Spring Boot, Spring Security e autenticação JWT para fórum de desenvolvedores.',
    description:
      'API robusta construída no programa Oracle Next Education (ONE). Implementa CRUD completo de tópicos e respostas, validação de regras de negócio, autenticação stateless via tokens JWT, documentação de rotas e persistência com Spring Data JPA.',
    category: 'backend',
    featured: true,
    priority: 1,
    image: '/images/forumhub.jpg',
    githubUrl: 'https://github.com/lucassoneca/ForumHub-One',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Hibernate', 'REST API'],
    techStack: ['Java 17+', 'Spring Boot 3', 'Spring Security', 'Auth0 JWT', 'PostgreSQL / MySQL', 'Flyway Migrations', 'Maven'],
    architecturePattern: 'Layered MVC & Domain-Driven Validation',
    metrics: [
      { label: 'Autenticação', value: 'Stateless JWT' },
      { label: 'Segurança', value: 'Role-Based Access' },
    ],
    caseStudy: {
      overview:
        'O ForumHub foi desenvolvido para fornecer a camada de serviços e dados de um fórum de programação. O sistema permite cadastrar, listar, atualizar e encerrar tópicos e respostas de forma segura e padronizada.',
      problem:
        'Criar uma API segura, com controle de acesso restrito a usuários autenticados, validação estrita de dados de entrada e isolamento de regras de negócio para evitar tópicos duplicados ou acessos não autorizados.',
      solution:
        'Adoção do ecossistema Spring Boot com Spring Security e tokens JWT. Foi criada uma estrutura em camadas (Controller, Service, Repository, DTOs) com ControllerAdvice global para padronização de respostas de erro HTTP (400, 403, 404).',
      architecture: {
        pattern: 'Layered Architecture (Controller -> Service -> Repository -> Database)',
        description: 'Desacoplamento estrito entre contratos de DTOs e entidades do banco de dados relacional.',
        tradeOffs: [
          'Autenticação Stateless com JWT garante alta escalabilidade horizontal.',
          'Validação via Bean Validation (@Valid) impede payloads inválidos na camada de borda.',
        ],
        keyComponents: ['TopicController', 'SecurityFilter', 'TokenService', 'TopicRepository', 'GlobalExceptionHandler'],
      },
      challenges: [
        'Configuração de filtros de segurança personalizados no Spring Security 3 com rotas públicas (login) e rotas protegidas.',
        'Tratamento de paginação e ordenação de tópicos utilizando Pageable do Spring Data.',
      ],
      metrics: [
        { label: 'Status HTTP', value: '100% Padronizado', description: 'Códigos 200, 201, 204, 400, 403 e 404 em conformidade' },
        { label: 'Segurança', value: 'JWT HMAC256', description: 'Tokens criptografados com tempo de expiração seguro' },
      ],
      lessonsLearned: [
        'Estruturação de DTOs como records imutáveis em Java.',
        'Utilização de migrations com Flyway para controle de versão do esquema do banco de dados.',
      ],
      codeSnippets: [
        {
          title: 'TopicController.java — Rota de Criação com Validação',
          language: 'java',
          code: `@PostMapping\n@Transactional\npublic ResponseEntity<TopicDetailDto> create(\n    @RequestBody @Valid CreateTopicDto data,\n    UriComponentsBuilder uriBuilder\n) {\n    var topic = topicService.register(data);\n    var uri = uriBuilder.path("/topics/{id}").buildAndExpand(topic.getId()).toUri();\n    return ResponseEntity.created(uri).body(new TopicDetailDto(topic));\n}`,
          explanation: 'Recebe o payload validado, processa a regra de negócio no service e retorna HTTP 201 Created com header Location.',
        },
      ],
    },
  },
  {
    id: 'literalura',
    title: 'LiterAlura — Catálogo de Livros & Consumo de API Externa',
    tagline: 'Catálogo interativo com consumo da API Gutendex, persistência em PostgreSQL e estatísticas dinâmicas.',
    description:
      'Aplicação backend desenvolvida em Java e Spring Boot que busca livros na biblioteca pública Gutendex, faz a desserialização de JSON com Jackson, persiste autores e obras no banco de dados e gera estatísticas filtradas por idioma e ano.',
    category: 'backend',
    featured: true,
    priority: 2,
    image: '/images/literalura.jpg',
    githubUrl: 'https://github.com/lucassoneca/literalura',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA / Hibernate', 'Jackson JSON', 'HttpClient'],
    techStack: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Jackson Core', 'Gutendex REST API'],
    architecturePattern: 'Service-Oriented Data Ingestion & Persistence',
    metrics: [
      { label: 'Integração', value: 'Gutendex API' },
      { label: 'Persistência', value: 'PostgreSQL Relacional' },
    ],
    caseStudy: {
      overview:
        'LiterAlura é um sistema para pesquisar livros e autores, salvando os resultados em banco relacional para consultas offline e relatórios estatísticos sobre literatura mundial.',
      problem:
        'A API Gutendex retorna dados em estruturas aninhadas e em múltiplos idiomas. O desafio era desserializar esses dados eficientemente e evitar duplicação de autores e livros no banco de dados.',
      solution:
        'Implementação de DTOs mapeados com anotações `@JsonAlias` e `@JsonIgnoreProperties`, associando relações `@ManyToMany` e `@OneToMany` entre Autores e Livros via JPA.',
      architecture: {
        pattern: 'Data Ingestion & Repository Pattern',
        description: 'Serviço de consumo HTTP assíncrono desacoplado da lógica de persistência e menus interativos.',
        tradeOffs: [
          'Armazenamento local permite buscas instantâneas e agregação de dados sem sobrecarregar a API pública.',
        ],
        keyComponents: ['ApiService', 'DataConverter', 'BookRepository', 'AuthorRepository', 'ConsoleMenu'],
      },
      challenges: [
        'Mapeamento bidirecional consistente entre autores e seus múltiplos livros publicados.',
        'Consultas derivadas no Spring Data para filtrar autores vivos em determinado ano.',
      ],
      metrics: [
        { label: 'Relatórios', value: '100% Dinâmico', description: 'Filtros por idioma (EN, PT, ES, FR) e períodos históricos' },
        { label: 'Serialização', value: 'Jackson Mapper', description: 'Desserialização segura com proteção contra campos nulos' },
      ],
      lessonsLearned: [
        'Boas práticas no consumo de APIs RESTful com Java HttpClient nativo.',
        'Mapeamento de relacionamentos no Hibernate sem queries N+1.',
      ],
    },
  },
  {
    id: 'chatbot',
    title: 'Chatbot — Assistente Interativo em TypeScript',
    tagline: 'Chatbot com processamento de mensagens, tipagem estrita em TypeScript e interface moderna.',
    description:
      'Aplicação de chatbot desenvolvida em TypeScript e Node.js com arquitetura orientada a handlers de mensagens, controle de fluxo e interface web responsiva.',
    category: 'fullstack',
    featured: true,
    priority: 3,
    image: '/images/chatbot.jpg',
    githubUrl: 'https://github.com/lucassoneca/chatbot',
    tags: ['TypeScript', 'Node.js', 'WebSockets / REST', 'UI Responsiva', 'Chat Interface'],
    techStack: ['TypeScript', 'Node.js', 'Express', 'HTML5 Semântico', 'CSS3 Moderno'],
    architecturePattern: 'Event-Driven Message Dispatcher',
    metrics: [
      { label: 'Tipagem', value: '100% Strict TS' },
      { label: 'Interface', value: 'Tempo Real' },
    ],
    caseStudy: {
      overview:
        'Um sistema de mensagens interativo onde usuários podem enviar comandos e receber respostas contextuais em tempo real com feedback visual e alta performance.',
      problem:
        'Construir um fluxo de conversa fluido com tratamento de múltiplos estados e respostas dinâmicas sem bloqueio de I/O.',
      solution:
        'Estruturação em TypeScript com separação entre a camada de apresentação visual e a lógica de processamento de comandos.',
      architecture: {
        pattern: 'Command / Handler Pattern',
        description: 'Mapeamento dinâmico de comandos para handlers específicos facilitando novas regras de resposta.',
        tradeOffs: ['Arquitetura modular em TypeScript permite acoplar inteligência artificial facilmente.'],
        keyComponents: ['MessageDispatcher', 'CommandHandler', 'ChatInterface', 'ThemeController'],
      },
      challenges: ['Gerenciamento de estado da sessão e scroll automático do chat sem repuxos visuais.'],
      metrics: [
        { label: 'Latência', value: '< 10ms', description: 'Tempo de processamento de mensagens local' },
      ],
      lessonsLearned: ['Benefícios de tipos genéricos e interfaces no design de sistemas de mensageria.'],
    },
  },
  {
    id: 'banco-konoha',
    title: 'Banco Konoha — Simulador Bancário & POO em Java',
    tagline: 'Simulador de contas correntes, poupanças e transações financeiras aplicando Programação Orientada a Objetos.',
    description:
      'Sistema de gerenciamento de contas bancárias em Java explorando conceitos fundamentais de POO: herança, polimorfismo, encapsulamento e interfaces para execução segura de transferências, saques com limite e depósitos.',
    category: 'backend',
    featured: true,
    priority: 4,
    image: '/images/banco_konoha.jpg',
    githubUrl: 'https://github.com/lucassoneca/banco-konoha',
    tags: ['Java', 'POO Avançada', 'Estruturas de Dados', 'JUnit', 'Regras de Negócio'],
    techStack: ['Java Core', 'Collections Framework', 'JUnit 5', 'Design Patterns'],
    architecturePattern: 'Domain Model & Clean OOP',
    metrics: [
      { label: 'POO', value: 'Polimorfismo & Herança' },
      { label: 'Testes', value: 'JUnit 5' },
    ],
    caseStudy: {
      overview:
        'Simulação de um ecossistema bancário completo que implementa operações financeiras com controle de saldo, extrato e taxas de transação.',
      problem:
        'Modelar diferentes tipos de contas (Conta Corrente, Conta Poupança) com regras de saque e rendimento distintas mantendo um contrato unificado.',
      solution:
        'Criação de classe abstrata `Conta` com métodos polimórficos (`sacar`, `depositar`, `transferir`) e exceções customizadas para saldo insuficiente.',
      architecture: {
        pattern: 'Object-Oriented Domain Model',
        description: 'Hierarquia de classes com encapsulamento de saldo e métodos atômicos de transferência.',
        tradeOffs: ['Modelo puro em memória de alta performance para validação de regras de negócio.'],
        keyComponents: ['Conta', 'ContaCorrente', 'ContaPoupanca', 'Cliente', 'Transacao'],
      },
      challenges: ['Garantir que transferências só sejam efetivadas se o débito na conta de origem for aprovado com sucesso.'],
      metrics: [
        { label: 'Confiabilidade', value: '100% Validado', description: 'Testes unitários cobrindo cenários com e sem saldo' },
      ],
      lessonsLearned: ['Importância de encapsular campos de saldo e evitar setters diretos em objetos de negócio.'],
    },
  },
  {
    id: 'buscacep',
    title: 'BuscaCEP — Consulta & Validação Postal',
    tagline: 'Aplicação em Java para consulta assíncrona de endereços brasileiros via API ViaCEP com exportação de relatórios.',
    description:
      'Utilitário backend em Java que recebe CEPs, sanitiza a entrada, dispara requisições HTTP para o serviço ViaCEP, faz o parsing da resposta e grava o histórico formatado de endereços.',
    category: 'backend',
    featured: true,
    priority: 5,
    image: '/images/buscacep.jpg',
    githubUrl: 'https://github.com/lucassoneca/BuscaCep',
    tags: ['Java', 'HttpClient', 'Gson', 'ViaCEP API', 'File I/O'],
    techStack: ['Java 17', 'java.net.http', 'Gson', 'ViaCEP REST API'],
    architecturePattern: 'Adapter & Client Integration',
    metrics: [
      { label: 'Serviço', value: 'ViaCEP API' },
      { label: 'Formato', value: 'JSON Serialization' },
    ],
    caseStudy: {
      overview:
        'Ferramenta para automatizar a busca de endereços completos a partir do código postal brasileiro (CEP), gerando arquivos estruturados.',
      problem:
        'Tratar formatos de CEP inconsistentes (com hífen, espaços, menos de 8 dígitos) e gerenciar falhas de rede ou CEPs inexistentes.',
      solution:
        'Criação de sanitizador de strings com regex e classe dedicada para consumo de API HTTP com tratamento robusto de exceções.',
      architecture: {
        pattern: 'Gateway / Adapter Pattern',
        description: 'Isolamento da chamada de rede externa do restante da lógica da aplicação.',
        tradeOffs: ['Uso do HttpClient nativo do Java 11+ sem dependência de bibliotecas externas pesadas.'],
        keyComponents: ['ConsultaCep', 'GeradorDeArquivo', 'EnderecoRecord', 'Main'],
      },
      challenges: ['Parsing de respostas de erro da API quando o CEP é válido em formato mas inexistente na base postal.'],
      metrics: [
        { label: 'Tempo Médio', value: '< 80ms', description: 'Tempo de resposta de consulta e persistência em arquivo' },
      ],
      lessonsLearned: ['Uso de Records em Java para representação de dados de resposta imutáveis.'],
    },
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages & Páginas de Apresentação Modernas',
    tagline: 'Desenvolvimento de sites modernos, responsivos, com alto impacto visual, dark mode e foco em conversão.',
    description:
      'Criação de landing pages e páginas de apresentação utilizando as tecnologias mais modernas do mercado (React, TypeScript, Design Tokens e animações fluidas a 60fps).',
    category: 'frontend',
    featured: true,
    priority: 6,
    image: '/images/landing_pages.jpg',
    githubUrl: 'https://github.com/lucassoneca',
    tags: ['React', 'TypeScript', 'CSS Tokens', 'Landing Pages', 'A11y', 'Design Moderno'],
    techStack: ['React 19', 'TypeScript', 'Vanilla CSS Tokens', 'HTML5 Semântico', 'Vite'],
    architecturePattern: 'Design Tokens & Component-Driven UI',
    metrics: [
      { label: 'Performance', value: '100 / 100' },
      { label: 'Design', value: 'Multi-Tema & 60fps' },
    ],
    caseStudy: {
      overview:
        'Desenvolvimento de websites e páginas de apresentação institucionais com estética refinada, suporte a múltiplos temas (Dark Obsidian, Cyber Matrix, Clean Light) e internacionalização.',
      problem:
        'Muitos sites no mercado utilizam frameworks pesados que deixam o carregamento lento e a identidade genérica.',
      solution:
        'Construção sobre um Design System próprio em Vanilla CSS Tokens, com micro-interações elegantes e renderização ultrarrápida.',
      architecture: {
        pattern: 'Atomic Design & Design Tokens',
        description: 'Variáveis CSS estruturadas para espaçamento, tipografia, cores e efeitos de profundidade.',
        tradeOffs: ['Zero runtime de CSS-in-JS, garantindo máxima performance e SEO otimizado.'],
        keyComponents: ['ThemeProvider', 'Navbar', 'HeroSection', 'ProjectsCarousel', 'ContactSection'],
      },
      challenges: ['Criar efeitos visuais de alto padrão (glassmorphism e partículas) mantendo 60fps em dispositivos móveis.'],
      metrics: [
        { label: 'Responsividade', value: 'Mobile First', description: 'Adaptação perfeita de telas 320px até 4K' },
      ],
      lessonsLearned: ['Controle refinado de acessibilidade (WCAG 2.1 AA) e estruturação semântica.'],
    },
  },
];
