import './Home.css'
import { useI18n } from '../i18n/I18nProvider'
import { Link } from 'react-router-dom'

export default function Home() {
  const { t } = useI18n()

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy" data-reveal="left">
          <p className="hero-brand fade-in-up">{t('home.brand')}</p>
          <h1 className="hero-title fade-in-up delay-1">{t('home.title')}</h1>
          <p className="hero-desc fade-in-up delay-2">{t('home.subtitle')}</p>
          <p className="hero-techline fade-in-up delay-2">{t('home.techLine')}</p>

          <div className="hero-cta fade-in-up delay-3">
            <a href="#projects" className="hero-btn hero-btn-primary">
              {t('home.ctaProjects')}
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              {t('home.ctaContact')}
            </a>
          </div>
        </div>

        <div className="hero-visual fade-in-up delay-2" data-reveal="right" aria-hidden="true">
          <div className="hero-visual-frame">
            <img src="/projects/sukria.png" alt="" className="hero-visual-main" />
            <div className="hero-visual-stack">
              <img src="/projects/voltara.png" alt="" />
              <img src="/projects/wego.png" alt="" />
            </div>
          </div>
          <Link to="/projects" className="hero-visual-link">
            {t('nav.allProjects')}
          </Link>
        </div>
      </div>
    </section>
  )
}
