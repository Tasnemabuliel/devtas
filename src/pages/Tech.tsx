import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/I18nProvider'

const KEYS = ['frontend', 'backend', 'product', 'delivery'] as const

export default function Tech() {
  const { t } = useI18n()

  return (
    <section id="tech" className="section tech-section" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '60ms' } as CSSProperties}>
        <p className="section-eyebrow">{t('nav.tech')}</p>
        <h2 className="section-title">{t('tech.title')}</h2>
        <p className="section-subtitle">{t('tech.subtitle')}</p>
      </header>

      <div className="tech-grid">
        {KEYS.map((key, index) => (
          <article
            key={key}
            className="tech-card"
            data-reveal="up"
            style={{ '--reveal-delay': `${100 + index * 70}ms` } as CSSProperties}
          >
            <h3>{t(`tech.items.${key}.title`)}</h3>
            <p>{t(`tech.items.${key}.desc`)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
