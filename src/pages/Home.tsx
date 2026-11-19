import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Code2, Layers3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import './Home.css'

export default function Home() {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
        }

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
          aria-hidden="true"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, x: 24 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
              })}
        >
          <div className="hero-code-panel">
            <div className="hero-code-top">
              <span />
              <span />
              <span />
              <p>devtas · studio</p>
            </div>
            <pre className="hero-code-body">
{`const product = await build({
  stack: ['React', 'Node', 'Postgres'],
  focus: ['UX', 'integrations', 'scale'],
})

ship(product) // production-ready`}
            </pre>
            <div className="hero-code-badges">
              <span>
                <Code2 size={14} aria-hidden /> Full-Stack
              </span>
              <span>
                <Layers3 size={14} aria-hidden /> Systems
              </span>
              <span>
                <Sparkles size={14} aria-hidden /> Digital
              </span>
            </div>
          </div>

          <div className="hero-visual-frame">
            <img src="/projects/haotzma.png" alt="" className="hero-visual-main" />
            <div className="hero-visual-stack">
              <img src="/projects/ok-studio.png" alt="" />
              <img src="/projects/mila.png" alt="" />
            </div>
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
