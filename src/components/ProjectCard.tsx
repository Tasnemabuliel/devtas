import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import type { PortfolioProject } from '../data/projects'

type Props = {
  project: PortfolioProject
  revealDelay?: string
}

export default function ProjectCard({ project, revealDelay = '0ms' }: Props) {
  const { t } = useI18n()
  const base = `portfolio.items.${project.i18nKey}`
  const title = t(`${base}.name`)
  const desc = t(`${base}.short`)
  const functions = t(`${base}.functions`)
  const primaryDemo = project.demos[0]
  const categoryLabel = t(`portfolio.categories.${project.category}`)
  const originLabel =
    project.origin === 'employment' ? t('portfolio.originEmployment') : t('portfolio.originIndependent')

  return (
    <article
      className="project-card"
      data-reveal="up"
      style={{ '--reveal-delay': revealDelay } as CSSProperties}
    >
      <Link to={`/projects/${project.slug}`} className="project-card-media" aria-label={title}>
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" decoding="async" className="project-card-img" />
        ) : (
          <div className="project-card-fallback" aria-hidden="true">
            <span>{title.slice(0, 1)}</span>
          </div>
        )}
        <div className="project-card-badges">
          <span className="project-card-category">{categoryLabel}</span>
          <span className={`project-card-origin project-card-origin--${project.origin}`}>{originLabel}</span>
        </div>
      </Link>

      <div className="project-card-body">
        <h3 className="project-card-title">
          <Link to={`/projects/${project.slug}`}>{title}</Link>
        </h3>
        <p className="project-card-desc">{desc}</p>

        {functions !== `${base}.functions` && (
          <p className="project-card-functions">
            <span>{t('portfolio.functions')}:</span> {functions}
          </p>
        )}

        {project.technologies.length > 0 && (
          <ul className="project-tech" aria-label={t('portfolio.tech')}>
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}

        <div className="project-card-actions">
          {primaryDemo && (
            <a
              className="btn project-btn-primary"
              href={primaryDemo.url}
              target={primaryDemo.url.startsWith('http') ? '_blank' : undefined}
              rel={primaryDemo.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {t('portfolio.viewDemo')}
            </a>
          )}
          <Link className="btn outline project-btn-secondary" to={`/projects/${project.slug}`}>
            {t('portfolio.viewDetails')}
          </Link>
        </div>
      </div>
    </article>
  )
}
