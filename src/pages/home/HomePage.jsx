import { Benefits } from '../../widgets/benefits/index.js'
import { Faq } from '../../widgets/faq/index.js'
import { FeatureHighlights } from '../../widgets/feature-highlights/index.js'
import { Hero } from '../../widgets/hero/index.js'
import { HowItWorks } from '../../widgets/how-it-works/index.js'
import { SiteFooter } from '../../widgets/site-footer/index.js'
import { StoreShowcase } from '../../widgets/store-showcase/index.js'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureHighlights />
      <HowItWorks />
      <Benefits />
      <StoreShowcase />
      <Faq />
      <SiteFooter />
    </>
  )
}
