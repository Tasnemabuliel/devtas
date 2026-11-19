import {
  Bot,
  CreditCard,
  KeyRound,
  Mail,
  MessageCircle,
  Printer,
  Receipt,
  Workflow,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'

const ITEMS = [
  { key: 'printers', icon: Printer },
  { key: 'payments', icon: CreditCard },
  { key: 'autoPrint', icon: Receipt },
  { key: 'whatsapp', icon: MessageCircle },
  { key: 'auth', icon: KeyRound },
  { key: 'email', icon: Mail },
  { key: 'ai', icon: Bot },
  { key: 'saas', icon: Workflow },
] as const

export default function Integrations() {
  const { t } = useI18n()

  return (
    <section id="integrations" className="band band--deep">
      <div className="band-inner">
        <Reveal>
          <header className="section-header section-header--wide">
            <p className="section-eyebrow">{t('tech.capsTitle')}</p>
            <h2 className="section-title section-title--xl">{t('integrations.title')}</h2>
            <p className="section-subtitle">{t('integrations.subtitle')}</p>
          </header>
        </Reveal>

        <Stagger className="integrations-rail">
          {ITEMS.map(({ key, icon: Icon }) => (
            <StaggerItem key={key} className="integration-chip">
              <Icon size={20} aria-hidden />
              <strong>{t(`tech.caps.${key}.title`)}</strong>
              <p>{t(`tech.caps.${key}.desc`)}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
