import { motion, useReducedMotion } from 'framer-motion'
import logoImage from '../../../../assets/images/logo/shopiq-logo.png'
import { ProductLinkForm } from '../../../../features/product-link-search/index.js'
import { PageContainer } from '../../../../shared/ui/index.js'
import './Hero.css'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const animation = shouldReduceMotion
    ? undefined
    : {
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: 'var(--space-2)' },
        transition: { duration: 0.3, ease: 'easeOut' },
      }

  return (
    <section aria-labelledby="hero-title" className="Hero">
      <PageContainer>
        <motion.div className="Hero__content" {...animation}>
          <div className="Hero__copy">
            <p className="Hero__eyebrow">AI Shopping Assistant</p>
            <h1 className="Hero__title" id="hero-title">Alışveriş kararını ShopIQ senin için araştırsın.</h1>
            <p className="Hero__description">
              Tek linkle fiyatı, satıcıyı, kampanyayı, kargoyu ve mağaza güvenini birlikte analiz et. Sana uygun teklifi tek ekranda değerlendir.
            </p>
            <ProductLinkForm />
          </div>
          <div className="Hero__visual" aria-hidden="true">
            <div className="Hero__visualGlow" />
            <img className="Hero__logo" src={logoImage} alt="" />
            <div className="Hero__insight Hero__insight--top">Akıllı teklif analizi</div>
            <div className="Hero__insight Hero__insight--bottom">Güvenle karar ver</div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  )
}
