import type { CSSProperties } from 'react'

type Props = {
  title: string
  desc: string
  img?: string
  tech?: string[]
  href?: string
  ctaLabel?: string
  revealDelay?: string
}

export default function ProjectCard({ title, desc, img, tech, href, ctaLabel, revealDelay = '0ms' }: Props) {
  return (
    <article className="project-card" data-reveal="up" style={{ '--reveal-delay': revealDelay } as CSSProperties}>
      <div className="project-media">
        {img ? (
          <img src={img} alt={title} className="project-img" loading="lazy" />
        ) : (
          <div className="project-mock" aria-hidden="true">
            <div className="project-mock-topbar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="project-mock-title">{title}</span>
            </div>
            <div className="project-mock-body">
              <div className="mock-line w80" />
              <div className="mock-line w60" />
              <div className="mock-grid">
                <div className="mock-cell" />
                <div className="mock-cell" />
                <div className="mock-cell" />
              </div>
              <div className="mock-cta" />
            </div>
          </div>
        )}
      </div>
      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{desc.replace(/<\/?strong>/g, '')}</p>
      </div>
      {tech && (
        <div className="project-tech" aria-label="Tech stack">
          {tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
        </div>
      )}

      {href && (
        <div className="project-actions">
          <a className="btn small" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            {ctaLabel || 'View'}
          </a>
        </div>
      )}
    </article>
  )
}
