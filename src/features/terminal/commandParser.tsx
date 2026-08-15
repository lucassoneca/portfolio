import React from 'react';
import { projectsData } from '../../data/projectsData';
import { skillsData } from '../../data/skillsData';
import { profileData } from '../../data/profileData';
import { experienceData } from '../../data/experienceData';
import type { ThemeMode } from '../../core/types/theme';
import type { Language } from '../../core/types/i18n';
import confetti from 'canvas-confetti';

export interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

export interface CommandContext {
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: Language) => void;
  language: Language;
  openContact: () => void;
}

export const executeCommand = (
  cmdLine: string,
  ctx: CommandContext
): { output: React.ReactNode; isError?: boolean } => {
  const trimmed = cmdLine.trim();
  if (!trimmed) return { output: '' };

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return {
        output: (
          <div className="terminal-cmd-output">
            <p className="terminal-output-title">Available CLI Commands:</p>
            <table className="terminal-table">
              <tbody>
                <tr>
                  <td><code>about</code> | <code>whoami</code></td>
                  <td>Display developer bio, age, degree and focus</td>
                </tr>
                <tr>
                  <td><code>projects</code></td>
                  <td>List top GitHub projects and case studies</td>
                </tr>
                <tr>
                  <td><code>skills</code></td>
                  <td>Show technical competencies and proficiency matrix</td>
                </tr>
                <tr>
                  <td><code>experience</code> | <code>education</code></td>
                  <td>Show academic degree (ADS) and technical trajectory</td>
                </tr>
                <tr>
                  <td><code>theme [dark|matrix|midnight|light]</code></td>
                  <td>Switch UI theme live</td>
                </tr>
                <tr>
                  <td><code>lang [pt|en]</code></td>
                  <td>Switch system language (Português / English)</td>
                </tr>
                <tr>
                  <td><code>curl stats</code></td>
                  <td>Fetch developer profile & system specifications</td>
                </tr>
                <tr>
                  <td><code>contact</code> | <code>connect</code></td>
                  <td>Show contact channels & social networks</td>
                </tr>
                <tr>
                  <td><code>clear</code></td>
                  <td>Clear terminal session output</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      };

    case 'about':
    case 'whoami':
      return {
        output: (
          <div className="terminal-cmd-output">
            <p className="terminal-output-title">👤 About Developer — {profileData.name}</p>
            <div className="terminal-item">
              <p><strong>Idade:</strong> {profileData.age} anos</p>
              <p><strong>Formação:</strong> Graduado em Análise e Desenvolvimento de Sistemas (ADS)</p>
              <p><strong>Foco:</strong> Desenvolvimento Backend, APIs RESTful & Criação de Sites Modernos</p>
              <p><strong>Stack:</strong> Java, Spring Boot, TypeScript, Node.js, PostgreSQL, Docker</p>
            </div>
          </div>
        ),
      };

    case 'projects':
      return {
        output: (
          <div className="terminal-cmd-output">
            <p className="terminal-output-title">🚀 Top GitHub Projects:</p>
            <div className="terminal-list">
              {projectsData.map((p, idx) => (
                <div key={p.id} className="terminal-item">
                  <span className="terminal-item-index">[{idx + 1}]</span>
                  <strong>{p.title}</strong>
                  <span className="terminal-sub">({p.category.toUpperCase()})</span>
                  <div className="terminal-item-desc">{p.tagline}</div>
                  <div className="terminal-item-tags">Stack: {p.tags.slice(0, 4).join(', ')}</div>
                  {p.githubUrl && (
                    <div>
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="terminal-link">
                        ➔ {p.githubUrl}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ),
      };

    case 'skills':
      return {
        output: (
          <div className="terminal-cmd-output">
            <p className="terminal-output-title">⚡ Technical Skills & Competencies:</p>
            <div className="terminal-skills-list">
              {skillsData.map((group) => (
                <div key={group.id} className="terminal-skill-group">
                  <span className="skill-group-name">[{group.title}]</span>
                  <div className="terminal-skill-items">
                    {group.skills.map((s) => (
                      <span key={s.name} className="terminal-skill-pill">
                        {s.name} ({s.level}%)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      };

    case 'experience':
    case 'education':
      return {
        output: (
          <div className="terminal-cmd-output">
            <p className="terminal-output-title">💼 Education & Career History:</p>
            <div className="terminal-list">
              {experienceData.map((e) => (
                <div key={e.id} className="terminal-item">
                  <strong>{e.role} — {e.company}</strong>
                  <span className="terminal-sub">({e.period.start} - {e.period.end})</span>
                  <div className="terminal-item-desc">{e.summary}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      };

    case 'theme': {
      const themeArg = args[0]?.toLowerCase();
      const themeMap: Record<string, ThemeMode> = {
        dark: 'dark-obsidian',
        obsidian: 'dark-obsidian',
        matrix: 'cyber-matrix',
        cyber: 'cyber-matrix',
        midnight: 'midnight-neon',
        neon: 'midnight-neon',
        light: 'clean-light',
      };

      if (themeArg && themeMap[themeArg]) {
        ctx.setTheme(themeMap[themeArg]);
        return {
          output: <p className="terminal-success">✓ Theme updated to [{themeMap[themeArg]}].</p>,
        };
      }
      return {
        output: (
          <p className="terminal-error">
            Usage: theme [dark | matrix | midnight | light]
          </p>
        ),
        isError: true,
      };
    }

    case 'lang': {
      const langArg = args[0]?.toLowerCase();
      if (langArg === 'pt' || langArg === 'en') {
        ctx.setLanguage(langArg);
        return {
          output: <p className="terminal-success">✓ Language switched to [{langArg.toUpperCase()}].</p>,
        };
      }
      return {
        output: <p className="terminal-error">Usage: lang [pt | en]</p>,
        isError: true,
      };
    }

    case 'curl': {
      if (args[0] === 'stats') {
        return {
          output: (
            <div className="terminal-cmd-output">
              <pre className="terminal-code">
{JSON.stringify(
  {
    name: profileData.name,
    age: profileData.age,
    role: profileData.title,
    education: 'Graduado em Análise e Desenvolvimento de Sistemas (ADS)',
    focus: 'Backend Development, RESTful APIs & Modern Web Pages',
    github: 'https://github.com/lucassoneca',
    linkedin: 'https://www.linkedin.com/in/lucasbezerradev/',
    location: profileData.location,
    status: 'ONLINE',
  },
  null,
  2
)}
              </pre>
            </div>
          ),
        };
      }
      return {
        output: <p className="terminal-error">Usage: curl stats</p>,
        isError: true,
      };
    }

    case 'contact':
    case 'connect':
      return {
        output: (
          <div className="terminal-cmd-output">
            <p className="terminal-output-title">📫 Canais de Contato & Redes:</p>
            <ul className="terminal-bullets">
              {profileData.socialLinks.map((s) => (
                <li key={s.platform}>
                  <strong>{s.label}:</strong>{' '}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    {s.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ),
      };

    case 'sudo':
      if (args[0] === 'connect' || args[0] === 'info') {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore
        }
        ctx.openContact();
        return {
          output: (
            <div className="terminal-cmd-output terminal-hire-success">
              <p className="terminal-success-big">⚡ Redirecionando para os canais de contato...</p>
              <p>Obrigado por visitar o portfólio de Lucas Bezerra da Cruz!</p>
            </div>
          ),
        };
      }
      return {
        output: <p className="terminal-error">sudo: try 'sudo connect'</p>,
        isError: true,
      };

    default:
      return {
        output: (
          <p className="terminal-error">
            Command not recognized: "{trimmed}". Type <span className="highlight-cmd">help</span> to view all commands.
          </p>
        ),
        isError: true,
      };
  }
};
