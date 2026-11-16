import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { chatQuickActions, projectTypeOptions } from '../data/chatKnowledge'
import { buildWhatsAppHref, CHAT_API_ENDPOINT, WHATSAPP_HREF } from '../constants/siteLinks'
import { useI18n } from '../i18n/I18nProvider'
import './Chatbot.css'

type ChatMessage = {
  id: string
  role: 'bot' | 'user'
  text: string
}

type LeadState = {
  name: string
  phone: string
  type: string
  message: string
  consent: boolean
}

const initialLead: LeadState = {
  name: '',
  phone: '',
  type: 'website',
  message: '',
  consent: false,
}

export default function Chatbot() {
  const { t, language } = useI18n()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLead, setShowLead] = useState(false)
  const [lead, setLead] = useState<LeadState>(initialLead)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    setMessages([{ id: 'welcome', role: 'bot', text: t('chatbot.welcome') }])
    setError(null)
    setShowLead(false)
  }, [open, language, t])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, showLead, busy])

  const pushBot = (text: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-bot`, role: 'bot', text }])
  }

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-user`, role: 'user', text }])
  }

  const handleQuick = async (actionId: string) => {
    const action = chatQuickActions.find((a) => a.id === actionId)
    if (!action) return

    pushUser(t(action.labelKey))
    setError(null)

    if (action.action === 'whatsapp') {
      window.open(WHATSAPP_HREF, '_blank', 'noopener,noreferrer')
      pushBot(t('chatbot.replies.fallback'))
      return
    }

    if (action.action === 'lead') {
      setShowLead(true)
      pushBot(t('chatbot.lead.title'))
      return
    }

    if (action.action === 'projects') {
      pushBot(t('chatbot.replies.projects'))
      return
    }

    if (action.replyKey) {
      pushBot(t(action.replyKey))
    }
  }

  const localReply = (text: string) => {
    const lower = text.toLowerCase()
    if (/מחיר|price|سعر|cost|כמה זה/.test(lower)) return t('chatbot.replies.noPrice')
    if (/שירות|service|خدم/.test(lower)) return t('chatbot.replies.services')
    if (/פרויקט|project|مشروع/.test(lower)) return t('chatbot.replies.projects')
    if (/תהליך|process|عملي/.test(lower)) return t('chatbot.replies.process')
    return t('chatbot.replies.fallback')
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    pushUser(text)
    setBusy(true)
    setError(null)

    try {
      if (CHAT_API_ENDPOINT) {
        const res = await fetch(CHAT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ message: text, language }),
        })
        if (!res.ok) throw new Error('chat failed')
        const data = (await res.json()) as { reply?: string }
        pushBot(data.reply || localReply(text))
      } else {
        await new Promise((r) => setTimeout(r, 450))
        pushBot(`${t('chatbot.offlineAi')}\n\n${localReply(text)}`)
      }
    } catch {
      setError(t('chatbot.error'))
      pushBot(t('chatbot.error'))
    } finally {
      setBusy(false)
    }
  }

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead.consent || !lead.name.trim() || !lead.phone.trim()) return

    const typeLabel = t(`chatbot.lead.types.${lead.type}`)
    const composed = [
      `DEVTAS lead (${language})`,
      `Name: ${lead.name.trim()}`,
      `Phone: ${lead.phone.trim()}`,
      `Type: ${typeLabel}`,
      lead.message.trim() ? `Message: ${lead.message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(buildWhatsAppHref(composed), '_blank', 'noopener,noreferrer')
    pushBot(t('chatbot.lead.success'))
    setLead(initialLead)
    setShowLead(false)
  }

  return (
    <div className="chatbot-root">
      {open && (
        <section
          id={panelId}
          className="chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-label={t('chatbot.title')}
        >
          <header className="chatbot-header">
            <div>
              <strong>{t('chatbot.title')}</strong>
              <p>{t('chatbot.offlineAi')}</p>
            </div>
            <button type="button" className="chatbot-icon-btn" onClick={() => setOpen(false)} aria-label={t('chatbot.close')}>
              ×
            </button>
          </header>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-bubble chatbot-bubble--${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {busy && <div className="chatbot-bubble chatbot-bubble--bot chatbot-typing">{t('chatbot.typing')}</div>}
            {error && <p className="chatbot-error" role="alert">{error}</p>}

            {showLead && (
              <form className="chatbot-lead" onSubmit={submitLead}>
                <input
                  required
                  name="name"
                  value={lead.name}
                  onChange={(e) => setLead((s) => ({ ...s, name: e.target.value }))}
                  placeholder={t('chatbot.lead.name')}
                />
                <input
                  required
                  name="phone"
                  value={lead.phone}
                  onChange={(e) => setLead((s) => ({ ...s, phone: e.target.value }))}
                  placeholder={t('chatbot.lead.phone')}
                  inputMode="tel"
                />
                <select
                  value={lead.type}
                  onChange={(e) => setLead((s) => ({ ...s, type: e.target.value }))}
                  aria-label={t('chatbot.lead.type')}
                >
                  {projectTypeOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {t(opt.labelKey)}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  value={lead.message}
                  onChange={(e) => setLead((s) => ({ ...s, message: e.target.value }))}
                  placeholder={t('chatbot.lead.message')}
                  rows={3}
                />
                <label className="chatbot-consent">
                  <input
                    type="checkbox"
                    checked={lead.consent}
                    onChange={(e) => setLead((s) => ({ ...s, consent: e.target.checked }))}
                    required
                  />
                  <span>{t('chatbot.consent')}</span>
                </label>
                <button type="submit" className="btn project-btn-primary">
                  {t('chatbot.lead.submit')}
                </button>
              </form>
            )}
          </div>

          <div className="chatbot-quick">
            {chatQuickActions.map((action) => (
              <button key={action.id} type="button" className="chatbot-chip" onClick={() => handleQuick(action.id)}>
                {t(action.labelKey)}
              </button>
            ))}
            <Link className="chatbot-chip" to="/projects" onClick={() => setOpen(false)}>
              {t('nav.allProjects')}
            </Link>
          </div>

          <form
            className="chatbot-composer"
            onSubmit={(e) => {
              e.preventDefault()
              void sendMessage()
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chatbot.placeholder')}
              aria-label={t('chatbot.placeholder')}
              disabled={busy}
            />
            <button type="submit" className="btn project-btn-primary" disabled={busy || !input.trim()}>
              {t('chatbot.send')}
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-fab"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '×' : 'AI'}
      </button>
    </div>
  )
}
