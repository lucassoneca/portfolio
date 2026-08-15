import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useI18n } from '../../core/i18n';
import { projectsData } from '../../data/projectsData';
import type { Project, ProjectCategory } from '../../core/types/project';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import {
  FolderGit2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { GithubIcon } from '../../shared/ui/Icons';
import './Projects.css';

export const ProjectsSection: React.FC = () => {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t.projects.categories.all },
    { id: 'backend', label: t.projects.categories.backend },
    { id: 'fullstack', label: t.projects.categories.fullstack },
    { id: 'frontend', label: t.projects.categories.frontend },
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      return activeCategory === 'all' || project.category === activeCategory;
    });
  }, [activeCategory]);

  const totalSlides = filteredProjects.length;

  const handleNext = useCallback(() => {
    if (totalSlides > 0) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  }, [totalSlides]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Autoplay timer
  const autoPlayRef = useRef<number | null>(null);

  useEffect(() => {
    if (isAutoPlayActive && totalSlides > 1) {
      autoPlayRef.current = window.setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current !== null) {
        window.clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlayActive, totalSlides, handleNext]);

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  /**
   * Calculates the relative offset from the currentIndex
   * Returns a normalized value like -1 (left), 0 (center), +1 (right), etc.
   */
  const getCardOffset = (index: number) => {
    if (totalSlides <= 1) return 0;
    let diff = index - currentIndex;
    if (diff > totalSlides / 2) {
      diff -= totalSlides;
    } else if (diff < -totalSlides / 2) {
      diff += totalSlides;
    }
    return diff;
  };

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <SectionHeader
          badge={t.projects.badge}
          badgeIcon={<FolderGit2 size={14} />}
          title={t.projects.title}
          subtitle="Navegue pelos meus principais projetos no GitHub com foco no card central e visão panorâmica dos demais repositórios."
        />

        {/* Controls Bar: Category Filters & Nav Arrows */}
        <div className="projects-controls-wrapper">
          <div className="category-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="carousel-nav-buttons">
            <button
              className="carousel-arrow-btn"
              onClick={handlePrev}
              aria-label="Projeto anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="carousel-counter">
              {currentIndex + 1} / {totalSlides}
            </span>
            <button
              className="carousel-arrow-btn"
              onClick={handleNext}
              aria-label="Próximo projeto"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 3D Focus Coverflow Carousel Stage */}
        <div
          className="carousel-stage-viewport"
          onMouseEnter={() => setIsAutoPlayActive(false)}
          onMouseLeave={() => setIsAutoPlayActive(true)}
        >
          <div className="carousel-track">
            {filteredProjects.map((project, idx) => {
              const offset = getCardOffset(idx);
              const isCenter = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Compute CSS class based on position
              let cardStateClass = 'card-hidden';
              if (isCenter) cardStateClass = 'card-center';
              else if (isPrev) cardStateClass = 'card-prev';
              else if (isNext) cardStateClass = 'card-next';

              return (
                <div
                  key={project.id}
                  className={`carousel-card-item ${cardStateClass}`}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrentIndex(idx);
                    }
                  }}
                  style={{
                    display: isVisible ? 'flex' : 'none',
                  }}
                >
                  <div className="compact-project-card glass-panel-elevated">
                    {/* Card Cover Image */}
                    <div
                      className="card-image-wrapper"
                      onClick={(e) => {
                        if (isCenter) {
                          e.stopPropagation();
                          handleOpenCaseStudy(project);
                        }
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="card-cover-img"
                        loading="lazy"
                      />
                      <div className="card-badge-overlay">
                        <Badge variant="cyan" size="sm">
                          {project.category.toUpperCase()}
                        </Badge>
                      </div>
                      {isCenter && (
                        <div className="card-hover-hint">
                          <span>
                            <BookOpen size={14} /> Ver Resumo
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="card-body-content">
                      <div className="card-arch-pill">
                        <Sparkles size={13} className="sparkle-icon" />
                        <span>{project.architecturePattern}</span>
                      </div>

                      <h3 className="card-project-title" title={project.title}>
                        {project.title}
                      </h3>

                      <p className="card-project-tagline">
                        {project.tagline}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="card-tech-pills">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="compact-tech-tag">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="compact-tech-tag more-tag">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="card-footer-row">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<BookOpen size={14} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCaseStudy(project);
                          }}
                        >
                          Resumo
                        </Button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-github-link"
                            onClick={(e) => e.stopPropagation()}
                            title="Acessar no GitHub"
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={<GithubIcon size={15} />}
                              iconPosition="right"
                            >
                              <span>GitHub</span>
                              <ExternalLink size={13} />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Overlay Arrows on Stage */}
          <button
            className="stage-nav-arrow stage-arrow-left"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="stage-nav-arrow stage-arrow-right"
            onClick={handleNext}
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Pagination */}
        <div className="carousel-dots-pagination">
          {filteredProjects.map((proj, idx) => (
            <button
              key={proj.id}
              className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Case Study / Project Summary Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
