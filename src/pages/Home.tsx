import './Home.css'
import { useI18n } from '../i18n/I18nProvider'
import HeroMockupCard from '../components/HeroMockupCard'

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
              <span key={x} className="hero-chip" role="listitem">
                {x}
              </span>
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
          <div className="mockup-stack mockup-stack--solutions">
            <HeroMockupCard
              variant="full"
              urlLabel={t('home.heroCards.business.url')}
              title={t('home.heroCards.business.title')}
              caption={t('home.heroCards.business.caption')}
              href="#projects"
              ctaLabel={t('home.heroCards.ctaButton')}
              floatClass="float-slow"
            />
            <div className="mockup-row">
              <HeroMockupCard
                variant="compact"
                title={t('home.heroCards.links.title')}
                caption={t('home.heroCards.links.caption')}
                href="#projects"
                compactLinkLabel={t('home.heroCards.compactLink')}
                floatClass="float-delayed"
              />
              <HeroMockupCard
                variant="compact"
                title={t('home.heroCards.landing.title')}
                caption={t('home.heroCards.landing.caption')}
                href="#projects"
                compactLinkLabel={t('home.heroCards.compactLink')}
                floatClass="float-delayed-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
