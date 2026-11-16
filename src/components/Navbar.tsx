import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import mylogo from '../assets/logonew.png'
import { WHATSAPP_HREF } from '../constants/siteLinks'
import { useI18n } from '../i18n/I18nProvider'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const goHomeSection = (sectionId: string) => {
    setMenuOpen(false)
    if (onHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate(`/#${sectionId}`)
  }

  useEffect(() => {
    if (!onHome) {
      setActive(location.pathname.startsWith('/projects') ? 'projects' : '')
      return
    }

    const sections = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[]

    const updateActiveSection = () => {
      const scrollY = window.scrollY
      let activeId = 'home'
      let minDistance = Infinity

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const sectionBottom = sectionTop + rect.height
        const viewportTop = scrollY
        const viewportBottom = scrollY + window.innerHeight

        if (sectionTop < viewportBottom && sectionBottom > viewportTop) {
          const visibleTop = Math.max(sectionTop, viewportTop)
          const visibleBottom = Math.min(sectionBottom, viewportBottom)
          const visibilityRatio = (visibleBottom - visibleTop) / (sectionBottom - sectionTop)
          if (visibilityRatio > 0.28) {
            const distance = Math.abs(sectionTop - viewportTop)
            if (distance < minDistance) {
              minDistance = distance
              activeId = section.id
            }
          }
        }
      })

      setActive(activeId)
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      updateActiveSection()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onHome, location.pathname])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth > 980) return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'services', label: t('nav.services') },
    { id: 'about', label: t('nav.about') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') },
  ] as const

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="brand-link" type="button" onClick={() => goHomeSection('home')} aria-label="DEVTAS">
          <div className="logo-area">
            <img src={mylogo} alt="" className="logo-img" height={52} width={52} />
            <div className="brand-copy">
              <span className="logo">DEVTAS</span>
              <p className="brand-subtitle">{t('footer.role')}</p>
            </div>
          </div>
        </button>

        <button
          className={`hamburger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="primary-nav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-nav" className={menuOpen ? 'open' : ''}>
          <div className="nav-links">
            {navItems.map((item) => {
              if (item.id === 'projects') {
                return (
                  <Link
                    key={item.id}
                    to="/projects"
                    className={`nav-link${active === 'projects' ? ' nav-active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`nav-link${active === item.id ? ' nav-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    goHomeSection(item.id)
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <div className="nav-actions">
            <LanguageSwitcher />
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn small whatsapp-btn"
              onClick={() => setMenuOpen(false)}
            >
              <span>{t('nav.whatsapp')}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
