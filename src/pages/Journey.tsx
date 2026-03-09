import './Journey.css'
import { useI18n } from '../i18n/I18nProvider'

export default function Journey() {
  const { t } = useI18n()
  
  const timeline = [
    { year: '2020', title: t('journey.timeline.2020.title'), detail: t('journey.timeline.2020.detail') },
    { year: '2021', title: t('journey.timeline.2021.title'), detail: t('journey.timeline.2021.detail') },
    { year: '2023', title: t('journey.timeline.2023.title'), detail: t('journey.timeline.2023.detail') },
    { year: '2024', title: t('journey.timeline.2024.title'), detail: t('journey.timeline.2024.detail') },
    { year: '2025', title: t('journey.timeline.2025.title'), detail: t('journey.timeline.2025.detail') },
  ]

  return (
    <section id="journey" className="journey-section">
      <h2>{t('journey.title')}</h2>
      <div className="journey long">
        {timeline.map((m, idx) => (
          <div className={`journey-item${idx % 2 === 0 ? ' left' : ' right'}`} key={`${m.title}-${idx}`}>
            <div className="dot" />
            <div className="content">
              <div className="year">{m.year}</div>
              <div className="title">{m.title}</div>
              <div className="detail">{m.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'center', marginTop:'0.8rem'}}>
        <a href="#contact" className="btn small">{t('journey.seeLearningPath')}</a>
      </div>
    </section>
  )
}


