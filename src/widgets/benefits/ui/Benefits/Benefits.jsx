import { BellRing, CircleDollarSign, LayoutDashboard } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './Benefits.css'

const benefits = [
  {
    description: 'Her gün aynı ürünü kontrol etmek yerine fiyat hareketlerini ShopIQ üzerinden takip edin.',
    icon: BellRing,
    title: 'Sürekli fiyat kontrolü yapma',
  },
  {
    description: 'İndirimleri, fiyat değişimlerini ve yeni fırsatları tek merkezden görün.',
    icon: CircleDollarSign,
    title: 'Fırsatları kaçırma',
  },
  {
    description: 'Fiyat, kargo ve mağaza güvenini birlikte değerlendir; alışveriş kararını Dashboard’dan yönet.',
    icon: LayoutDashboard,
    title: 'Toplam maliyeti tek yerde gör',
  },
]

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="Benefits">
      <PageContainer>
        <div className="Benefits__content">
          <div className="Benefits__heading">
          <h2 id="benefits-title">Alışveriş takibini sana bırakmayan deneyim</h2>
            <p>
              ShopIQ, takip, fiyat fırsatları ve karşılaştırmayı tek akışta birleştirerek karar vermeyi sadeleştirir.
            </p>
          </div>
          <ul className="Benefits__list">
            {benefits.map(({ description, icon: Icon, title }) => (
              <li className="Benefits__item" key={title}>
                <Icon aria-hidden="true" className="Benefits__icon" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  )
}
