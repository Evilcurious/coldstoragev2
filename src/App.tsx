import { MotionConfig } from 'framer-motion'
import { Facilities } from './components/Facilities'
import { Hero } from './components/Hero'
import { Products } from './components/Products'
import { QuoteSection } from './components/QuoteSection'
import { Services } from './components/Services'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { WhyChooseUs } from './components/WhyChooseUs'

export default function App() {
  return (
    // "user" disables transform-based motion for visitors who prefer reduced motion; fades remain.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lift"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WhyChooseUs />
        <Services />
        <Facilities />
        <Products />
        <QuoteSection />
      </main>
      <SiteFooter />
    </MotionConfig>
  )
}
