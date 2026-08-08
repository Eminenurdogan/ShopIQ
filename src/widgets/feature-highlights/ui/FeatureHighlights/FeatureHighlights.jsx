import { BadgeCheck, Link2, ScanSearch, Timer } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './FeatureHighlights.css'

const highlights = [
  {
    description: 'Farklı mağazalardaki teklifleri tek bir karşılaştırma akışında görün.',
    icon: ScanSearch,
    title: 'Akıllı Karşılaştırma',
  },
  {
    description: 'Ürün ve teklif bilgilerini daha bilinçli kararlar için birlikte değerlendirin.',
    icon: BadgeCheck,
    title: 'Güvenilir Sonuçlar',
  },
  {
    description: 'Mağazaları tek tek gezmek yerine ihtiyacınız olan bilgiyi tek ekranda bulun.',
    icon: Timer,
    title: 'Zamandan Tasarruf',
  },
  {
    description: 'Başlamak için yalnızca ürün bağlantısını paylaşmanız yeterli.',
    icon: Link2,
    title: 'Tek Link ile Analiz',
  },
]

export function FeatureHighlights() {
  return (
    <section aria-labelledby="feature-highlights-title" className="FeatureHighlights" id="features">
      <PageContainer>
        <div className="FeatureHighlights__heading">
          <h2 id="feature-highlights-title">Daha sade bir alışveriş deneyimi</h2>
          <p>ShopIQ, karşılaştırma sürecini daha anlaşılır hale getirir.</p>
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
