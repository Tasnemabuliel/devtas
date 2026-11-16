import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { en } from './en'
import { he } from './he'
import { ar } from './ar'
import { portfolioAr, portfolioEn, portfolioHe } from './portfolioContent'

export type Language = 'en' | 'he' | 'ar'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function deepMerge<T extends Record<string, unknown>>(base: T, overlay: Record<string, unknown>): T {
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    const current = out[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      current &&
      typeof current === 'object' &&
      !Array.isArray(current)
    ) {
      out[key] = deepMerge(current as Record<string, unknown>, value as Record<string, unknown>)
    } else {
      out[key] = value
    }
  }
  return out as T
}

const translations = {
  en: deepMerge(en as unknown as Record<string, unknown>, portfolioEn as unknown as Record<string, unknown>),
  he: deepMerge(he as unknown as Record<string, unknown>, portfolioHe as unknown as Record<string, unknown>),
  ar: deepMerge(ar as unknown as Record<string, unknown>, portfolioAr as unknown as Record<string, unknown>),
}

const getNestedValue = (obj: unknown, path: string): string => {
  const value = path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
  return typeof value === 'string' ? value : path
}

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language
    return savedLang && ['en', 'he', 'ar'].includes(savedLang) ? savedLang : 'he'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    const isRTL = lang === 'he' || lang === 'ar'
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }

  const t = (key: string): string => getNestedValue(translations[language], key)

  const isRTL = language === 'he' || language === 'ar'

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)

    const skipSelector = 'a.skip-link'
    let skip = document.querySelector<HTMLAnchorElement>(skipSelector)
    if (!skip) {
      skip = document.createElement('a')
      skip.href = '#main'
      skip.className = 'skip-link'
      document.body.prepend(skip)
    }
    skip.textContent =
      language === 'he' ? 'דלג לתוכן' : language === 'ar' ? 'تخطي إلى المحتوى' : 'Skip to content'
  }, [language, isRTL])

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
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
