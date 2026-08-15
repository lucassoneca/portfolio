import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, I18nDictionary } from '../types/i18n';
import { pt } from './pt';
import { en } from './en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: I18nDictionary;
  toggleLanguage: () => void;
}

const dictionaries: Record<Language, I18nDictionary> = { pt, en };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const I18N_STORAGE_KEY = 'portfolio_language';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(I18N_STORAGE_KEY) as Language;
    if (saved && (saved === 'pt' || saved === 'en')) {
      return saved;
    }
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: dictionaries[language],
    toggleLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
