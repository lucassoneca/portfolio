import React, { useState } from 'react';
import { useI18n } from '../../core/i18n';
import { skillsData } from '../../data/skillsData';
import type { SkillDomain } from '../../core/types/skill';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Card } from '../../shared/ui/Card';
import { Badge } from '../../shared/ui/Badge';
import {
  Wrench,
  Server,
  Layout,
  Cloud,
  Database,
  Layers,
  Sparkles,
} from 'lucide-react';
import './SkillsMatrix.css';

export const SkillsMatrix: React.FC = () => {
  const { t } = useI18n();
  const [activeDomain, setActiveDomain] = useState<SkillDomain | 'all'>('all');

  const domainIcons: Record<SkillDomain, React.ReactNode> = {
    backend: <Server size={16} />,
    frontend: <Layout size={16} />,
    cloud_devops: <Cloud size={16} />,
    database_cache: <Database size={16} />,
    architecture_testing: <Layers size={16} />,
  };

  const domainLabels: Record<SkillDomain, string> = {
    backend: t.skills.domains.backend,
    frontend: t.skills.domains.frontend,
    cloud_devops: t.skills.domains.cloud_devops,
    database_cache: t.skills.domains.database_cache,
    architecture_testing: t.skills.domains.architecture_testing,
  };

  const displayedGroups =
    activeDomain === 'all'
      ? skillsData
      : skillsData.filter((g) => g.id === activeDomain);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <SectionHeader
          badge={t.skills.badge}
          badgeIcon={<Wrench size={14} />}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        {/* Domain Filter Buttons */}
        <div className="skills-filter-container">
          <button
            className={`skills-filter-btn ${activeDomain === 'all' ? 'active' : ''}`}
            onClick={() => setActiveDomain('all')}
          >
            <Sparkles size={15} /> Todos os Domínios
          </button>
          {skillsData.map((group) => (
            <button
              key={group.id}
              className={`skills-filter-btn ${activeDomain === group.id ? 'active' : ''}`}
              onClick={() => setActiveDomain(group.id)}
            >
              {domainIcons[group.id]}
              {domainLabels[group.id]}
            </button>
          ))}
        </div>

        {/* Skills Groups Grid */}
        <div className="skills-groups-wrapper">
          {displayedGroups.map((group) => (
            <div key={group.id} className="skill-group-container">
              <div className="skill-group-header">
                <div className="group-icon-circle">{domainIcons[group.id]}</div>
                <div>
                  <h3 className="group-title">{domainLabels[group.id]}</h3>
                  <p className="group-desc">{group.description}</p>
                </div>
              </div>

              <div className="skills-cards-grid">
                {group.skills.map((skill) => (
                  <Card key={skill.name} variant="glass" className="skill-card">
                    <div className="skill-top-row">
                      <div className="skill-name-wrapper">
                        <h4 className="skill-name">{skill.name}</h4>
                        {skill.highlight && (
                          <Badge variant="cyan" size="sm">
                            Core
                          </Badge>
                        )}
                      </div>
                      <span className="skill-exp">
                        {skill.yearsOfExp} {t.skills.yearsOfExperience}
                      </span>
                    </div>

                    <p className="skill-description">{skill.description}</p>

                    {/* Proficiency Gauge */}
                    <div className="proficiency-container">
                      <div className="proficiency-meta">
                        <span className="proficiency-label">{t.skills.proficiency}</span>
                        <span className="proficiency-percent">{skill.level}%</span>
                      </div>
                      <div className="proficiency-track">
                        <div
                          className="proficiency-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>

                    {/* Sub-tags / Frameworks */}
                    <div className="skill-subtags-list">
                      {skill.tags.map((tag) => (
                        <span key={tag} className="skill-subtag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
