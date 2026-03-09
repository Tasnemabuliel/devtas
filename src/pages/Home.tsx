import './Home.css'
import { useI18n } from '../i18n/I18nProvider'
 

export default function Home() {
  const { t } = useI18n()
  const tech = ['React', 'Next.js', 'Firebase']
  
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy" data-reveal="left">
          <h1 className="hero-title fade-in-up">{t('home.title')}</h1>
          <p className="hero-desc fade-in-up delay-1">{t('home.subtitle')}</p>

          <p className="hero-techline fade-in-up delay-2">{t('home.techLine')}</p>
          <div className="hero-techchips fade-in-up delay-2" role="list" aria-label="Tech stack">
            {tech.map((x) => (
              <span key={x} className="hero-chip" role="listitem">{x}</span>
            ))}
          </div>

          <div className="hero-cta fade-in-up delay-3">
            <a href="#projects" className="hero-btn hero-btn-primary" aria-label={t('home.ctaProjects')}>
              {t('home.ctaProjects')}
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary" aria-label={t('home.ctaContact')}>
              {t('home.ctaContact')}
            </a>
          </div>
        </div>

        <div className="hero-mockups fade-in-up delay-2" data-reveal="right">
          <div className="mockup-stack">
            <div className="mockup-card mockup-main float-slow">
              <div className="mockup-topbar" aria-hidden="true">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="mockup-url">orelkoriat.vercel.app</span>
              </div>

              <div className="mockup-body">
                <div className="mockup-preview" aria-hidden="true">
                  <div className="preview-line w80" />
                  <div className="preview-line w60" />
                  <div className="preview-blocks">
                    <div className="preview-block" />
                    <div className="preview-block" />
                    <div className="preview-block" />
                  </div>
                </div>

                <div className="mockup-meta">
                  <div>
                    <div className="mockup-title">Orel Koriat — Coach Website</div>
                    <div className="mockup-caption">Client project</div>
                  </div>
                  <a
                    className="mockup-btn"
                    href="https://orelkoriat.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open demo
                  </a>
                </div>
              </div>
            </div>

            <div className="mockup-card mockup-mini float-delayed" aria-label="Smart Links Page demo">
              <div className="mockup-title">Smart Links Page</div>
              <div className="mockup-caption">Link hub</div>
              <a
                className="mockup-link"
                href="https://orelkoriatcoach.vercel.app/links"
                target="_blank"
                rel="noreferrer"
              >
                Open demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
