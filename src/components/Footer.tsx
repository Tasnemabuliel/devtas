import miniLogo from '../assets/logonew.png'
import { useI18n } from '../i18n/I18nProvider'

const PHONE_DISPLAY = '054-262-1691'
const PHONE_LINK = 'tel:+972542621691'
const WHATSAPP_LINK = 'https://wa.me/972542621691'

export default function Footer() {
  const { t } = useI18n()
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={miniLogo} alt="DEVTAS logo" className="footer-logo" />
          <h3>{t('footer.title')}</h3>
          <p>{t('footer.role')}</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>{t('footer.navigation')}</h4>
            <a href="#home">{t('nav.home')}</a>
            <a href="#projects">{t('nav.projects')}</a>
            <a href="#services">{t('nav.services')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.connect')}</h4>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <span>💬</span> {t('footer.whatsapp')}
            </a>
            <a href={PHONE_LINK} className="footer-phone">
              <span>📞</span>
              <span>{t('footer.phoneLabel')}</span>
              <span className="footer-phone-number" dir="ltr">{PHONE_DISPLAY}</span>
            </a>
            <a href="mailto:?subject=DevTAS%20-%20Website%20Inquiry" target="_blank" rel="noreferrer">
              <span>✉️</span> {t('footer.email')}
            </a>
            <a href="https://www.linkedin.com/in/tasneem-abuliel-215090304/" target="_blank" rel="noreferrer">
              <span>💼</span> {t('footer.linkedin')}
            </a>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.resources')}</h4>
            <a href="/CV-Tasneem Abu LielFUL.pdf" download>📄 {t('footer.downloadCV')}</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
      </div>
    </footer>
  )
}
