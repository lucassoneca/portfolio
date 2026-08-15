import React, { useState } from 'react';
import type { Project } from '../../core/types/project';
import { useI18n } from '../../core/i18n';
import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { GithubIcon } from '../../shared/ui/Icons';
import {
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Copy,
  Check,
  TrendingUp,
  Code2,
} from 'lucide-react';
import './Projects.css';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { t } = useI18n();
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const caseStudy = project.caseStudy;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={project.architecturePattern}
      maxWidth="960px"
    >
      <div className="case-study-content">
        {/* Project Image Banner */}
        {project.image && (
          <div className="modal-banner-wrapper">
            <img
              src={project.image}
              alt={project.title}
              className="modal-banner-image"
            />
            <div className="modal-banner-overlay">
              <Badge variant="cyan" size="md">
                {project.category.toUpperCase()}
              </Badge>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-github-btn"
                >
                  <Button variant="primary" size="sm" icon={<GithubIcon size={16} />}>
                    <span>Ver Código no GitHub</span>
                    <ExternalLink size={14} />
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Quick Links & Tags */}
        <div className="case-study-top-bar">
          <div className="case-study-tech-tags">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="case-study-actions">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={<GithubIcon size={15} />}>
                  GitHub
                </Button>
              </a>
            )}
            {project.liveDemoUrl && (
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink size={15} />}>
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* O que o projeto faz (Overview) */}
        <div className="case-study-section">
          <h4 className="case-section-title">
            <Code2 size={18} className="title-icon" />
            O que o Projeto Faz
          </h4>
          <p className="case-text">{caseStudy.overview}</p>
        </div>

        {/* Metrics Grid */}
        <div className="case-study-metrics-grid">
          {caseStudy.metrics.map((metric, i) => (
            <div key={i} className="metric-box glass-panel">
              <span className="metric-box-value text-gradient">{metric.value}</span>
              <span className="metric-box-label">{metric.label}</span>
              <span className="metric-box-desc">{metric.description}</span>
            </div>
          ))}
        </div>

        {/* Problem & Solution */}
        <div className="case-study-section">
          <h4 className="case-section-title">
            <Layers size={18} className="title-icon" />
            {t.projects.modal.problem}
          </h4>
          <div className="case-problem-box">{caseStudy.problem}</div>
        </div>

        <div className="case-study-section">
          <h4 className="case-section-title">
            <Cpu size={18} className="title-icon" />
            {t.projects.modal.solution}
          </h4>
          <p className="case-text">{caseStudy.solution}</p>
        </div>

        {/* Architecture Details & Trade-offs */}
        <div className="case-study-section">
          <h4 className="case-section-title">
            <TrendingUp size={18} className="title-icon" />
            {t.projects.modal.architectureDeepDive}
          </h4>
          <p className="case-text">{caseStudy.architecture.description}</p>

          <div className="tradeoffs-container">
            <div className="tradeoff-subheading">{t.projects.modal.tradeOffs}:</div>
            <ul className="case-bullet-list">
              {caseStudy.architecture.tradeOffs.map((tradeoff, i) => (
                <li key={i}>
                  <AlertTriangle size={15} className="bullet-icon-warning" />
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Code Snippet if present */}
        {caseStudy.codeSnippets && caseStudy.codeSnippets.length > 0 && (
          <div className="case-study-section">
            <h4 className="case-section-title">
              <Code2 size={18} className="title-icon" />
              {t.projects.modal.codeHighlight}
            </h4>
            {caseStudy.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="code-snippet-card">
                <div className="code-snippet-header">
                  <span className="snippet-title">{snippet.title}</span>
                  <button
                    className="copy-snippet-btn"
                    onClick={() => handleCopyCode(snippet.code)}
                    aria-label="Copiar código"
                  >
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="code-block">
                  <code>{snippet.code}</code>
                </pre>
                <div className="snippet-explanation">
                  <strong>Padrão Aplicado:</strong> {snippet.explanation}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Lessons Learned */}
        <div className="case-study-section">
          <h4 className="case-section-title">
            <Lightbulb size={18} className="title-icon" />
            {t.projects.modal.keyLessons}
          </h4>
          <ul className="case-bullet-list">
            {caseStudy.lessonsLearned.map((lesson, i) => (
              <li key={i}>
                <CheckCircle2 size={16} className="bullet-icon-check" />
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer with Prominent GitHub Button and Close */}
        <div className="case-study-footer">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github-link"
            >
              <Button variant="primary" size="md" icon={<GithubIcon size={16} />}>
                <span>Acessar Repositório no GitHub</span>
                <ExternalLink size={14} />
              </Button>
            </a>
          )}
          <Button variant="secondary" size="md" onClick={onClose}>
            {t.projects.modal.close}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
