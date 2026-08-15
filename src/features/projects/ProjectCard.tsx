import React from 'react';
import type { Project } from '../../core/types/project';
import { useI18n } from '../../core/i18n';
import { Card } from '../../shared/ui/Card';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';
import { GithubIcon } from '../../shared/ui/Icons';
import { ExternalLink, BookOpen, Layers } from 'lucide-react';
import './Projects.css';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  const { t } = useI18n();

  return (
    <Card variant="glass" className="project-card animate-fade-in">
      <div className="project-card-header">
        <div className="project-category-row">
          <Badge variant="accent" size="sm">
            {project.category.toUpperCase()}
          </Badge>
          {project.featured && (
            <Badge variant="emerald" size="sm" pulse>
              Featured Architecture
            </Badge>
          )}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
      </div>

      <div className="project-architecture-badge">
        <Layers size={14} className="arch-icon" />
        <span className="arch-text">{project.architecturePattern}</span>
      </div>

      {/* Real-world Metrics Highlights */}
      <div className="project-metrics-grid">
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="project-metric-pill">
            <span className="metric-val text-gradient-cyan">{metric.value}</span>
            <span className="metric-lbl">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack Tags */}
      <div className="project-tech-list">
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className="tech-tag more-tag">+{project.tags.length - 5}</span>
        )}
      </div>

      {/* Card Actions */}
      <div className="project-card-footer">
        <Button
          variant="primary"
          size="sm"
          icon={<BookOpen size={14} />}
          onClick={() => onOpenCaseStudy(project)}
        >
          {t.projects.viewCaseStudy}
        </Button>

        <div className="project-external-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn"
              title="Código no GitHub"
              aria-label="Código no GitHub"
            >
              <GithubIcon size={17} />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn"
              title="Ver Projeto Online"
              aria-label="Ver Projeto Online"
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
