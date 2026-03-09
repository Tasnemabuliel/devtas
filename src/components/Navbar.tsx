import { useEffect, useState } from 'react'
import mylogo from '../assets/logonew.png'
import { useI18n } from '../i18n/I18nProvider'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'

export default function Navbar() {
  const [active, setActive] = useState<string>('home')
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { t } = useI18n()

  const scrollToHome = () => {
    const homeSection = document.getElementById('home')
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[]

    const updateActiveSection = () => {
      const scrollY = window.scrollY
      let activeId = 'home'
      let minDistance = Infinity

      // Check each section
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const sectionBottom = sectionTop + rect.height
        const viewportTop = scrollY
        const viewportBottom = scrollY + window.innerHeight

        // Check if section is visible in viewport
        if (sectionTop < viewportBottom && sectionBottom > viewportTop) {
          // Calculate how much of the section is visible
          const visibleTop = Math.max(sectionTop, viewportTop)
          const visibleBottom = Math.min(sectionBottom, viewportBottom)
          const visibleHeight = visibleBottom - visibleTop
          const sectionHeight = sectionBottom - sectionTop
          const visibilityRatio = visibleHeight / sectionHeight

          // If more than 30% of the section is visible, consider it active
          if (visibilityRatio > 0.3) {
            const distance = Math.abs(sectionTop - viewportTop)
            if (distance < minDistance) {
              minDistance = distance
              activeId = section.id
            }
          }
        }
      })

      // If no section is 30% visible, find the closest one
      if (activeId === 'home' && sections.length > 0) {
        sections.forEach(section => {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + scrollY
          const distance = Math.abs(sectionTop - scrollY)
          if (distance < minDistance) {
            minDistance = distance
            activeId = section.id
          }
        })
      }

      setActive(activeId)
    }

    const onScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 8)
      updateActiveSection()
    }

    // Initial call
    onScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    const onPageShow = () => {
      setMenuOpen(false)
      document.body.style.overflow = ''
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth > 900) return

    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])



  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="brand-link" type="button" onClick={scrollToHome} aria-label="Go to homepage section">
          <div className="logo-area">
            <img src={mylogo} alt="DEVTAS logo" className="logo-img" height={56} style={{verticalAlign:'middle', borderRadius:'50%'}} />
            <div className="brand-copy">
              <h1 className="logo">DEVTAS</h1>
              <p className="brand-subtitle">{t('footer.role')}</p>
            </div>
          </div>
        </button>

        <button
          className={`hamburger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="primary-nav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-nav" className={menuOpen ? 'open' : ''}>
          <div className="nav-links">
            <a href="#home" className={`nav-link${active==='home' ? ' nav-active' : ''}`} onClick={(e) => handleNavClick(e, 'home')}>{t('nav.home')}</a>
            <a href="#projects" className={`nav-link${active==='projects' ? ' nav-active' : ''}`} onClick={(e) => handleNavClick(e, 'projects')}>{t('nav.projects')}</a>
            <a href="#services" className={`nav-link${active==='services' ? ' nav-active' : ''}`} onClick={(e) => handleNavClick(e, 'services')}>{t('nav.services')}</a>
            <a href="#contact" className={`nav-link${active==='contact' ? ' nav-active' : ''}`} onClick={(e) => handleNavClick(e, 'contact')}>{t('nav.contact')}</a>
          </div>

          <div className="nav-actions">
            <LanguageSwitcher />
            <a href="https://wa.me/972542621691" target="_blank" rel="noopener noreferrer" className="btn small whatsapp-btn" onClick={() => setMenuOpen(false)}>
              <span>💬</span>
              <span>{t('nav.whatsapp')}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
