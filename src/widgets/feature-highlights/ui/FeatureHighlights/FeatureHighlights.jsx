import { BellRing, ChartNoAxesCombined, ScanSearch, Sparkles } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './FeatureHighlights.css'

const highlights = [
  {
    description: 'Beğendiğin ürünü takip et; fiyat düştüğünde ve yeni fırsat oluştuğunda zamanında haberdar ol.',
    icon: BellRing,
    title: 'İndirimleri Kaçırma',
  },
  {
    description: 'Farklı mağazalardaki fiyat, kargo ve güven bilgilerini tek karşılaştırma akışında değerlendir.',
    icon: ScanSearch,
    title: 'Akıllı Karşılaştırma',
  },
  {
    description: 'Fiyat hareketlerini tek bakışta gör; ürünün uygun zamanı hakkında daha bilinçli karar ver.',
    icon: ChartNoAxesCombined,
    title: 'Fiyat Geçmişi',
  },
  {
    description: 'Fiyat, teklif ve takip verilerini değerlendirirken ihtiyaç duyduğunda karar desteği al.',
    icon: Sparkles,
    title: 'AI Alışveriş Desteği',
  },
]

export function FeatureHighlights() {
  return (
    <section aria-labelledby="feature-highlights-title" className="FeatureHighlights" id="features">
      <PageContainer>
        <div className="FeatureHighlights__heading">
          <h2 id="feature-highlights-title">Fırsatları takip etmek artık daha kolay</h2>
          <p>ShopIQ, ürün takibini, fiyat hareketlerini ve karşılaştırmayı tek karar akışında birleştirir.</p>
        </div>
        <div className="FeatureHighlights__grid">
          {highlights.map(({ description, icon: Icon, title }) => (
            <article className="FeatureHighlights__card" key={title}>
              <Icon aria-hidden="true" className="FeatureHighlights__icon" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
