import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/I18nProvider'

const STEPS = ['1', '2', '3', '4'] as const

export default function Process() {
  const { t } = useI18n()

  return (
    <section id="process" className="section process-section" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '60ms' } as CSSProperties}>
        <p className="section-eyebrow">{t('nav.process')}</p>
        <h2 className="section-title">{t('process.title')}</h2>
        <p className="section-subtitle">{t('process.subtitle')}</p>
      </header>

      <ol className="process-steps">
        {STEPS.map((step, index) => (
          <li
            key={step}
            className="process-step"
            data-reveal="up"
            style={{ '--reveal-delay': `${100 + index * 80}ms` } as CSSProperties}
          >
            <span className="process-step-num" aria-hidden="true">
              {step}
            </span>
            <div>
              <h3>{t(`process.steps.${step}.title`)}</h3>
              <p>{t(`process.steps.${step}.desc`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
