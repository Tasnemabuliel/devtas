import type { CSSProperties } from 'react'

type Base = {
  title: string
  caption: string
  href?: string
  floatClass?: string
  revealStyle?: CSSProperties
  'aria-label'?: string
}

export type HeroMockupCardProps =
  | (Base & {
      variant: 'full'
      urlLabel: string
      ctaLabel: string
    })
  | (Base & {
      variant: 'compact'
      compactLinkLabel: string
    })

export default function HeroMockupCard(props: HeroMockupCardProps) {
  const href = props.href ?? '#projects'
  const floatClass = props.floatClass ?? 'float-slow'
  const revealStyle = props.revealStyle
  const ariaLabel = props['aria-label']

  if (props.variant === 'compact') {
    const { title, caption, compactLinkLabel } = props
    return (
      <article
        className={`mockup-card mockup-mini mockup-mini--hero ${floatClass}`}
        style={revealStyle}
        aria-label={ariaLabel ?? title}
      >
        <div className="mockup-title">{title}</div>
        <div className="mockup-caption">{caption}</div>
        <a className="mockup-link" href={href}>
          {compactLinkLabel}
        </a>
      </article>
    )
  }

  const { title, caption, urlLabel, ctaLabel } = props

  return (
    <article
      className={`mockup-card mockup-main ${floatClass}`}
      style={revealStyle}
      aria-label={ariaLabel ?? title}
    >
      <div className="mockup-topbar" aria-hidden="true">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="mockup-url" dir="ltr">
          {urlLabel}
        </span>
      </div>

      <div className="mockup-body">
        <div className="mockup-preview" aria-hidden="true">
          <div className="preview-line w80" />
          <div className="preview-line w60" />
          <div className="preview-blocks">
            <div className="preview-block" />
            <div className="preview-block" />
            <div className="preview-block" />
          </div>
        </div>

        <div className="mockup-meta">
          <div>
            <div className="mockup-title">{title}</div>
            <div className="mockup-caption">{caption}</div>
          </div>
          <a className="mockup-btn" href={href}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </article>
  )
}
