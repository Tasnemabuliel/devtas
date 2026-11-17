import { Link } from 'react-router-dom'
import miniLogo from '../assets/logonew.png'
import { useI18n } from '../i18n/I18nProvider'
import {
  INSTAGRAM_HREF,
  LINKEDIN_HREF,
  MAILTO_INQUIRY_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
} from '../constants/siteLinks'
import { IconInstagram, IconLinkedIn, IconMail, IconPhone, IconWhatsApp } from './FooterIcons'

export default function Footer() {
  const { t } = useI18n()

  const navLinks = [
    { href: '/#home', label: t('nav.home') },
    { href: '/projects', label: t('nav.projects'), router: true },
    { href: '/#services', label: t('nav.services') },
    { href: '/#about', label: t('nav.about') },
    { href: '/#faq', label: t('nav.faq') },
    { href: '/#contact', label: t('nav.contact') },
  ] as const

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-lockup">
            <img src={miniLogo} alt="" className="footer-logo" width={40} height={40} decoding="async" />
            <div className="footer-brand-text">
              <p className="footer-brand-name">{t('footer.title')}</p>
              <p className="footer-tagline">{t('footer.role')}</p>
            </div>
          </div>
        </div>

        <nav className="footer-nav" aria-label={t('footer.navigation')}>
          <ul className="footer-link-list footer-link-list--inline">
            {navLinks.map((item) => (
              <li key={item.href}>
                {'router' in item && item.router ? (
                  <Link to={item.href}>{item.label}</Link>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <ul className="footer-social" aria-label={t('footer.connect')}>
            <li>
              <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" aria-label={t('footer.whatsapp')}>
                <IconWhatsApp className="footer-link-icon" aria-hidden />
              </a>
            </li>
            <li>
              <a href={PHONE_HREF} aria-label={`${t('footer.phoneLabel')} ${PHONE_DISPLAY}`}>
                <IconPhone className="footer-link-icon" aria-hidden />
              </a>
            </li>
            <li>
              <a href={MAILTO_INQUIRY_HREF} target="_blank" rel="noreferrer" aria-label={t('footer.email')}>
                <IconMail className="footer-link-icon" aria-hidden />
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_HREF} target="_blank" rel="noreferrer" aria-label={t('contact.actions.instagram')}>
                <IconInstagram className="footer-link-icon" aria-hidden />
              </a>
            </li>
            <li>
              <a href={LINKEDIN_HREF} target="_blank" rel="noreferrer" aria-label={t('footer.linkedin')}>
                <IconLinkedIn className="footer-link-icon" aria-hidden />
              </a>
            </li>
          </ul>
          <a className="footer-phone-compact" href={PHONE_HREF} dir="ltr">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
      </div>
    </footer>
  )
}
