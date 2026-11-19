import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Motion'
import type { PortfolioProject } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'

type Props = {
  project: PortfolioProject
  flip?: boolean
  delay?: number
}

export default function ShowcaseProject({ project, flip = false, delay = 0 }: Props) {
  const { t } = useI18n()
  const base = `portfolio.items.${project.i18nKey}`
  const title = t(`${base}.name`)
  const desc = t(`${base}.short`)
  const functions = t(`${base}.functions`)
  const demo = project.demos[0]
  const href = demo?.url?.startsWith('http') ? demo.url : `/projects/${project.slug}`
  const host = demo?.url?.startsWith('http')
    ? new URL(demo.url).hostname.replace(/^www\./, '')
    : 'devtas'

  return (
    <Reveal delay={delay} className={`showcase-row${flip ? ' showcase-row--flip' : ''}`}>
      <a
        className="showcase-media"
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={`${title} — ${t('portfolio.viewDemo')}`}
      >
        <div className="browser-mockup">
          <div className="browser-mockup-chrome" aria-hidden="true">
            <span className="browser-dot browser-dot--red" />
            <span className="browser-dot browser-dot--yellow" />
            <span className="browser-dot browser-dot--green" />
            <span className="browser-mockup-url">{host}</span>
          </div>
          <div className="browser-mockup-viewport">
            {project.image ? (
              <img src={project.image} alt="" className="project-card-img" loading="lazy" decoding="async" />
            ) : (
              <div className="project-card-fallback">{title.slice(0, 1)}</div>
            )}
            <div className="project-card-gradient" aria-hidden="true" />
          </div>
        </div>
      </a>

      <div className="showcase-copy">
        <p className="showcase-kicker">{t(`portfolio.categories.${project.category}`)}</p>
        <h3 className="showcase-title">
          <Link to={`/projects/${project.slug}`}>{title}</Link>
        </h3>
        <p className="showcase-desc">{desc}</p>
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
        <div className="showcase-actions">
          {demo && (
            <a
              className="btn project-btn-primary"
              href={demo.url}
              target={demo.url.startsWith('http') ? '_blank' : undefined}
              rel={demo.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {t('portfolio.viewDemo')}
              <ArrowUpRight size={16} aria-hidden style={{ marginInlineStart: 6 }} />
            </a>
          )}
          <Link className="btn outline project-btn-secondary" to={`/projects/${project.slug}`}>
            {t('portfolio.viewDetails')}
          </Link>
        </div>
      </div>
    </Reveal>
  )
}
