import { Reveal } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="band band--soft">
      <div className="band-inner about-split">
        <Reveal x={-24}>
          <header className="section-header section-header--wide" style={{ marginBottom: '1rem' }}>
            <p className="section-eyebrow">{t('nav.about')}</p>
            <h2 className="section-title section-title--xl">{t('about.title')}</h2>
            <p className="section-subtitle">{t('about.subtitle')}</p>
          </header>
          <p className="about-body" style={{ padding: 0, border: 0, background: 'transparent', boxShadow: 'none' }}>
            {t('about.body')}
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <strong>Full-Stack</strong>
              <span>Web · Systems · APIs</span>
            </div>
            <div className="about-stat">
              <strong>HE / AR / EN</strong>
              <span>RTL & multilingual</span>
            </div>
            <div className="about-stat">
              <strong>Production</strong>
              <span>Ship & support</span>
            </div>
          </div>
        </Reveal>

        <Reveal x={24} delay={0.1}>
          <div className="about-visual">
            <img src="/projects/mila.png" alt="" loading="lazy" decoding="async" />
            <div className="about-visual-card">
              <strong>DEVTAS Studio</strong>
              <span>{t('about.subtitle')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
