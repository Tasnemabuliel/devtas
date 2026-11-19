import {
  Code2,
  Database,
  Server,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'

const STACK: Array<{ key: string; icon: LucideIcon }> = [
  { key: 'react', icon: Code2 },
  { key: 'node', icon: Server },
  { key: 'postgres', icon: Database },
  { key: 'firebase', icon: ShieldCheck },
  { key: 'mongo', icon: Database },
  { key: 'api', icon: Workflow },
  { key: 'tailwind', icon: Sparkles },
  { key: 'deploy', icon: Store },
]

export default function Tech() {
  const { t } = useI18n()

  return (
    <section id="tech" className="band band--soft">
      <div className="band-inner">
        <Reveal>
          <header className="section-header section-header--wide">
            <p className="section-eyebrow">{t('nav.tech')}</p>
            <h2 className="section-title section-title--xl">{t('tech.title')}</h2>
            <p className="section-subtitle">{t('tech.subtitle')}</p>
          </header>
        </Reveal>

        <Reveal>
          <h3 className="tech-group-title">{t('tech.stackTitle')}</h3>
        </Reveal>

        <Stagger className="tech-grid tech-grid--dense">
          {STACK.map(({ key, icon: Icon }) => (
            <StaggerItem key={key}>
              <article className="tech-card tech-card--icon">
                <span className="tech-card-icon" aria-hidden>
                  <Icon size={18} />
                </span>
                <h3>{t(`tech.stack.${key}.title`)}</h3>
                <p>{t(`tech.stack.${key}.desc`)}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
