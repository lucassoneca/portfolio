import React from 'react';
import { useI18n } from '../../core/i18n';
import { profileData } from '../../data/profileData';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Card } from '../../shared/ui/Card';
import { Badge } from '../../shared/ui/Badge';
import { GithubIcon, LinkedinIcon } from '../../shared/ui/Icons';
import {
  User,
  GraduationCap,
  Sparkles,
  Code2,
  Coffee,
  Layout,
  Server,
  Database,
  ExternalLink,
} from 'lucide-react';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <SectionHeader
          badge={t.about.badge}
          badgeIcon={<User size={14} />}
          title={t.about.title}
          subtitle={`Conheça um pouco mais sobre minha jornada de ${profileData.age} anos, formação em ADS, atuação em backend e desenvolvimento de páginas modernas.`}
        />

        <div className="about-grid-wrapper">
          {/* Left: Interactive Developer Card / Code Snapshot */}
          <div className="about-media-column">
            <div className="dev-spotlight-card glass-panel-elevated glow-border">
              <div className="spotlight-header">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="spotlight-filename">lucas-bezerra.ts</span>
              </div>

              <div className="spotlight-code-body">
                <pre className="code-editor-text">
{`const engineer = {
  name: "${profileData.name}",
  age: ${profileData.age},
  education: "Graduado em ADS",
  focus: [
    "Backend & APIs RESTful",
    "Sites & Landing Pages Modernas"
  ],
  stack: ["Java", "Spring Boot", "TypeScript", "Node.js", "SQL"],
  methodologies: ["Clean Code", "SOLID", "MVC"],
  github: "github.com/lucassoneca",
  status: "Ready to Build"
};`}
                </pre>
              </div>

              <div className="spotlight-footer">
                <div className="spotlight-author-row">
                  <div className="author-details">
                    <span className="author-name">{profileData.name}</span>
                    <span className="author-role">{profileData.age} anos • {profileData.title}</span>
                  </div>
                  <div className="author-links">
                    <a
                      href={profileData.socialLinks.find((s) => s.platform === 'github')?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotlight-btn"
                      title="Ver GitHub"
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={profileData.socialLinks.find((s) => s.platform === 'linkedin')?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotlight-btn"
                      title="Ver LinkedIn"
                    >
                      <LinkedinIcon size={16} />
                      <span>LinkedIn</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio, Academic Formation & Interests */}
          <div className="about-content-column">
            <Card variant="glass" className="about-bio-card">
              <div className="about-card-badge-row">
                <Badge variant="cyan" size="sm" icon={<GraduationCap size={14} />}>
                  Graduado em ADS
                </Badge>
                <Badge variant="accent" size="sm">
                  {profileData.age} Anos
                </Badge>
                <Badge variant="emerald" size="sm" icon={<Server size={13} />}>
                  Backend & APIs
                </Badge>
                <Badge variant="accent" size="sm" icon={<Layout size={13} />}>
                  Landing Pages Modernas
                </Badge>
              </div>

              <h3 className="about-headline">
                Desenvolvimento de sistemas robustos e criação de sites modernos de alto impacto visual.
              </h3>

              <div className="about-paragraphs">
                {profileData.bio.map((paragraph, idx) => (
                  <p key={idx} className="about-text">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Core Competencies Highlights */}
              <div className="interests-wrapper">
                <h4 className="interests-title">
                  <Sparkles size={16} className="interests-icon" />
                  Especialidades & Foco de Atuação:
                </h4>
                <div className="interests-pills-list">
                  {profileData.interests.map((interest, idx) => (
                    <span key={idx} className="interest-pill">
                      <Code2 size={13} className="pill-icon" />
                      <span>{interest}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Dev Lifestyle & Environment */}
              <div className="dev-lifestyle-grid">
                <div className="lifestyle-box">
                  <Server size={16} className="lifestyle-icon" />
                  <div>
                    <span className="lifestyle-label">Backend Core</span>
                    <span className="lifestyle-value">Java, Spring Boot, Node.js, TS</span>
                  </div>
                </div>

                <div className="lifestyle-box">
                  <Layout size={16} className="lifestyle-icon" />
                  <div>
                    <span className="lifestyle-label">Criação Web</span>
                    <span className="lifestyle-value">Landing Pages & Sites Responsivos</span>
                  </div>
                </div>

                <div className="lifestyle-box">
                  <Database size={16} className="lifestyle-icon" />
                  <div>
                    <span className="lifestyle-label">Bancos de Dados</span>
                    <span className="lifestyle-value">PostgreSQL, MySQL, JPA/Hibernate</span>
                  </div>
                </div>

                <div className="lifestyle-box">
                  <Coffee size={16} className="lifestyle-icon" />
                  <div>
                    <span className="lifestyle-label">Metodologia</span>
                    <span className="lifestyle-value">Clean Code, SOLID & Foco</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
