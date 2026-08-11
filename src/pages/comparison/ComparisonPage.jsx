import {
  BadgeCheck,
  ExternalLink,
  PackageSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { comparisonOffers, comparisonProduct } from '../../entities/comparison/model/mockComparison.js'
import { ProductLinkForm } from '../../features/product-link-search/index.js'
import { Button, PageContainer } from '../../shared/ui/index.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import './ComparisonPage.css'

function getMerchantInitial(merchant) {
  return merchant.slice(0, 1)
}

export function ComparisonPage() {
  const bestOffer = comparisonOffers[0]

  return (
    <DashboardLayout>
      <main className="ComparisonPage">
        <PageContainer width="wide">
          <header className="ComparisonPage__header">
            <div>
              <h1>Karşılaştır</h1>
              <p>Bir ürünü farklı mağazalardaki teklifler arasında karşılaştır ve sana en uygun seçeneği bul.</p>
            </div>
            <Button icon={<PackageSearch aria-hidden="true" />}>Yeni Karşılaştırma</Button>
          </header>

          <section className="ComparisonPage__search" aria-labelledby="comparison-search-title">
            <div>
              <h2 id="comparison-search-title">Ürün bağlantısı ekle</h2>
              <p>ShopIQ, ürünü ve teklifleri değerlendirmek için bağlantıyı analiz eder.</p>
            </div>
            <ProductLinkForm />
          </section>

          <section className="ComparisonPage__summary" aria-labelledby="product-summary-title">
            <div className="ComparisonPage__productVisual">
              <PackageSearch aria-hidden="true" />
            </div>
            <div className="ComparisonPage__summaryInfo">
              <p>{comparisonProduct.brand}</p>
              <h2 id="product-summary-title">{comparisonProduct.name}</h2>
              <div className="ComparisonPage__meta">
                <span>{comparisonProduct.model}</span>
                <span>{comparisonProduct.variant}</span>
                <span>{comparisonProduct.category}</span>
              </div>
            </div>
            <p className="ComparisonPage__meta">Son güncelleme: {comparisonProduct.updatedAt}</p>
          </section>

          <section className="ComparisonPage__bestOffer" aria-labelledby="best-offer-title">
            <Sparkles aria-hidden="true" />
            <div className="ComparisonPage__bestOfferInfo">
              <span className="ComparisonPage__badge"><BadgeCheck aria-hidden="true" />En İyi Teklif</span>
              <h2 id="best-offer-title">{bestOffer.merchant}</h2>
              <p>Ücretsiz kargo, stokta ürün ve yüksek satıcı güveni ile en dengeli toplam maliyet.</p>
            </div>
            <strong className="ComparisonPage__bestOfferPrice">{bestOffer.total}</strong>
          </section>

          <section className="ComparisonPage__offers" aria-labelledby="offers-title">
            <div className="ComparisonPage__sectionHeading">
              <div>
                <h2 id="offers-title">Teklifler</h2>
                <p>Fiyat, teslimat ve satıcı bilgilerini birlikte değerlendir.</p>
              </div>
              <ShieldCheck aria-hidden="true" />
            </div>
            <div className="ComparisonPage__offersGrid">
              {comparisonOffers.map((offer) => (
                <article className="ComparisonPage__offer" key={offer.merchant}>
                  <div className="ComparisonPage__offerHeader">
                    <div className="ComparisonPage__merchantAvatar" aria-hidden="true">{getMerchantInitial(offer.merchant)}</div>
                    <div>
                      <h3>{offer.merchant}</h3>
                      <p className="ComparisonPage__offerMeta">Satıcı: {offer.seller}</p>
                    </div>
                  </div>
                  <span className="ComparisonPage__badge">{offer.label}</span>
                  <div className="ComparisonPage__offerDetails">
                    <div><span>Ürün fiyatı</span><strong>{offer.price}</strong></div>
                    <div><span>Kargo</span><strong>{offer.delivery}</strong></div>
                  </div>
                  <div className="ComparisonPage__total">
                    <div><p>Toplam maliyet</p><strong className="ComparisonPage__price">{offer.total}</strong></div>
                    <span className="ComparisonPage__offerMeta">Stokta</span>
                  </div>
                  <footer className="ComparisonPage__offerFooter">
                    <span className="ComparisonPage__trust"><ShieldCheck aria-hidden="true" />{offer.trust} · {offer.updatedAt}</span>
                    <Button icon={<ExternalLink aria-hidden="true" />} variant="secondary">Mağazaya Git</Button>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
