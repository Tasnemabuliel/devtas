import type { CSSProperties } from 'react'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import type { PortfolioProject } from '../data/projects'

type Props = {
  project: PortfolioProject
  revealDelay?: string
  variant?: 'website' | 'system'
}

function previewHref(project: PortfolioProject) {
  const primary = project.demos[0]?.url
  if (primary && primary.startsWith('http')) return primary
  return `/projects/${project.slug}`
}

function previewHost(href: string) {
  try {
    if (href.startsWith('http')) return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    /* ignore */
  }
  return 'devtas'
}

export default function ProjectCard({ project, revealDelay = '0ms', variant = 'website' }: Props) {
  const { t } = useI18n()
  const base = `portfolio.items.${project.i18nKey}`
  const title = t(`${base}.name`)
  const desc = t(`${base}.short`)
  const functions = t(`${base}.functions`)
  const primaryDemo = project.demos[0]
  const kindLabel = t(`portfolio.kinds.${project.kind}`)
  const href = previewHref(project)
  const isExternal = href.startsWith('http')
  const hasImage = Boolean(project.image)
  const host = previewHost(href)
  const showFunctions = variant === 'system' && functions !== `${base}.functions`

  const mediaContent = (
    <>
      <div className="browser-mockup">
        <div className="browser-mockup-chrome" aria-hidden="true">
          <span className="browser-dot browser-dot--red" />
          <span className="browser-dot browser-dot--yellow" />
          <span className="browser-dot browser-dot--green" />
          <span className="browser-mockup-url">{host}</span>
        </div>
        <div className="browser-mockup-viewport">
          {hasImage ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="project-card-img"
            />
          ) : (
            <div className="project-card-fallback" aria-hidden="true">
              <span>{title.slice(0, 1)}</span>
            </div>
          )}
          <div className="project-card-gradient" aria-hidden="true" />
        </div>
      </div>

      <div className="project-card-badges">
        <span className="project-card-category">{kindLabel}</span>
        {project.origin === 'employment' && (
          <span className="project-card-origin project-card-origin--employment">
            {t('portfolio.originEmployment')}
          </span>
        )}
      </div>

      <span className="project-card-open-hint" aria-hidden="true">
        <ExternalLink size={14} />
      </span>
    </>
  )

  return (
    <article
      className={`project-card project-card--${variant}`}
      data-reveal="up"
      style={{ '--reveal-delay': revealDelay } as CSSProperties}
    >
      {isExternal ? (
        <a
          className="project-card-media"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} — ${t('portfolio.viewDemo')}`}
        >
          {mediaContent}
        </a>
      ) : (
        <Link
          className="project-card-media"
          to={href}
          aria-label={`${title} — ${t('portfolio.viewDemo')}`}
        >
          {mediaContent}
        </Link>
      )}

      <div className="project-card-body">
        <h3 className="project-card-title">
          <Link to={`/projects/${project.slug}`}>{title}</Link>
        </h3>
        <p className="project-card-desc">{desc}</p>

        {showFunctions && (
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
