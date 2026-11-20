export type ProjectCategory =
  | 'erp'
  | 'engineering'
  | 'food-demo'
  | 'business'
  | 'lab'
  | 'websites'
  | 'landing'
  | 'systems'

export type ProjectKind = 'website' | 'landing' | 'system'

export type ProjectOrigin = 'employment' | 'independent'

export type PortfolioFilter = 'all' | 'websites' | 'systems'

export type DemoLink = {
  labelKey: string
  url: string
}

export type DemoCredential = {
  roleKey: string
  username: string
  password?: string
  noteKey?: string
}

export type PortfolioProject = {
  id: string
  slug: string
  aliases?: string[]
  category: ProjectCategory
  kind: ProjectKind
  featured: boolean
  image: string
  demos: DemoLink[]
  technologies: string[]
  credentials?: DemoCredential[]
  origin: ProjectOrigin
  creditKey?: string
  i18nKey: string
  facets?: Array<'ecommerce' | 'integrations'>
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'sukria',
    slug: 'sukria',
    category: 'erp',
    kind: 'system',
    featured: true,
    image: '/projects/sukria.png',
    demos: [{ labelKey: 'portfolio.demoLabels.primary', url: 'https://sweetapp-demo.vercel.app/login?next=%2F' }],
    technologies: ['React', 'TypeScript', 'Vercel'],
    credentials: [
      { roleKey: 'portfolio.items.sukria.roles.admin', username: 'demo-admin' },
      { roleKey: 'portfolio.items.sukria.roles.manager', username: 'demo-manager' },
      { roleKey: 'portfolio.items.sukria.roles.user', username: 'demo-employee' },
    ],
    origin: 'employment',
    creditKey: 'portfolio.credits.employment',
    i18nKey: 'sukria',
    facets: ['integrations'],
  },
  {
    id: 'voltara',
    slug: 'voltara',
    category: 'engineering',
    kind: 'system',
    featured: true,
    image: '/projects/voltara.png',
    demos: [
      { labelKey: 'portfolio.demoLabels.office', url: 'https://formerapp.vercel.app/login' },
      { labelKey: 'portfolio.demoLabels.field', url: 'https://electrict-enginer.vercel.app/login' },
    ],
    technologies: ['React', 'TypeScript', 'Vercel'],
    credentials: [
      { roleKey: 'portfolio.items.voltara.roles.office', username: 'admin', password: 'VoltaraDemo123!' },
      { roleKey: 'portfolio.items.voltara.roles.field', username: 'foreman1', password: 'VoltaraField123!' },
    ],
    origin: 'employment',
    creditKey: 'portfolio.credits.employment',
    i18nKey: 'voltara',
  },
  {
    id: 'orchard-crisp',
    slug: 'orchard-crisp',
    category: 'food-demo',
    kind: 'system',
    featured: true,
    image: '/projects/orchard.png',
    demos: [{ labelKey: 'portfolio.demoLabels.primary', url: 'https://crispy-demo.vercel.app/' }],
    technologies: ['React', 'Vercel'],
    origin: 'independent',
    creditKey: 'portfolio.credits.devtasDemo',
    i18nKey: 'orchard',
    facets: ['ecommerce', 'integrations'],
  },
  {
    id: 'logistics-system',
    slug: 'logistics-system',
    aliases: ['wego-business'],
    category: 'business',
    kind: 'system',
    featured: true,
    image: '/projects/wego.png',
    demos: [{ labelKey: 'portfolio.demoLabels.primary', url: 'https://mangebuss.vercel.app/login?next=%2F' }],
    technologies: ['React', 'TypeScript', 'Vercel'],
    origin: 'employment',
    creditKey: 'portfolio.credits.employment',
    i18nKey: 'logistics',
    facets: ['integrations'],
  },
  {
    id: 'denova',
    slug: 'denova',
    category: 'lab',
    kind: 'system',
    featured: true,
    image: '/projects/denova.png',
    demos: [{ labelKey: 'portfolio.demoLabels.primary', url: 'https://opal-demo-mu.vercel.app/' }],
    technologies: ['React', 'TypeScript', 'Vercel'],
    credentials: [
      { roleKey: 'portfolio.items.denova.roles.admin', username: 'admin', password: '1234' },
      { roleKey: 'portfolio.items.denova.roles.owner', username: 'noa', password: '1234' },
      { roleKey: 'portfolio.items.denova.roles.secretary', username: 'lior', password: '1234' },
      { roleKey: 'portfolio.items.denova.roles.designer', username: 'maya', password: '1234' },
      { roleKey: 'portfolio.items.denova.roles.doctor', username: 'drlevi', password: '1234' },
    ],
    origin: 'employment',
    creditKey: 'portfolio.credits.employment',
    i18nKey: 'denova',
  },
  {
    id: 'ok-studio',
    slug: 'ok-studio',
    category: 'systems',
    kind: 'system',
    featured: true,
    image: '/projects/ok-studio.png',
    demos: [{ labelKey: 'portfolio.demoLabels.viewSite', url: 'https://ok-trainingcenter.com/' }],
    technologies: ['React', 'TypeScript', 'Node.js', 'Full-Stack'],
    origin: 'independent',
    i18nKey: 'okStudio',
  },
  {
    id: 'haotzma',
    slug: 'haotzma',
    category: 'websites',
    kind: 'website',
    featured: true,
    image: '/projects/haotzma.png',
    demos: [{ labelKey: 'portfolio.demoLabels.viewSite', url: 'https://haotzma-habib.com/he' }],
    technologies: ['Next.js', 'React', 'i18n', 'RTL', 'Vercel'],
    origin: 'independent',
    i18nKey: 'haotzma',
    facets: ['integrations'],
  },
  {
    id: 'mila',
    slug: 'mila',
    category: 'websites',
    kind: 'website',
    featured: true,
    image: '/projects/mila.png',
    demos: [{ labelKey: 'portfolio.demoLabels.viewSite', url: 'https://milafin.com/' }],
    technologies: ['Next.js', 'React', 'TypeScript', 'Vercel'],
    origin: 'independent',
    i18nKey: 'mila',
    facets: ['integrations'],
  },
  {
    id: 'smart-links',
    slug: 'smart-links',
    category: 'landing',
    kind: 'landing',
    featured: true,
    image: '/projects/smart-links.png',
    demos: [{ labelKey: 'portfolio.demoLabels.viewSite', url: 'https://orelkoriatcoach.vercel.app/links' }],
    technologies: ['Next.js', 'React', 'Vercel'],
    origin: 'independent',
    i18nKey: 'links',
  },
  {
    id: 'fitness-coach',
    slug: 'fitness-coach',
    category: 'websites',
    kind: 'website',
    featured: true,
    image: '/projects/fitness-coach.png',
    demos: [{ labelKey: 'portfolio.demoLabels.viewSite', url: 'https://www.orelkorait.com' }],
    technologies: ['Next.js', 'Firebase', 'Vercel'],
    origin: 'independent',
    i18nKey: 'coach',
  },
  {
    id: 'academy',
    slug: 'academy',
    category: 'systems',
    kind: 'system',
    featured: true,
    image: '/projects/academy.png',
    demos: [{ labelKey: 'portfolio.demoLabels.viewSite', url: 'https://devtasweb.vercel.app' }],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Supabase', 'Vercel'],
    origin: 'independent',
    i18nKey: 'academy',
  },
  {
    id: 'devtas-site',
    slug: 'devtas-site',
    category: 'websites',
    kind: 'website',
    featured: true,
    image: '/projects/devtas-site.png',
    demos: [{ labelKey: 'portfolio.demoLabels.liveDemo', url: '/#home' }],
    technologies: ['React', 'TypeScript', 'Vite', 'i18n', 'RTL'],
    origin: 'independent',
    i18nKey: 'devtas',
  },
]

export const portfolioFilters: PortfolioFilter[] = ['all', 'websites', 'systems']

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug || p.aliases?.includes(slug))
}

export function getFeaturedProjects() {
  return portfolioProjects.filter((p) => p.featured)
}

export function isWebsiteProject(project: PortfolioProject) {
  return project.kind === 'website' || project.kind === 'landing'
}

export function isSystemProject(project: PortfolioProject) {
  return project.kind === 'system'
}

export function getWebsiteProjects() {
  return portfolioProjects.filter((p) => p.featured && isWebsiteProject(p))
}

export function getSystemProjects() {
  return portfolioProjects.filter((p) => p.featured && isSystemProject(p))
}

export function matchesPortfolioFilter(project: PortfolioProject, filter: PortfolioFilter) {
  if (filter === 'all') return true
  if (filter === 'websites') return isWebsiteProject(project)
  if (filter === 'systems') return isSystemProject(project)
  return true
}
