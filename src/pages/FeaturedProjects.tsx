import { Link } from 'react-router-dom'
import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import ProjectCard from '../components/ProjectCard'
import ProjectsCarousel from '../components/ProjectsCarousel'
import ShowcaseProject from '../components/ShowcaseProject'
import { getSystemProjects, getWebsiteProjects } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

export default function FeaturedProjects() {
  const { t } = useI18n()
  const websites = getWebsiteProjects()
  const systems = getSystemProjects()

  return (
    <section id="projects" className="band band--soft projects-section">
      <div className="band-inner">
        <Reveal>
          <header className="section-header section-header--wide">
            <p className="section-eyebrow">{t('nav.projects')}</p>
            <h2 className="section-title section-title--xl">{t('portfolio.title')}</h2>
            <p className="section-subtitle">{t('portfolio.subtitle')}</p>
          </header>
        </Reveal>

        <div className="projects-subsection" id="websites">
          <Reveal>
            <header className="section-header projects-subsection-header">
              <h3 className="projects-subsection-title">{t('portfolio.websitesTitle')}</h3>
              <p className="section-subtitle">{t('portfolio.websitesSubtitle')}</p>
            </header>
          </Reveal>
          <Stagger className="projects-grid projects-desktop" delay={0.04}>
            {websites.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} variant="website" />
              </StaggerItem>
            ))}
          </Stagger>
          <ProjectsCarousel
            projects={websites}
            variant="website"
            label={t('portfolio.websitesTitle')}
          />
        </div>

        <div className="projects-subsection" id="systems">
          <Reveal>
            <header className="section-header projects-subsection-header">
              <h3 className="projects-subsection-title">{t('portfolio.systemsTitle')}</h3>
              <p className="section-subtitle">{t('portfolio.systemsSubtitle')}</p>
            </header>
          </Reveal>

          <div className="showcase-list systems-showcase projects-desktop">
            {systems.map((project, index) => (
              <ShowcaseProject
                key={project.id}
                project={project}
                flip={index % 2 === 1}
                delay={index * 0.05}
              />
            ))}
          </div>
          <ProjectsCarousel
            projects={systems}
            variant="system"
            label={t('portfolio.systemsTitle')}
          />
        </div>

        <Reveal>
          <div className="section-cta-row">
            <Link className="btn outline" to="/projects">
              {t('nav.allProjects')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
