import { LayoutDashboard } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../../../assets/images/logo/shopiq-logo.png'
import { ProductLinkForm } from '../../../../features/product-link-search/index.js'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import { Button, PageContainer } from '../../../../shared/ui/index.js'
import './Hero.css'

export function Hero() {
  const navigate = useNavigate()
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
            <p className="Hero__eyebrow">Ürün takibi · fiyat fırsatları · karar desteği</p>
            <h1 className="Hero__title" id="hero-title">Ürünü bul. Takibe al. Doğru zamanda karar ver.</h1>
            <p className="Hero__description">
              Ürün bağlantısını ekle; ShopIQ fiyat hareketlerini ve teklifleri senin için takip etsin. İndirim geldiğinde fırsatı kaçırmadan daha bilinçli karar ver.
            </p>
            <div className="Hero__form" id="product-link-form">
              <ProductLinkForm submitLabel="Ürünü Takip Et" />
              <p>Bağlantını paylaş; demo deneyiminde ürün takibi, fiyat değişimi ve karşılaştırma akışını hemen incele.</p>
            </div>
            <Button icon={<LayoutDashboard aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.DASHBOARD)} variant="secondary">
              Dashboard’u Keşfet
            </Button>
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
