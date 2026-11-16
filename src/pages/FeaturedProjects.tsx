import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getFeaturedProjects } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

export default function FeaturedProjects() {
  const { t } = useI18n()
  const projects = getFeaturedProjects()

  return (
    <section id="projects" className="section projects-section" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '60ms' } as CSSProperties}>
        <p className="section-eyebrow">{t('nav.projects')}</p>
        <h2 className="section-title">{t('portfolio.title')}</h2>
        <p className="section-subtitle">{t('portfolio.subtitle')}</p>
      </header>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} revealDelay={`${100 + index * 80}ms`} />
        ))}
      </div>

      <div className="section-cta-row" data-reveal="up">
        <Link className="btn outline" to="/projects">
          {t('nav.allProjects')}
        </Link>
      </div>
    </section>
  )
}
