import React, { useState } from 'react';
import { useI18n } from '../../core/i18n';
import { profileData } from '../../data/profileData';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { GithubIcon, LinkedinIcon } from '../../shared/ui/Icons';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';
import './ContactSection.css';

export const ContactSection: React.FC = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lucasbezerracrz@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <GithubIcon size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'whatsapp':
        return <MessageSquare size={18} />;
      default:
        return <Mail size={18} />;
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <SectionHeader
          badge={t.contact.badge}
          badgeIcon={<Mail size={14} />}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="contact-grid-container">
          {/* Left Column: Direct Links & Info */}
          <div className="contact-info-column">
            <Card variant="glass" className="contact-status-card">
              <Badge variant="cyan" size="md" icon={<GraduationCap size={15} />}>
                {t.contact.availableBadge}
              </Badge>
              <h3 className="contact-lead-title">Conexão Profissional & Desenvolvimento</h3>
              <p className="contact-lead-desc">
                Aberto a trocar experiências sobre engenharia backend, criação de páginas modernas e tecnologia. Conecte-se através das redes ou envie uma mensagem diretamente.
              </p>

              <div className="copy-email-box glass-panel">
                <div className="email-text-wrapper">
                  <Mail size={16} className="mail-icon" />
                  <span className="email-string">lucasbezerracrz@gmail.com</span>
                </div>
                <button
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                  aria-label={t.contact.copyEmail}
                >
                  {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedEmail ? t.contact.emailCopied : t.contact.copyEmail}</span>
                </button>
              </div>
            </Card>

            <div className="direct-channels-grid">
              {profileData.socialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card glass-panel"
                >
                  <div className="channel-icon-box">{getPlatformIcon(item.platform)}</div>
                  <div className="channel-info">
                    <span className="channel-label">{item.label}</span>
                    <span className="channel-username">{item.username}</span>
                  </div>
                  <ExternalLink size={14} className="channel-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-column">
            <Card variant="glass" className="form-card">
              {isSubmitted ? (
                <div className="form-success-state animate-fade-in">
                  <div className="success-icon-circle">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="success-title">{t.contact.form.successTitle}</h3>
                  <p className="success-message">{t.contact.form.successMessage}</p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-field">
                    <label htmlFor="contact-name" className="form-label">
                      {t.contact.form.name} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ex: Seu Nome ou Empresa"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email" className="form-label">
                      {t.contact.form.email} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="exemplo@email.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject" className="form-label">
                      {t.contact.form.subject}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Ex: Desenvolvimento Backend ou Criação de Site"
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message" className="form-label">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder="Escreva sua mensagem aqui..."
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    icon={<Send size={18} />}
                    className="submit-btn"
                  >
                    {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
