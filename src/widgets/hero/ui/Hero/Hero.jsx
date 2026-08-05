import { motion, useReducedMotion } from 'framer-motion'
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
          <h1 className="Hero__title" id="hero-title">
            Alışverişte En Doğru Kararı Ver.
          </h1>
          <p className="Hero__description">
            Ürün bağlantısını paylaş, farklı mağazalardaki fiyatları tek ekranda
            karşılaştır.
          </p>
          <ProductLinkForm />
        </motion.div>
      </PageContainer>
    </section>
  )
}
