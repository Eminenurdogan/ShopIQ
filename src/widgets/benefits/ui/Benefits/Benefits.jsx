import { ExternalLink, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './Benefits.css'

const benefits = [
  {
    description: 'Teklifleri tek bir akışta inceleyerek karar sürecini sadeleştirin.',
    icon: SlidersHorizontal,
    title: 'Karşılaştırmayı merkezileştirin',
  },
  {
    description: 'Fiyat ve mağaza tekliflerini bir arada değerlendirerek daha bilinçli seçimler yapın.',
    icon: ShieldCheck,
    title: 'Kararınızı güvenle verin',
  },
  {
    description: 'Tercih ettiğiniz teklifi seçtiğinizde doğrudan mağazaya devam edin.',
    icon: ExternalLink,
    title: 'Doğru mağazaya ilerleyin',
  },
]

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="Benefits">
      <PageContainer>
        <div className="Benefits__content">
          <div className="Benefits__heading">
            <h2 id="benefits-title">Karar vermek daha kolay</h2>
            <p>
              ShopIQ, doğru ürünü ve doğru mağazayı seçmeniz için ihtiyaç duyduğunuz
              karşılaştırma deneyimini sunar.
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
