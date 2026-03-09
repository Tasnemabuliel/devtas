import { useI18n } from '../i18n/I18nProvider'

export default function CTA() {
  const { t } = useI18n()
  
  return (
    <section aria-label="Call to action" className="cta-section">
      <div className="cta-content">
        <div className="cta-text">
          <h3 className="cta-title">{t('cta.title')}</h3>
          <p className="cta-description">{t('cta.description')}</p>
        </div>
        <a className="btn small cta-button" href="#contact">{t('cta.button')}</a>
      </div>
    </section>
  )
}


