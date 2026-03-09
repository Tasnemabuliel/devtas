import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'

const PHONE_DISPLAY = '054-262-1691'
const PHONE_LINK = 'tel:+972542621691'
const WHATSAPP_LINK = 'https://wa.me/972542621691'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useI18n()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      const payload = Object.fromEntries(formData.entries())

      const res = await fetch('https://formspree.io/f/xgvlgvwb', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      
      const result = await res.json()
      
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        setError(result?.errors?.[0]?.message || t('contact.error'))
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setError(t('contact.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <h2>{t('contact.title')}</h2>
      <h4 className="contact-sub">{t('contact.subtitle')}</h4>
      <div className="contact-actions">
        <a className="btn small" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">💬 {t('contact.actions.whatsapp')}</a>
        <a className="btn small outline" href="mailto:?subject=DevTAS%20-%20Website%20Inquiry" target="_blank" rel="noreferrer">✉️ {t('contact.actions.email')}</a>
        <a className="btn small outline" href="https://www.linkedin.com/in/tasneem-abuliel-215090304/" target="_blank" rel="noreferrer">in {t('contact.actions.linkedin')}</a>
      </div>
      <a className="contact-phone" href={PHONE_LINK}>
        <span>{t('contact.phoneLabel')}</span>
        <span className="contact-phone-number" dir="ltr">{PHONE_DISPLAY}</span>
      </a>
      <p className="contact-note">{t('contact.note')}</p>
      {sent ? (
        <div className="contact-success">
          <p className="contact-success-title">✓ {t('contact.success')}</p>
          <p className="contact-success-sub">{t('contact.successSub')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder={t('contact.name')} required disabled={isSubmitting} />
          <input type="email" name="email" placeholder={t('contact.email')} required disabled={isSubmitting} />
          <textarea name="message" placeholder={t('contact.message')} required disabled={isSubmitting} />
          <button type="submit" disabled={isSubmitting} style={{opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer'}}>
            {isSubmitting ? t('contact.sending') : t('contact.send')}
          </button>
        </form>
      )}
      {error && (
        <div className="contact-error">
          <p style={{margin: 0}}>✕ {error}</p>
        </div>
      )}
    </section>
  )
}
