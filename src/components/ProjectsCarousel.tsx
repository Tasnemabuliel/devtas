import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { PortfolioProject } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import ProjectCard from './ProjectCard'

type Props = {
  projects: PortfolioProject[]
  variant?: 'website' | 'system'
  label: string
}

const SWIPE_THRESHOLD = 56
const EASE = [0.22, 1, 0.36, 1] as const

export default function ProjectsCarousel({ projects, variant = 'website', label }: Props) {
  const { t, isRTL } = useI18n()
  const reduceMotion = useReducedMotion()
  const regionId = useId()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)

  const total = projects.length
  const safeIndex = total === 0 ? 0 : Math.min(index, total - 1)
  const project = projects[safeIndex]
  const canPrev = safeIndex > 0
  const canNext = safeIndex < total - 1

  const projectsKey = projects.map((p) => p.id).join('|')

  useEffect(() => {
    setIndex(0)
    setDirection(0)
  }, [projectsKey])

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (total === 0) return
      const clamped = Math.max(0, Math.min(total - 1, next))
      if (clamped === safeIndex) return
      setDirection(dir)
      setIndex(clamped)
    },
    [safeIndex, total]
  )

  const goPrev = useCallback(() => {
    if (!canPrev) return
    goTo(safeIndex - 1, -1)
  }, [canPrev, goTo, safeIndex])

  const goNext = useCallback(() => {
    if (!canNext) return
    goTo(safeIndex + 1, 1)
  }, [canNext, goTo, safeIndex])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      if (isRTL) goNext()
      else goPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      if (isRTL) goPrev()
      else goNext()
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0, -1)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(total - 1, 1)
    }
  }

  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const target = event.target as HTMLElement | null
    if (target?.closest('a, button, input, textarea, select')) return
    touchStartX.current = event.clientX
    touchDeltaX.current = 0
  }

  const onPointerMove = (event: ReactPointerEvent) => {
    if (touchStartX.current == null) return
    touchDeltaX.current = event.clientX - touchStartX.current
  }

  const onPointerUp = () => {
    if (touchStartX.current == null) return
    const delta = touchDeltaX.current
    touchStartX.current = null
    touchDeltaX.current = 0

    if (Math.abs(delta) < SWIPE_THRESHOLD) return

    // LTR: swipe left → next; RTL: swipe right → next
    if (isRTL) {
      if (delta > 0) goNext()
      else goPrev()
    } else if (delta < 0) {
      goNext()
    } else {
      goPrev()
    }
  }

  const onPointerCancel = () => {
    touchStartX.current = null
    touchDeltaX.current = 0
  }

  if (!project || total === 0) return null

  const slideOffset = isRTL ? -100 : 100
  const variants = {
    enter: (dir: number) => ({
      x: dir === 0 ? 0 : dir > 0 ? `${slideOffset}%` : `${-slideOffset}%`,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir === 0 ? 0 : dir > 0 ? `${-slideOffset}%` : `${slideOffset}%`,
      opacity: 0,
    }),
  }

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <div
      className="projects-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={regionId}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <span id={regionId} className="visually-hidden">
        {label}
      </span>

      <div className="projects-carousel-toolbar" aria-hidden={false}>
        <button
          type="button"
          className="projects-carousel-arrow"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label={t('portfolio.carouselPrev')}
        >
          <PrevIcon size={20} aria-hidden />
        </button>
        <button
          type="button"
          className="projects-carousel-arrow"
          onClick={goNext}
          disabled={!canNext}
          aria-label={t('portfolio.carouselNext')}
        >
          <NextIcon size={20} aria-hidden />
        </button>
      </div>

      <div
        className="projects-carousel-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={project.id}
            className="projects-carousel-slide"
            custom={direction}
            variants={variants}
            initial={reduceMotion ? false : 'enter'}
            animate="center"
            exit={reduceMotion ? undefined : 'exit'}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.38, ease: EASE }
            }
          >
            <ProjectCard project={project} variant={variant} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="projects-carousel-indicator" aria-live="polite">
        {safeIndex + 1} / {total}
      </p>
    </div>
  )
}
