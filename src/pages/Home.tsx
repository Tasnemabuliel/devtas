import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Layers3, MonitorSmartphone, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import './Home.css'

const SHOWCASE = [
  {
    id: 'haotzma',
    image: '/projects/haotzma.png',
    url: 'https://haotzma-habib.com/he',
    nameKey: 'portfolio.items.haotzma.name',
  },
  {
    id: 'mila',
    image: '/projects/mila.png',
    url: 'https://milafin.com/',
    nameKey: 'portfolio.items.mila.name',
  },
  {
    id: 'ok-studio',
    image: '/projects/ok-studio.png',
    url: 'https://ok-trainingcenter.com/',
    nameKey: 'portfolio.items.okStudio.name',
  },
] as const

export default function Home() {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused) return
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SHOWCASE.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
        }

  const current = SHOWCASE[active]
  const secondary = SHOWCASE.filter((_, index) => index !== active)

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div className="hero-orb hero-orb--a" />
        <div className="hero-orb hero-orb--b" />
      </div>

      <div className="hero-shell">
        <div className="hero-copy">
          <motion.p className="hero-brand" {...fade(0)}>
            {t('home.brand')}
          </motion.p>
          <motion.h1 className="hero-title" {...fade(0.08)}>
            {t('home.title')}
          </motion.h1>
          <motion.p className="hero-desc" {...fade(0.16)}>
            {t('home.subtitle')}
          </motion.p>
          <motion.p className="hero-support" {...fade(0.22)}>
            {t('home.support')}
          </motion.p>
          <motion.p className="hero-techline" {...fade(0.28)}>
            {t('home.techLine')}
          </motion.p>

          <motion.div className="hero-cta" {...fade(0.34)}>
            <a href="#projects" className="hero-btn hero-btn-primary">
              {t('home.ctaProjects')}
              <ArrowUpRight size={18} aria-hidden />
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              {t('home.ctaContact')}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, x: 24 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
              })}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-tags" aria-hidden="true">
            <span>
              <Sparkles size={13} /> {t('heroTags.fullstack')}
            </span>
            <span>
              <Layers3 size={13} /> {t('heroTags.systems')}
            </span>
            <span>
              <MonitorSmartphone size={13} /> {t('heroTags.web')}
            </span>
          </div>

          <div className="hero-showcase">
            <div className="hero-showcase-glow" aria-hidden="true" />

            <a
              className="hero-main-card"
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(current.nameKey)}
            >
              <div className="hero-main-chrome" aria-hidden="true">
                <span />
                <span />
                <span />
                <p>{new URL(current.url).hostname.replace(/^www\./, '')}</p>
              </div>
              <div className="hero-main-viewport">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt=""
                    className="hero-visual-main"
                    initial={reduceMotion ? false : { opacity: 0.35, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
                <div className="hero-main-gradient" aria-hidden="true" />
              </div>
              <div className="hero-main-caption">
                <strong>{t(current.nameKey)}</strong>
                <span>
                  {t('portfolio.viewDemo')}
                  <ArrowUpRight size={14} aria-hidden />
                </span>
              </div>
            </a>

            <div className="hero-float-stack" aria-hidden={false}>
              {secondary.map((item, index) => (
                <a
                  key={item.id}
                  className={`hero-float-card hero-float-card--${index + 1}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(item.nameKey)}
                  onClick={() => setActive(SHOWCASE.findIndex((p) => p.id === item.id))}
                >
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-dots" role="tablist" aria-label={t('portfolio.title')}>
            {SHOWCASE.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={t(item.nameKey)}
                className={`hero-dot${active === index ? ' is-active' : ''}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>

          <Link to="/projects" className="hero-visual-link">
            {t('nav.allProjects')}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </motion.div>
      </div>

      <a href="#projects" className="hero-scroll" aria-label={t('homeScroll')}>
        <span>{t('homeScroll')}</span>
        <ArrowDown size={16} aria-hidden />
      </a>
    </section>
  )
}
