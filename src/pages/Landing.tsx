import { Suspense, lazy } from 'react'
import Loader from '../components/Loader'

const Hero = lazy(() => import('./Home'))
const FeaturedProjects = lazy(() => import('./FeaturedProjects'))
const Services = lazy(() => import('./Services'))
const Tech = lazy(() => import('./Tech'))
const Process = lazy(() => import('./Process'))
const About = lazy(() => import('./About'))
const FAQSection = lazy(() => import('../components/FAQ/FAQSection'))
const Contact = lazy(() => import('./Contact'))

export default function Landing() {
  return (
    <Suspense fallback={<Loader />}>
      <Hero />
      <FeaturedProjects />
      <Services />
      <Tech />
      <Process />
      <About />
      <FAQSection />
      <Contact />
    </Suspense>
  )
}
