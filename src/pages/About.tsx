import './About.css'
import mylogo from '../assets/logonew.png'
import githubIcon from '../assets/icons8-github-48.png'
import linkedinIcon from '../assets/icons8-linkedin-48.png'
import { useI18n } from '../i18n/I18nProvider'

export default function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <img src={mylogo} alt="DEVTAS logo" className="about-img" loading="lazy" />
        <div>
          <h2>{t('about.title')}</h2>
          <h4 className="about-sub">{t('about.subtitle')}</h4>
          <h3>Who I am</h3>
          <p className="about-story">
            {t('about.description')}
          </p>
          <h3>My Core Values</h3>
          <p className="about-story">
            Performance, <span className="highlight">accessibility</span>, and a human-centered UX. I code with empathy. And coffee.
          </p>
          <p className="about-story">
            With a strong focus on performance and accessibility, I bring empathy and clarity to every line of code.
          </p>
          <h3>Tech Stack</h3>
          <p className="about-story">
            React, Next.js, TypeScript, Node.js, Firebase — plus whatever tool best solves the problem.
          </p>
          <ul className="about-values">
            <li>💡 Creative Problem Solver</li>
            <li>🤝 Team Player</li>
            <li>🌍 Accessibility Advocate</li>
            <li>🚀 Always Learning</li>
          </ul>
          
          <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}>
            <a href="https://github.com/dashboard" target="_blank" rel="noreferrer" aria-label="Open GitHub">
              <img src={githubIcon} alt="GitHub" className="about-icon" />
            </a>
            <a href="https://www.linkedin.com/in/tasneem-abuliel-215090304/" target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" className="about-icon" />
            </a>
            <a href="/CV-Tasneem Abu LielFUL.pdf" className="btn small outline" download aria-label="Download CV">{t('about.downloadCV')}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
