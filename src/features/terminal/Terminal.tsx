import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../core/i18n';
import { useTheme } from '../../core/theme/ThemeContext';
import { executeCommand, type CommandOutput } from './commandParser';
import {
  Terminal as TerminalIcon,
  Square,
  X,
  Trash2,
} from 'lucide-react';
import './Terminal.css';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'whoami',
  'projects',
  'skills',
  'experience',
  'theme',
  'lang',
  'curl stats',
  'contact',
  'connect',
  'clear',
];

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useI18n();
  const { setTheme } = useTheme();
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      if (!cmd) return;

      if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      }

      const result = executeCommand(cmd, {
        setTheme,
        setLanguage,
        language,
        openContact: handleOpenContact,
      });

      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: cmd,
          output: result.output,
          isError: result.isError,
        },
      ]);

      setPastCommands((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, pastCommands.length - 1);
        setHistoryIndex(nextIndex);
        setInputVal(pastCommands[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(pastCommands[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div
        className={`terminal-window glass-panel-elevated animate-scale-up ${
          isMaximized ? 'terminal-maximized' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="terminal-titlebar">
          <div className="terminal-title-left">
            <div className="terminal-dots">
              <span className="dot dot-close" onClick={onClose} />
              <span className="dot dot-minimize" onClick={onClose} />
              <span
                className="dot dot-maximize"
                onClick={() => setIsMaximized(!isMaximized)}
              />
            </div>
            <div className="terminal-title-text">
              <TerminalIcon size={14} />
              <span>{t.terminal.title}</span>
            </div>
          </div>

          <div className="terminal-actions-right">
            <button
              className="term-btn"
              onClick={() => setHistory([])}
              title="Limpar histórico"
            >
              <Trash2 size={14} />
            </button>
            <button
              className="term-btn"
              onClick={() => setIsMaximized(!isMaximized)}
              title={t.terminal.maximize}
            >
              <Square size={13} />
            </button>
            <button className="term-btn" onClick={onClose} title={t.terminal.close}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {/* Welcome Message */}
          <div className="terminal-welcome">
            <pre className="ascii-logo">
{`  _     ____   ____   ____  _______     __
 | |   | __ ) / ___| |  _ \\| ____\\ \\   / /
 | |   |  _ \\| |     | | | |  _|  \\ \\ / / 
 | |___| |_) | |___  | |_| | |___  \\ V /  
 |_____|____/ \\____| |____/|_____|  \\_/   `}
            </pre>
            <p className="welcome-text">{t.terminal.welcomeMsg}</p>
            <p className="welcome-tip">{t.terminal.typeHelp}</p>
          </div>

          {/* History */}
          <div className="terminal-history">
            {history.map((item) => (
              <div key={item.id} className="history-entry">
                <div className="history-prompt-line">
                  <span className="prompt-user">visitor@lucas-dev</span>
                  <span className="prompt-colon">:</span>
                  <span className="prompt-dir">~</span>
                  <span className="prompt-dollar">$</span>
                  <span className="history-cmd">{item.command}</span>
                </div>
                <div className={`history-output ${item.isError ? 'output-error' : ''}`}>
                  {item.output}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Input Line */}
          <div className="terminal-input-line">
            <span className="prompt-user">visitor@lucas-dev</span>
            <span className="prompt-colon">:</span>
            <span className="prompt-dir">~</span>
            <span className="prompt-dollar">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.terminal.placeholder}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
