import React from 'react';
import { useI18n } from '../../core/i18n';
import { experienceData } from '../../data/experienceData';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Card } from '../../shared/ui/Card';
import { Badge } from '../../shared/ui/Badge';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  GitCommit,
  Layers,
} from 'lucide-react';
import './ExperienceTimeline.css';

export const ExperienceTimeline: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <SectionHeader
          badge={t.experience.badge}
          badgeIcon={<Briefcase size={14} />}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="timeline-wrapper">
          <div className="timeline-line" />

          <div className="timeline-items-list">
            {experienceData.map((item) => (
              <div key={item.id} className="timeline-item animate-fade-in">
                <div className="timeline-marker">
                  <div className="marker-dot">
                    <GitCommit size={14} />
                  </div>
                </div>

                <div className="timeline-content-card">
                  <Card variant="glass" className="exp-card">
                    <div className="exp-card-header">
                      <div>
                        <div className="exp-meta-row">
                          <span className="exp-period">
                            <Calendar size={13} />
                            {item.period.start} — {item.period.end}
                          </span>
                          <span className="exp-location">
                            <MapPin size={13} />
                            {item.location}
                          </span>
                          <Badge variant="cyan" size="sm">
                            {item.type}
                          </Badge>
                        </div>
                        <h3 className="exp-role">{item.role}</h3>
                        <div className="exp-company">{item.company}</div>
                      </div>
                    </div>

                    <p className="exp-summary">{item.summary}</p>

                    {/* Key Deliverables */}
                    <div className="exp-section">
                      <h4 className="exp-section-title">{t.experience.achievements}</h4>
                      <ul className="exp-achievements-list">
                        {item.achievements.map((ach, i) => (
                          <li key={i}>
                            <CheckCircle2 size={15} className="ach-icon" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architecture Decisions */}
                    {item.architectureHighlights && item.architectureHighlights.length > 0 && (
                      <div className="exp-section arch-section">
                        <h4 className="exp-section-title">
                          <Layers size={14} className="arch-dec-icon" />
                          {t.experience.architectureDecisions}
                        </h4>
                        <div className="arch-pills-list">
                          {item.architectureHighlights.map((arch, i) => (
                            <span key={i} className="arch-highlight-pill">
                              {arch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies Used */}
                    <div className="exp-tech-footer">
                      <span className="tech-footer-label">{t.experience.technologies}</span>
                      <div className="tech-footer-pills">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="exp-tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
