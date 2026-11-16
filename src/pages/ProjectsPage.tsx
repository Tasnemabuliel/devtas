import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import ProjectCard from '../components/ProjectCard'
import { portfolioProjects, projectCategories, type ProjectCategory } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

export default function ProjectsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return portfolioProjects
    return portfolioProjects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <section className="section projects-page" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '40ms' } as CSSProperties}>
        <p className="section-eyebrow">{t('nav.projects')}</p>
        <h1 className="section-title">{t('portfolio.allTitle')}</h1>
        <p className="section-subtitle">{t('portfolio.allSubtitle')}</p>
      </header>

      <div className="projects-filters" role="toolbar" aria-label={t('portfolio.allTitle')}>
        <button
          type="button"
          className={`filter-chip ${filter === 'all' ? 'is-active' : ''}`}
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          {t('portfolio.filterAll')}
        </button>
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-chip ${filter === category ? 'is-active' : ''}`}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {t(`portfolio.categories.${category}`)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="projects-empty">{t('portfolio.emptyFilter')}</p>
      ) : (
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} revealDelay={`${80 + index * 60}ms`} />
          ))}
        </div>
      )}
    </section>
  )
}
