import { Building2 } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './StoreShowcase.css'

const placeholderStores = ['Mağaza', 'Mağaza', 'Mağaza', 'Mağaza']

export function StoreShowcase() {
  return (
    <section aria-labelledby="store-showcase-title" className="StoreShowcase" id="platform">
      <PageContainer>
        <div className="StoreShowcase__heading">
          <h2 id="store-showcase-title">Farklı teklifleri tek yerde değerlendir</h2>
          <p>ShopIQ, birden fazla mağazadaki teklifleri karşılaştırma deneyiminde bir araya getirmek için tasarlanır. Mağaza bağlantıları demo aşamasında gösterilir.</p>
        </div>
        <div className="StoreShowcase__grid">
          {placeholderStores.map((store, index) => (
            <div className="StoreShowcase__card" key={`${store}-${index}`}>
              <Building2 aria-hidden="true" className="StoreShowcase__icon" />
              <span>{store}</span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
