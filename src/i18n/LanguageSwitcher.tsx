import React from 'react'
import { useI18n } from './I18nProvider'
import type { Language } from './I18nProvider'

const languages = [
  // Hebrew default, English secondary
  { code: 'he' as Language, name: 'עברית', short: 'עברית' },
  { code: 'en' as Language, name: 'English', short: 'EN' },
]

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
  }

  return (
    <div className="language-switcher">
      <select 
        value={language} 
        onChange={handleLanguageChange}
        className="language-select"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.short}
          </option>
        ))}
      </select>
    </div>
  )
}

// Alternative button-based switcher
export const LanguageSwitcherButtons: React.FC = () => {
  const { language, setLanguage } = useI18n()

  return (
    <div className="language-switcher-buttons">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`language-btn ${language === lang.code ? 'active' : ''}`}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="name">{lang.short}</span>
        </button>
      ))}
    </div>
  )
}
