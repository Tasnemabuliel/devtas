import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import { useI18n } from '../i18n/I18nProvider'

const STEPS = ['1', '2', '3', '4'] as const

export default function Process() {
  const { t } = useI18n()

  return (
    <section id="process" className="band band--mesh">
      <div className="band-inner">
        <Reveal>
          <header className="section-header section-header--wide">
            <p className="section-eyebrow">{t('nav.process')}</p>
            <h2 className="section-title section-title--xl">{t('process.title')}</h2>
            <p className="section-subtitle">{t('process.subtitle')}</p>
          </header>
        </Reveal>

        <Stagger className="process-steps">
          {STEPS.map((step) => (
            <StaggerItem key={step}>
              <div className="process-step">
                <span className="process-step-num" aria-hidden="true">
                  {step}
                </span>
                <div>
                  <h3>{t(`process.steps.${step}.title`)}</h3>
                  <p>{t(`process.steps.${step}.desc`)}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
