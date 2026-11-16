import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/I18nProvider'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section about-section" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '60ms' } as CSSProperties}>
        <p className="section-eyebrow">{t('nav.about')}</p>
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="section-subtitle">{t('about.subtitle')}</p>
      </header>
      <p className="about-body" data-reveal="up" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
        {t('about.body')}
      </p>
    </section>
  )
}
