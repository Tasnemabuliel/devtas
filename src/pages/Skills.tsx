import './Skills.css'
import reactLogo from '../assets/nextdotjs.svg'
import nodeLogo from '../assets/nodedotjs.svg'
import pythonLogo from '../assets/python.svg'
import firebaseLogo from '../assets/firebase.svg'
import tsLogo from '../assets/github.svg'
import { useI18n } from '../i18n/I18nProvider'

const skills = [
  { name: 'React', icon: reactLogo, level: 90 },
  { name: 'TypeScript', icon: tsLogo, level: 85 },
  { name: 'Node.js', icon: nodeLogo, level: 80 },
  { name: 'Python', icon: pythonLogo, level: 70 },
  { name: 'Firebase', icon: firebaseLogo, level: 80 },
]

export default function Skills() {
  const { t } = useI18n()
  
  return (
    <section id="skills" className="skills-full-section">
      <h2>{t('skills.title')}</h2>
      <div className="skills-grid">
        {skills.map(s => (
          <div key={s.name} className="skill-card">
            <div className="row">
              <img src={s.icon} alt={s.name + ' icon'} className="skill-logo" loading="lazy" />
              <strong>{s.name}</strong>
            </div>
            <div className="progress">
              <div className="bar" style={{ width: s.level + '%'}} />
            </div>
            <span className="percent">{s.level}%</span>
          </div>
        ))}
      </div>
      <p style={{textAlign:'center', color:'#bfbfbf', marginTop:'.7rem'}}>{t('skills.comingSoon')}</p>
    </section>
  )
}


