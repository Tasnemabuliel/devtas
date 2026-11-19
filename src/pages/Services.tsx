import {
  FormInput,
  LayoutTemplate,
  Link2,
  MessageCircle,
  PanelsTopLeft,
  Workflow,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'
import './Services.css'

const ITEMS = [
  { key: 'brandSites', icon: PanelsTopLeft, size: 'lg' },
  { key: 'landingPages', icon: LayoutTemplate, size: 'md' },
  { key: 'linksPages', icon: Link2, size: 'md' },
  { key: 'simpleAdmin', icon: FormInput, size: 'wide' },
  { key: 'contactFlow', icon: MessageCircle, size: 'accent' },
  { key: 'leadAutomation', icon: Workflow, size: 'md' },
] as const

export default function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="band band--mesh">
      <div className="band-inner">
        <Reveal>
          <header className="section-header section-header--wide">
            <p className="section-eyebrow">{t('nav.services')}</p>
            <h2 className="section-title section-title--xl">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </header>
        </Reveal>

        <Stagger className="bento-grid">
          {ITEMS.map(({ key, icon: Icon, size }) => (
            <StaggerItem
              key={key}
              className={`bento-item${
                size === 'lg' ? ' bento-item--lg' : size === 'wide' ? ' bento-item--wide' : size === 'accent' ? ' bento-item--accent' : ''
              }`}
            >
              <span className="bento-icon" aria-hidden>
                <Icon size={18} />
              </span>
              <h3 className="service-title">{t(`services.items.${key}.title`)}</h3>
              <p className="service-desc">{t(`services.items.${key}.desc`)}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
