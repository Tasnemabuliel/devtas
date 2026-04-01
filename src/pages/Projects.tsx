import type { CSSProperties } from 'react'
import './Projects.css'
import ProjectCard from '../components/ProjectCard'
import { useI18n } from '../i18n/I18nProvider'
import { ACADEMY_SITE_HREF, FITNESS_COACH_SITE_HREF } from '../constants/siteLinks'

export default function Projects() {
  const { t } = useI18n()

  const projects = [
    {
      title: t('projects.items.links.title'),
      desc: t('projects.items.links.desc'),
      tech: ['Next.js', 'React', 'Vercel'],
      href: 'https://orelkoriatcoach.vercel.app/links',
      ctaLabel: t('projects.cta.viewSite'),
    },
    {
      title: t('projects.items.coach.title'),
      desc: t('projects.items.coach.desc'),
      tech: ['Next.js', 'Firebase', 'Vercel'],
      href: FITNESS_COACH_SITE_HREF,
      ctaLabel: t('projects.cta.viewSite'),
    },
    {
      title: t('projects.items.academy.title'),
      desc: t('projects.items.academy.desc'),
      tech: [
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Supabase',
        'REST API',
        'Resend',
        'Postman',
        'Vercel',
      ],
      href: ACADEMY_SITE_HREF,
      ctaLabel: t('projects.cta.viewSite'),
    },
    {
      title: t('projects.items.devtas.title'),
      desc: t('projects.items.devtas.desc'),
      tech: ['React', 'TypeScript', 'Vite', 'i18n', 'RTL'],
      href: '#home',
      ctaLabel: t('projects.cta.liveDemo'),
    },
  ]

  const revealDelays = ['0ms', '120ms', '240ms', '360ms'] as const
  
  return (
    <section id="projects" className="projects-section" data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>
      </header>
      <div className="projects-grid">
        {projects.map((p, index) => (
          <ProjectCard
            key={p.title}
            title={p.title}
            desc={p.desc}
            tech={p.tech}
            href={p.href}
            ctaLabel={p.ctaLabel}
            revealDelay={revealDelays[index] ?? '0ms'}
          />
        ))}
      </div>
    </section>
  )
}
