import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import './Projects.css'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const { t } = useI18n()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <section className="section project-detail">
        <h1 className="section-title">{t('portfolio.allTitle')}</h1>
        <Link className="btn outline" to="/projects">
          {t('portfolio.backToProjects')}
        </Link>
      </section>
    )
  }

  const base = `portfolio.items.${project.i18nKey}`

  return (
    <article className="section project-detail" data-reveal="up">
      <Link className="project-back" to="/projects">
        ← {t('portfolio.backToProjects')}
      </Link>

      <div className="project-detail-grid">
        <div className="project-detail-media">
          {project.image ? (
            <img src={project.image} alt="" className="project-detail-img" />
          ) : (
            <div className="project-card-fallback project-detail-fallback" aria-hidden="true">
              <span>{t(`${base}.name`).slice(0, 1)}</span>
            </div>
          )}
        </div>

        <div className="project-detail-copy">
          <div className="project-detail-meta">
            <p className="section-eyebrow">{t(`portfolio.categories.${project.category}`)}</p>
            <span className={`project-card-origin project-card-origin--${project.origin}`}>
              {project.origin === 'employment'
                ? t('portfolio.originEmployment')
                : t('portfolio.originIndependent')}
            </span>
          </div>
          <h1 className="section-title">{t(`${base}.name`)}</h1>
          <p className="section-subtitle">{t(`${base}.short`)}</p>

          <div className="project-detail-blocks">
            <section>
              <h2>{t('portfolio.purpose')}</h2>
              <p>{t(`${base}.purpose`)}</p>
            </section>
            <section>
              <h2>{t('portfolio.problem')}</h2>
              <p>{t(`${base}.problem`)}</p>
            </section>
            <section>
              <h2>{t('portfolio.solution')}</h2>
              <p>{t(`${base}.solution`)}</p>
            </section>
            {t(`${base}.functions`) !== `${base}.functions` && (
              <section>
                <h2>{t('portfolio.functions')}</h2>
                <p>{t(`${base}.functions`)}</p>
              </section>
            )}
          </div>

          {project.technologies.length > 0 && (
            <div>
              <h2>{t('portfolio.tech')}</h2>
              <ul className="project-tech">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2>{t('portfolio.demos')}</h2>
            <div className="project-card-actions">
              {project.demos.map((demo) => (
                <a
                  key={demo.url}
                  className="btn project-btn-primary"
                  href={demo.url}
                  target={demo.url.startsWith('http') ? '_blank' : undefined}
                  rel={demo.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {t(demo.labelKey)}
                </a>
              ))}
            </div>
          </div>

          {project.credentials && project.credentials.length > 0 && (
            <div className="project-credentials">
              <h2>{t('portfolio.credentials')}</h2>
              <ul>
                {project.credentials.map((cred) => (
                  <li key={`${cred.username}-${cred.roleKey}`}>
                    <strong>{t(cred.roleKey)}</strong>
                    <span dir="ltr">
                      {cred.username}
                      {cred.password ? ` / ${cred.password}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.creditKey && (
            <p className="project-credit">
              <strong>{t('portfolio.credit')}: </strong>
              {t(project.creditKey)}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
