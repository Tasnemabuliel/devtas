import { Link } from 'react-router-dom'
import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import ProjectCard from '../components/ProjectCard'
import ShowcaseProject from '../components/ShowcaseProject'
import {
  getProjectBySlug,
  getFeaturedSystems,
  getFeaturedWebsites,
  getWegoExperienceProjects,
} from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

const SHOWCASE_IDS = ['haotzma', 'mila', 'ok-studio'] as const

export default function FeaturedProjects() {
  const { t } = useI18n()
  const showcase = SHOWCASE_IDS.map((id) => getProjectBySlug(id)).filter(Boolean)
  const websites = getFeaturedWebsites().filter((p) => !SHOWCASE_IDS.includes(p.id as (typeof SHOWCASE_IDS)[number]))
  const systems = getFeaturedSystems().filter((p) => !SHOWCASE_IDS.includes(p.id as (typeof SHOWCASE_IDS)[number]))
  const wego = getWegoExperienceProjects()
  const compact = [...systems, ...websites]

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

        <div className="showcase-list">
          {showcase.map((project, index) =>
            project ? (
              <ShowcaseProject
                key={project.id}
                project={project}
                flip={index % 2 === 1}
                delay={index * 0.05}
              />
            ) : null
          )}
        </div>

        {compact.length > 0 && (
          <div className="projects-subsection">
            <Reveal>
              <header className="section-header projects-subsection-header">
                <h3 className="projects-subsection-title">{t('portfolio.systemsTitle')}</h3>
                <p className="section-subtitle">{t('portfolio.systemsSubtitle')}</p>
              </header>
            </Reveal>
            <Stagger className="projects-compact-grid" delay={0.05}>
              {compact.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}

        {wego.length > 0 && (
          <div className="projects-subsection" id="wego-experience">
            <div className="band band--deep" style={{ marginInline: 0, width: '100%', borderRadius: 28, padding: '2rem 1.25rem' }}>
              <Reveal>
                <header className="section-header projects-subsection-header">
                  <h3 className="projects-subsection-title">{t('portfolio.wegoTitle')}</h3>
                  <p className="section-subtitle">{t('portfolio.wegoSubtitle')}</p>
                  <p className="wego-disclosure">{t('portfolio.wegoDisclosure')}</p>
                </header>
              </Reveal>

              <div className="wego-timeline">
                {wego.map((project, index) => {
                  const base = `portfolio.items.${project.i18nKey}`
                  const demo = project.demos[0]
                  return (
                    <Reveal key={project.id} delay={index * 0.05} className="wego-case">
                      <a
                        href={demo?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="showcase-media"
                        aria-label={t(`${base}.name`)}
                      >
                        <div className="browser-mockup">
                          <div className="browser-mockup-chrome" aria-hidden="true">
                            <span className="browser-dot browser-dot--red" />
                            <span className="browser-dot browser-dot--yellow" />
                            <span className="browser-dot browser-dot--green" />
                            <span className="browser-mockup-url">demo</span>
                          </div>
                          <div className="browser-mockup-viewport">
                            <img src={project.image} alt="" className="project-card-img" loading="lazy" />
                            <div className="project-card-gradient" />
                          </div>
                        </div>
                      </a>
                      <div className="wego-case-copy">
                        <h4>{t(`${base}.name`)}</h4>
                        <p>{t(`${base}.short`)}</p>
                        <p>{t(`${base}.solution`)}</p>
                        <div className="wego-case-actions">
                          {demo && (
                            <a className="btn project-btn-primary" href={demo.url} target="_blank" rel="noopener noreferrer">
                              {t('portfolio.viewDemo')}
                            </a>
                          )}
                          <Link className="btn outline" to={`/projects/${project.slug}`} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                            {t('portfolio.viewDetails')}
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        )}

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
