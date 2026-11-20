import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectsCarousel from '../components/ProjectsCarousel'
import ShowcaseProject from '../components/ShowcaseProject'
import { Reveal, Stagger, StaggerItem } from '../components/Motion'
import {
  getSystemProjects,
  getWebsiteProjects,
  matchesPortfolioFilter,
  portfolioFilters,
  type PortfolioFilter,
} from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

export default function ProjectsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<PortfolioFilter>('all')

  const websites = useMemo(
    () => getWebsiteProjects().filter((p) => matchesPortfolioFilter(p, filter)),
    [filter]
  )
  const systems = useMemo(
    () => getSystemProjects().filter((p) => matchesPortfolioFilter(p, filter)),
    [filter]
  )

  const empty = websites.length === 0 && systems.length === 0

  return (
    <section className="section projects-page">
      <Reveal>
        <header className="section-header section-header--wide">
          <p className="section-eyebrow">{t('nav.projects')}</p>
          <h1 className="section-title section-title--xl">{t('portfolio.allTitle')}</h1>
          <p className="section-subtitle">{t('portfolio.allSubtitle')}</p>
        </header>
      </Reveal>

      <Reveal>
        <div className="projects-filters" role="toolbar" aria-label={t('portfolio.allTitle')}>
          {portfolioFilters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${filter === item ? 'is-active' : ''}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === 'all' ? t('portfolio.filterAll') : t(`portfolio.filters.${item}`)}
            </button>
          ))}
        </div>
      </Reveal>

      {empty ? (
        <p className="projects-empty">{t('portfolio.emptyFilter')}</p>
      ) : (
        <>
          {(filter === 'all' || filter === 'websites') && websites.length > 0 && (
            <div className="projects-subsection">
              <Reveal>
                <header className="section-header projects-subsection-header">
                  <h2 className="projects-subsection-title">{t('portfolio.websitesTitle')}</h2>
                  <p className="section-subtitle">{t('portfolio.websitesSubtitle')}</p>
                </header>
              </Reveal>
              <Stagger className="projects-grid projects-desktop">
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
          )}

          {(filter === 'all' || filter === 'systems') && systems.length > 0 && (
            <div className="projects-subsection">
              <Reveal>
                <header className="section-header projects-subsection-header">
                  <h2 className="projects-subsection-title">{t('portfolio.systemsTitle')}</h2>
                  <p className="section-subtitle">{t('portfolio.systemsSubtitle')}</p>
                </header>
              </Reveal>
              <div className="showcase-list systems-showcase projects-desktop">
                {systems.map((project, index) => (
                  <ShowcaseProject
                    key={project.id}
                    project={project}
                    flip={index % 2 === 1}
                    delay={index * 0.04}
                  />
                ))}
              </div>
              <ProjectsCarousel
                projects={systems}
                variant="system"
                label={t('portfolio.systemsTitle')}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}
