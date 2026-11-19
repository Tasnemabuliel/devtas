export type ProjectCategory =
  | 'erp'
  | 'engineering'
  | 'food-demo'
  | 'business'
  | 'lab'
  | 'websites'
  | 'systems'

export type ProjectOrigin = 'employment' | 'independent'

export type PortfolioFilter =
  | 'all'
  | 'websites'
  | 'systems'
  | 'ecommerce'
  | 'integrations'
  | 'wego'

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
  /** Old slugs that should still resolve */
  aliases?: string[]
  category: ProjectCategory
  featured: boolean
  image: string
  demos: DemoLink[]
  technologies: string[]
  credentials?: DemoCredential[]
  /** How the work relates to DEVATAS branding */
  origin: ProjectOrigin
  creditKey?: string
  /** i18n path prefix under portfolio.items.<id> */
  i18nKey: string
  /** Extra filter facets beyond category/origin */
  facets?: Array<'ecommerce' | 'integrations'>
}

/**
 * Central portfolio registry — add future projects here.
 * Employment systems are experience showcases, not DEVATAS-branded products.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'sukria',
    slug: 'sukria',
    category: 'erp',
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
    featured: true,
    image: '/projects/voltara.png',
    demos: [
      { labelKey: 'portfolio.demoLabels.office', url: 'https://formerapp.vercel.app/login' },
      { labelKey: 'portfolio.demoLabels.field', url: 'https://electrict-enginer.vercel.app/login' },
    ],
    technologies: ['React', 'TypeScript', 'Vercel'],
    credentials: [
      {
        roleKey: 'portfolio.items.voltara.roles.office',
        username: 'admin',
        password: 'VoltaraDemo123!',
      },
      {
        roleKey: 'portfolio.items.voltara.roles.field',
        username: 'foreman1',
        password: 'VoltaraField123!',
      },
    ],
    origin: 'employment',
    creditKey: 'portfolio.credits.employment',
    i18nKey: 'voltara',
  },
  {
    id: 'orchard-crisp',
    slug: 'orchard-crisp',
    category: 'food-demo',
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
    category: 'websites',
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
    category: 'websites',
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
    featured: true,
    image: '/projects/devtas-site.png',
    demos: [{ labelKey: 'portfolio.demoLabels.liveDemo', url: '/#home' }],
    technologies: ['React', 'TypeScript', 'Vite', 'i18n', 'RTL'],
    origin: 'independent',
    i18nKey: 'devtas',
  },
]

export const projectCategories: ProjectCategory[] = [
  'erp',
  'engineering',
  'food-demo',
  'business',
  'lab',
  'systems',
  'websites',
]

export const portfolioFilters: PortfolioFilter[] = [
  'all',
  'websites',
  'systems',
  'ecommerce',
  'integrations',
  'wego',
]

const SYSTEM_CATEGORIES: ProjectCategory[] = ['erp', 'engineering', 'business', 'lab', 'systems']

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug || p.aliases?.includes(slug))
}

export function getFeaturedProjects() {
  return portfolioProjects.filter((p) => p.featured)
}

export function getFeaturedSystems() {
  return getFeaturedProjects().filter(
    (p) => p.origin === 'independent' && p.category !== 'websites'
  )
}

export function getFeaturedWebsites() {
  return getFeaturedProjects().filter((p) => p.category === 'websites' && p.origin === 'independent')
}

export function getWegoExperienceProjects() {
  return getFeaturedProjects().filter((p) => p.origin === 'employment')
}

export function matchesPortfolioFilter(project: PortfolioProject, filter: PortfolioFilter) {
  if (filter === 'all') return true
  if (filter === 'wego') return project.origin === 'employment'
  if (filter === 'websites') return project.category === 'websites'
  if (filter === 'systems') return SYSTEM_CATEGORIES.includes(project.category)
  if (filter === 'ecommerce') return project.facets?.includes('ecommerce') || project.category === 'food-demo'
  if (filter === 'integrations') return project.facets?.includes('integrations') === true
  return true
}
