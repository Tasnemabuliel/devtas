import miniLogo from '../assets/logonew.png'
import { useI18n } from '../i18n/I18nProvider'
import { INSTAGRAM_HREF, MAILTO_INQUIRY_HREF } from '../constants/siteLinks'
import { IconInstagram, IconLinkedIn, IconMail, IconPhone, IconWhatsApp } from './FooterIcons'

const PHONE_DISPLAY = '054-262-1691'
const PHONE_LINK = 'tel:+972542621691'
const WHATSAPP_LINK = 'https://wa.me/972542621691'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-lockup">
            <img src={miniLogo} alt="" className="footer-logo" width={44} height={44} decoding="async" />
            <div className="footer-brand-text">
              <p className="footer-brand-name">{t('footer.title')}</p>
              <p className="footer-tagline">{t('footer.role')}</p>
            </div>
          </div>
        </div>

        <nav className="footer-nav" aria-label={t('footer.navigation')}>
          <p className="footer-col-title">{t('footer.navigation')}</p>
          <ul className="footer-link-list">
            <li>
              <a href="#home">{t('nav.home')}</a>
            </li>
            <li>
              <a href="#projects">{t('nav.projects')}</a>
            </li>
            <li>
              <a href="#services">{t('nav.services')}</a>
            </li>
            <li>
              <a href="#faq">{t('nav.faq')}</a>
            </li>
            <li>
              <a href="#contact">{t('nav.contact')}</a>
            </li>
          </ul>
        </nav>

        <div className="footer-contact">
          <p className="footer-col-title">{t('footer.connect')}</p>
          <ul className="footer-link-list footer-link-list--contact">
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <IconWhatsApp className="footer-link-icon" aria-hidden />
                <span>{t('footer.whatsapp')}</span>
              </a>
            </li>
            <li>
              <a href={PHONE_LINK} className="footer-phone">
                <IconPhone className="footer-link-icon" aria-hidden />
                <span className="footer-phone-label">{t('footer.phoneLabel')}</span>
                <span className="footer-phone-number" dir="ltr">
                  {PHONE_DISPLAY}
                </span>
              </a>
            </li>
            <li>
              <a href={MAILTO_INQUIRY_HREF} target="_blank" rel="noreferrer">
                <IconMail className="footer-link-icon" aria-hidden />
                <span>{t('footer.email')}</span>
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_HREF} target="_blank" rel="noreferrer">
                <IconInstagram className="footer-link-icon" aria-hidden />
                <span>{t('footer.instagram')}</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/tasneem-abuliel-215090304/" target="_blank" rel="noreferrer">
                <IconLinkedIn className="footer-link-icon" aria-hidden />
                <span>{t('footer.linkedin')}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
      </div>
    </footer>
  )
}
