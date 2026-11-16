import { Suspense, lazy, useEffect, useLayoutEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Accessibility from './components/Accessibility'
import Chatbot from './components/Chatbot'
import Loader from './components/Loader'
import './styles.css'

const Landing = lazy(() => import('./pages/Landing'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    if (location.pathname !== '/') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const t = setTimeout(() => setLoading(false), 220)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      const returnedViaHistory = event.persisted || navigationEntry?.type === 'back_forward'
      const isMobileViewport = window.matchMedia('(max-width: 900px)').matches

      if (returnedViaHistory && isMobileViewport) {
        window.location.reload()
        return
      }

      setLoading(false)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        element.classList.add('visible')
      })
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  useEffect(() => {
    const revealSelector = '[data-reveal]'

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        element.classList.add('visible')
      })
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.getAttribute('data-reduce-motion') === 'true'
    ) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    const observeRevealTargets = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (element.dataset.revealReady === 'true') return
        element.dataset.revealReady = 'true'
        observer.observe(element)
      })
    }

    observeRevealTargets()
    const mutationObserver = new MutationObserver(() => observeRevealTargets())
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <ScrollManager />
      <main id="main" className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Accessibility iconSrc="/icons8-accessibility-100.png" />
      <Chatbot />
      <BackToTop />
    </>
  )
}
