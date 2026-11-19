import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Motion'
import {
  matchesPortfolioFilter,
  portfolioFilters,
  portfolioProjects,
  type PortfolioFilter,
} from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

export default function ProjectsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<PortfolioFilter>('all')

  const filtered = useMemo(
    () => portfolioProjects.filter((project) => matchesPortfolioFilter(project, filter)),
    [filter]
  )

  const filterLabel = (key: PortfolioFilter) =>
    key === 'all' ? t('portfolio.filterAll') : t(`portfolio.filters.${key}`)

  return (
    <section className="section projects-page">
      <Reveal>
        <header className="section-header">
          <p className="section-eyebrow">{t('nav.projects')}</p>
          <h1 className="section-title">{t('portfolio.allTitle')}</h1>
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
              {filterLabel(item)}
            </button>
          ))}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="projects-empty">{t('portfolio.emptyFilter')}</p>
      ) : (
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} revealDelay={`${60 + index * 50}ms`} />
          ))}
        </div>
      )}
    </section>
  )
}
