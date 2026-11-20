import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Code2, LayoutTemplate, MessagesSquare, Rocket, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'
import './Process.css'

const STEPS: Array<{ key: '1' | '2' | '3' | '4'; icon: LucideIcon }> = [
  { key: '1', icon: MessagesSquare },
  { key: '2', icon: LayoutTemplate },
  { key: '3', icon: Code2 },
  { key: '4', icon: Rocket },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function Process() {
  const { t, isRTL } = useI18n()
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  })

  const fillScale = useTransform(progress, [0, 1], [0, 1])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[]
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]
        if (!top) return

        const index = nodes.indexOf(top.target as HTMLLIElement)
        if (index >= 0) setActiveIndex(index)
      },
      {
        root: null,
        threshold: [0.2, 0.45, 0.7, 1],
        rootMargin: '-38% 0px -38% 0px',
      }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="band band--mesh process-section">
      <div className="band-inner">
        <Reveal>
          <header className="section-header section-header--wide">
            <p className="section-eyebrow">{t('nav.process')}</p>
            <h2 className="section-title section-title--xl">{t('process.title')}</h2>
            <p className="section-subtitle">{t('process.subtitle')}</p>
          </header>
        </Reveal>

        <div
          ref={timelineRef}
          className={`process-timeline${isRTL ? ' process-timeline--rtl' : ' process-timeline--ltr'}`}
        >
          <div className="process-timeline-track" aria-hidden="true">
            <span className="process-timeline-track-bg" />
            <motion.span
              className="process-timeline-track-fill"
              style={
                reduceMotion
                  ? isDesktop
                    ? { scaleX: 1 }
                    : { scaleY: 1 }
                  : isDesktop
                    ? { scaleX: fillScale }
                    : { scaleY: fillScale }
              }
            />
          </div>

          <ol className="process-timeline-list">
            {STEPS.map(({ key, icon: Icon }, index) => {
              const isActive = activeIndex === index
              const isDone = index < activeIndex

              return (
                <motion.li
                  key={key}
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  className={`process-timeline-item${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
                >
                  <div className="process-timeline-marker" aria-hidden="true">
                    <span className="process-timeline-num">{key}</span>
                    <span className="process-timeline-icon">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                  </div>

                  <article className="process-timeline-card">
                    <h3>{t(`process.steps.${key}.title`)}</h3>
                    <p>{t(`process.steps.${key}.desc`)}</p>
                  </article>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
