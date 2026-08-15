import React from 'react';
import { useI18n } from '../../core/i18n';
import { profileData } from '../../data/profileData';
import { GitBranch, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <div className="footer-brand">
              <span className="brand-bracket">[</span>
              <span className="brand-name">LBC</span>
              <span className="brand-dot">.</span>
              <span className="brand-title">DEV</span>
              <span className="brand-bracket">]</span>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div className="footer-badges">
              <span className="footer-pill">
                <GitBranch size={13} /> Feature-Sliced Design
              </span>
              <span className="footer-pill">
                <ShieldCheck size={13} /> Strict TypeScript
              </span>
            </div>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#projects">{t.nav.projects}</a></li>
              <li><a href="#skills">{t.nav.skills}</a></li>
              <li><a href="#experience">{t.nav.experience}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div className="footer-social-column">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links-list">
              {profileData.socialLinks.map((item) => (
                <li key={item.platform}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-back-to-top">
            <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Voltar ao topo">
              <ArrowUp size={18} />
              <span>Topo</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {profileData.name}. {t.footer.rights}
          </p>
          <p className="footer-credits">
            {t.footer.designedWith} <Heart size={14} className="heart-icon" />
          </p>
        </div>
      </div>
    </footer>
  );
};
