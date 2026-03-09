import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { en } from './en'
import { he } from './he'
import { ar } from './ar'

export type Language = 'en' | 'he' | 'ar'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  en,
  he,
  ar
}

// Helper function to get nested object value by key path
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path
  }, obj)
}

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to Hebrew (marketing site default)
    const savedLang = localStorage.getItem('language') as Language
    return savedLang && ['en', 'he'].includes(savedLang) ? savedLang : 'he'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    
    // Update HTML dir attribute for RTL support
    const isRTL = lang === 'he' || lang === 'ar'
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }

  const t = (key: string): string => {
    const translation = getNestedValue(translations[language], key)
    return translation || key
  }

  const isRTL = language === 'he' || language === 'ar'

  // Set initial HTML attributes
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)

    // Keep the skip-link text aligned with the current language
    const skipSelector = 'a.skip-link'
    let skip = document.querySelector<HTMLAnchorElement>(skipSelector)
    if (!skip) {
      skip = document.createElement('a')
      skip.href = '#main'
      skip.className = 'skip-link'
      document.body.prepend(skip)
    }
    skip.textContent = language === 'he' ? 'דלג לתוכן' : 'Skip to content'
  }, [language, isRTL])

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    isRTL
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
