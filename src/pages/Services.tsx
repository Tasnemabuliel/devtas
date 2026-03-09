import './Services.css'
import type { CSSProperties, ReactNode } from 'react'
import { useI18n } from '../i18n/I18nProvider'

type ServiceItem = {
  title: string
  desc: string
  icon: ReactNode
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} fill="currentColor" />
    </svg>
  )
}

export default function Services() {
  const { t } = useI18n()

  const items: ServiceItem[] = [
    {
      title: t('services.items.brandSites.title'),
      desc: t('services.items.brandSites.desc'),
      icon: <Icon d="M4 6h16v12H4zM6 8v8h12V8z" />,
    },
    {
      title: t('services.items.landingPages.title'),
      desc: t('services.items.landingPages.desc'),
      icon: <Icon d="M4 4h16v6H4zM4 12h10v8H4zM16 12h4v8h-4z" />,
    },
    {
      title: t('services.items.linksPages.title'),
      desc: t('services.items.linksPages.desc'),
      icon: <Icon d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />,
    },
    {
      title: t('services.items.simpleAdmin.title'),
      desc: t('services.items.simpleAdmin.desc'),
      icon: <Icon d="M12 2l4 7H8l4-7zm-7 9h14v11H5V11zm3 3v5h8v-5H8z" />,
    },
    {
      title: t('services.items.contactFlow.title'),
      desc: t('services.items.contactFlow.desc'),
      icon: <Icon d="M16.2 13.8c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 .9-.2.1-.4.1-.7-.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6 0-.2 0-.4-.1-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8 0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.8 5.2.8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4z" />,
    },
    {
      title: t('services.items.leadAutomation.title'),
      desc: t('services.items.leadAutomation.desc'),
      icon: <Icon d="M4 7h16v10H4zM7 10h4v4H7zM13 10h4v1.5h-4zM13 13h4v1.5h-4zM7 19h10" />,
    },
  ]

  return (
    <section id="services" className="services-section" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
        <h2 className="section-title">{t('services.title')}</h2>
        <p className="section-subtitle">{t('services.subtitle')}</p>
      </header>

      <div className="services-grid">
        {items.map((it, index) => (
          <article
            key={it.title}
            className="service-card"
            data-reveal="up"
            style={{ '--reveal-delay': `${120 + index * 70}ms` } as CSSProperties}
          >
            <div className="service-icon">{it.icon}</div>
            <h3 className="service-title">{it.title}</h3>
            <p className="service-desc">{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

