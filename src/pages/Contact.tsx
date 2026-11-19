import { useState } from 'react'
import { ArrowUpRight, AtSign, Mail, MessageCircle, Phone, Share2 } from 'lucide-react'
import { Reveal } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'
import {
  FORMSPREE_ENDPOINT,
  INSTAGRAM_HREF,
  LINKEDIN_HREF,
  MAILTO_INQUIRY_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
} from '../constants/siteLinks'

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

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
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
    <section id="contact" className="band band--mesh">
      <div className="band-inner contact-finale">
        <Reveal x={-18}>
          <header className="section-header section-header--wide" style={{ marginBottom: '1.25rem' }}>
            <p className="section-eyebrow">{t('nav.contact')}</p>
            <h2 className="section-title section-title--xl">{t('contact.title')}</h2>
            <p className="section-subtitle">{t('contact.subtitle')}</p>
          </header>

          <div className="contact-cta-stack">
            <a className="btn project-btn-primary" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden style={{ marginInlineEnd: 8 }} />
              {t('contact.actions.whatsapp')}
              <ArrowUpRight size={16} aria-hidden style={{ marginInlineStart: 6 }} />
            </a>
            <a className="btn outline" href={MAILTO_INQUIRY_HREF} target="_blank" rel="noreferrer">
              <Mail size={16} aria-hidden style={{ marginInlineEnd: 8 }} />
              {t('contact.actions.email')}
            </a>
            <a className="btn outline" href={PHONE_HREF}>
              <Phone size={16} aria-hidden style={{ marginInlineEnd: 8 }} />
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
            <a className="btn outline" href={INSTAGRAM_HREF} target="_blank" rel="noreferrer">
              <AtSign size={16} aria-hidden style={{ marginInlineEnd: 8 }} />
              {t('contact.actions.instagram')}
            </a>
            <a className="btn outline" href={LINKEDIN_HREF} target="_blank" rel="noreferrer">
              <Share2 size={16} aria-hidden style={{ marginInlineEnd: 8 }} />
              {t('contact.actions.linkedin')}
            </a>
          </div>
          <p className="contact-note" style={{ marginTop: '1rem' }}>
            {t('contact.note')}
          </p>
        </Reveal>

        <Reveal x={18} delay={0.08}>
          <div className="contact-finale-panel">
            {sent ? (
              <div className="contact-success">
                <p className="contact-success-title">{t('contact.success')}</p>
                <p className="contact-success-sub">{t('contact.successSub')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" name="name" placeholder={t('contact.name')} required disabled={isSubmitting} />
                <input type="email" name="email" placeholder={t('contact.email')} required disabled={isSubmitting} />
                <textarea name="message" placeholder={t('contact.message')} required disabled={isSubmitting} rows={5} />
                <button type="submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                </button>
              </form>
            )}
            {error && <p className="error">{error}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
