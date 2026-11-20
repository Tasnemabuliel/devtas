import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bot, MessageCircle, Minimize2, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
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

const PANEL_EASE = [0.22, 1, 0.36, 1] as const

export default function Chatbot() {
  const { t, language } = useI18n()
  const reduceMotion = useReducedMotion()
  const panelId = useId()
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLead, setShowLead] = useState(false)
  const [lead, setLead] = useState<LeadState>(initialLead)
  const [showQuick, setShowQuick] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const seededForLang = useRef<string | null>(null)

  useEffect(() => {
    if (seededForLang.current === language) return
    seededForLang.current = language
    setMessages([{ id: `welcome-${language}`, role: 'bot', text: t('chatbot.welcome') }])
    setShowLead(false)
    setShowQuick(true)
    setError(null)
  }, [language, t])

  useEffect(() => {
    if (!open) return
    if (messages.length === 0) {
      setMessages([{ id: `welcome-${language}`, role: 'bot', text: t('chatbot.welcome') }])
      setShowQuick(true)
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180)
    return () => window.clearTimeout(timer)
  }, [open, language, messages.length, t])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, showLead, busy, showQuick])

  const pushBot = (text: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-bot`, role: 'bot', text }])
  }

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-user`, role: 'user', text }])
  }

  const handleQuick = async (actionId: string) => {
    const action = chatQuickActions.find((a) => a.id === actionId)
    if (!action || busy) return

    pushUser(t(action.labelKey))
    setError(null)
    setShowQuick(false)

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
    if (/מערכת|system|نظام|ניהול/.test(lower)) return t('chatbot.replies.wantSystem')
    if (/אתר|website|موقع|תדמית|landing|נחיתה/.test(lower)) return t('chatbot.replies.wantWebsite')
    if (/שירות|service|خدم/.test(lower)) return t('chatbot.replies.services')
    if (/פרויקט|project|مشروع/.test(lower)) return t('chatbot.replies.projects')
    if (/תהליך|process|عملي|מתחילים|start/.test(lower)) return t('chatbot.replies.process')
    return t('chatbot.replies.fallback')
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    pushUser(text)
    setShowQuick(false)
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
        await new Promise((r) => setTimeout(r, 520))
        pushBot(localReply(text))
      }
    } catch {
      setError(t('chatbot.error'))
      pushBot(t('chatbot.error'))
    } finally {
      setBusy(false)
    }
  }

  const submitLead = (e: FormEvent) => {
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
      <AnimatePresence>
        {open && (
          <motion.section
            key="chatbot-panel"
            id={panelId}
            className="chatbot-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.32, ease: PANEL_EASE }}
          >
            <header className="chatbot-header">
              <div className="chatbot-header-main">
                <span className="chatbot-avatar" aria-hidden="true">
                  <Bot size={20} strokeWidth={2} />
                  <span className="chatbot-avatar-spark">
                    <Sparkles size={10} />
                  </span>
                </span>
                <div className="chatbot-header-copy">
                  <strong id={titleId}>{t('chatbot.title')}</strong>
                  <p>{t('chatbot.subtitle')}</p>
                  {!CHAT_API_ENDPOINT && (
                    <span className="chatbot-status">{t('chatbot.offlineAi')}</span>
                  )}
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button
                  type="button"
                  className="chatbot-icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label={t('chatbot.minimize')}
                >
                  <Minimize2 size={16} aria-hidden />
                </button>
                <button
                  type="button"
                  className="chatbot-icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label={t('chatbot.close')}
                >
                  <X size={17} aria-hidden />
                </button>
              </div>
            </header>

            <div className="chatbot-messages" ref={listRef} tabIndex={0}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chatbot-bubble chatbot-bubble--${msg.role}`}>
                  {msg.text}
                </div>
              ))}

              {busy && (
                <div className="chatbot-bubble chatbot-bubble--bot chatbot-typing" aria-live="polite">
                  <span className="chatbot-typing-label">{t('chatbot.typing')}</span>
                  <span className="chatbot-typing-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              )}

              {error && (
                <p className="chatbot-error" role="alert">
                  {error}
                </p>
              )}

              {showLead && (
                <form className="chatbot-lead" onSubmit={submitLead}>
                  <input
                    required
                    name="name"
                    value={lead.name}
                    onChange={(e) => setLead((s) => ({ ...s, name: e.target.value }))}
                    placeholder={t('chatbot.lead.name')}
                    autoComplete="name"
                  />
                  <input
                    required
                    name="phone"
                    value={lead.phone}
                    onChange={(e) => setLead((s) => ({ ...s, phone: e.target.value }))}
                    placeholder={t('chatbot.lead.phone')}
                    inputMode="tel"
                    autoComplete="tel"
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

              {showQuick && !showLead && (
                <div className="chatbot-quick" role="group" aria-label={t('chatbot.subtitle')}>
                  {chatQuickActions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="chatbot-chip"
                      onClick={() => void handleQuick(action.id)}
                    >
                      {t(action.labelKey)}
                    </button>
                  ))}
                  <Link className="chatbot-chip" to="/projects" onClick={() => setOpen(false)}>
                    {t('nav.allProjects')}
                  </Link>
                </div>
              )}
            </div>

            <form
              className="chatbot-composer"
              onSubmit={(e) => {
                e.preventDefault()
                void sendMessage()
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                aria-label={t('chatbot.placeholder')}
                disabled={busy}
                autoComplete="off"
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={busy || !input.trim()}
                aria-label={t('chatbot.send')}
              >
                <Send size={16} aria-hidden />
                <span className="chatbot-send-label">{t('chatbot.send')}</span>
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={`chatbot-fab${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="chatbot-fab-glow" aria-hidden="true" />
        <span className="chatbot-fab-icon" aria-hidden="true">
          {open ? <X size={20} /> : <MessageCircle size={20} />}
        </span>
        {!open && <span className="chatbot-fab-label">{t('chatbot.fabLabel')}</span>}
      </button>
    </div>
  )
}
