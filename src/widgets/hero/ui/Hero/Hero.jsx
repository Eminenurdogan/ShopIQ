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
            <p className="Hero__eyebrow">İndirim takibi ve akıllı karşılaştırma</p>
            <h1 className="Hero__title" id="hero-title">Beğendiğin ürünü takip et. Fiyat düştüğünde ilk sen öğren.</h1>
            <p className="Hero__description">
              Tek ürün linkiyle fiyat hareketlerini, mağaza tekliflerini, satıcı güvenini, kargo ve kampanyaları tek ekranda izle. Akıllı öneriler kararını gerektiğinde destekler.
            </p>
            <div id="product-link-form"><ProductLinkForm /></div>
          </div>
          <div className="Hero__visual" aria-hidden="true">
            <div className="Hero__visualGlow" />
            <div className="Hero__dashboard">
              <div className="Hero__dashboardHeader"><span>Takip edilen ürün</span><span className="Hero__status">Takip ediliyor</span></div>
              <div className="Hero__product"><img className="Hero__logo" src={logoImage} alt="" /><div><strong>Premium alışveriş seçimin</strong><span>Fiyat, kampanya ve satıcı analizi</span></div></div>
              <div className="Hero__metrics"><div><span>En iyi teklif</span><strong>₺1.249</strong></div><div><span>Fiyat değişimi</span><strong>↓ %12</strong></div></div>
              <div className="Hero__chart"><span>Fiyat geçmişi</span><div className="Hero__chartLine" /></div>
              <div className="Hero__notice">Fiyat düştü · Bildirim aktif</div>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  )
}
