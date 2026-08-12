import {
  BadgeCheck,
  ExternalLink,
  PackagePlus,
  PackageSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useEffect, useMemo, useNavigate, useSearchParams, useState } from 'react'
import {
  comparisonFilters,
  comparisonOffers,
  comparisonPriceHistory,
  comparisonProduct,
  comparisonSortOptions,
} from '../../entities/comparison/model/mockComparison.js'
import { ProductLinkForm } from '../../features/product-link-search/index.js'
import { APP_ROUTES } from '../../shared/config/index.js'
import { buildProductContextUrl, readProductContext } from '../../shared/lib/productContext.js'
import { Button, PageContainer, Skeleton, StatusMessage } from '../../shared/ui/index.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import './ComparisonPage.css'

const comparisonState = 'ready'

function getMerchantInitial(merchant) {
  return merchant.slice(0, 1)
}

function formatPrice(price) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(price).replace(/^/, '₺')
}

function getDeliveryValue(delivery) {
  return Number(delivery.replace(/[^0-9]/g, '')) || 0
}

function getContextualOffers(price) {
  const contextPrice = Number(price?.replace(/[^0-9]/g, ''))

  if (!contextPrice) {
    return comparisonOffers
  }

  const baseTotal = comparisonOffers[0].totalValue

  return comparisonOffers.map((offer) => {
    const totalValue = contextPrice + (offer.totalValue - baseTotal)
    const priceValue = totalValue - getDeliveryValue(offer.delivery)

    return {
      ...offer,
      price: formatPrice(priceValue),
      priceValue,
      total: formatPrice(totalValue),
      totalValue,
    }
  })
}

function getFilteredOffers(offers, filter) {
  if (filter === 'lowest-price') {
    const lowestPrice = Math.min(...offers.map(({ priceValue }) => priceValue))
    return offers.filter(({ priceValue }) => priceValue === lowestPrice)
  }

  if (filter === 'free-delivery') {
    return offers.filter(({ isFreeDelivery }) => isFreeDelivery)
  }

  if (filter === 'in-stock') {
    return offers.filter(({ isInStock }) => isInStock)
  }

  return offers
}

function sortOffers(offers, sort) {
  const sortedOffers = [...offers]

  if (sort === 'trust') {
    return sortedOffers.sort((firstOffer, secondOffer) => secondOffer.trustScore - firstOffer.trustScore)
  }

  if (sort === 'delivery') {
    return sortedOffers.sort((firstOffer, secondOffer) => firstOffer.deliveryRank - secondOffer.deliveryRank)
  }

  return sortedOffers.sort((firstOffer, secondOffer) => firstOffer.totalValue - secondOffer.totalValue)
}

function ComparisonLoadingState() {
  return (
    <section className="ComparisonPage__state" aria-label="Karşılaştırma yükleniyor">
      <Skeleton variant="card" />
      <div className="ComparisonPage__stateCards">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </section>
  )
}

function ComparisonErrorState() {
  return <StatusMessage type="error">Karşılaştırma verileri şu anda alınamadı. Lütfen tekrar dene.</StatusMessage>
}

function ComparisonEmptyState({ onStartComparison }) {
  return (
    <section className="ComparisonPage__empty" aria-labelledby="comparison-empty-title">
      <PackageSearch aria-hidden="true" />
      <div>
        <h2 id="comparison-empty-title">Henüz karşılaştırılacak teklif bulunamadı.</h2>
        <p>Başka bir ürün bağlantısı ekleyerek teklifleri yeniden inceleyebilirsin.</p>
      </div>
      <Button icon={<PackagePlus aria-hidden="true" />} onClick={onStartComparison}>Yeni Karşılaştırma</Button>
    </section>
  )
}

export function ComparisonPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('total')
  const [isStoreNoticeVisible, setIsStoreNoticeVisible] = useState(false)
  const productContext = readProductContext(searchParams)
  const productName = productContext.productName || comparisonProduct.name
  const offers = useMemo(() => getContextualOffers(productContext.price), [productContext.price])
  const visibleOffers = sortOffers(getFilteredOffers(offers, activeFilter), activeSort)
  const bestOffer = offers[0]
  const productPriceHistory = productContext.price
    ? {
        current: productContext.price,
        lowest: productContext.price,
        trend: productContext.previousPrice ? `Demo fiyat değişimi: ${productContext.previousPrice} → ${productContext.price}` : 'Demo fiyat trendi gösteriliyor.',
      }
    : comparisonPriceHistory

  useEffect(() => {
    const sectionId = window.location.hash.slice(1)

    if (!sectionId) {
      return
    }

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  function scrollToSearch() {
    document.getElementById('comparison-product-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function startTracking() {
    navigate(buildProductContextUrl(APP_ROUTES.TRACKING, {
      previousPrice: productContext.previousPrice,
      price: bestOffer.total,
      priceChange: productContext.priceChange,
      productName,
      productUrl: productContext.productUrl,
      store: bestOffer.merchant,
    }))
  }

  return (
    <DashboardLayout>
      <main className="ComparisonPage">
        <PageContainer width="wide">
          <header className="ComparisonPage__header">
            <div>
              <h1>Karşılaştır</h1>
              <p>Bir ürünü farklı mağazalardaki teklifler arasında karşılaştır ve sana en uygun seçeneği bul.</p>
            </div>
            <Button icon={<PackageSearch aria-hidden="true" />} onClick={scrollToSearch}>Yeni Karşılaştırma</Button>
          </header>

          {productContext.hasInvalidProductUrl ? (
            <StatusMessage type="error">
              Ürün bağlantısı geçerli değil. Karşılaştırma yapmak için yeni bir bağlantı ekle.
            </StatusMessage>
          ) : productContext.productUrl ? (
            <StatusMessage type="info">
              Ürün bağlantısı alındı. Gerçek ürün analizi henüz bağlı olmadığı için demo karşılaştırma verisi gösteriliyor.
            </StatusMessage>
          ) : !productContext.productUrl ? (
            <StatusMessage type="info">
              Ürün bağlantısı eklenmediği için örnek bir karşılaştırma gösteriliyor.
            </StatusMessage>
          ) : null}

          {isStoreNoticeVisible ? (
            <StatusMessage type="info">
              Mağaza bağlantısı demo aşamasında. Gerçek mağaza yönlendirmesi henüz kullanıma açık değil.
            </StatusMessage>
          ) : null}

          <section className="ComparisonPage__search" id="comparison-product-form" aria-labelledby="comparison-search-title">
            <div>
              <h2 id="comparison-search-title">Ürün bağlantısı ekle</h2>
              <p>ShopIQ, ürünü ve teklifleri değerlendirmek için bağlantıyı analiz eder.</p>
            </div>
            <ProductLinkForm />
          </section>

          {comparisonState === 'loading' && <ComparisonLoadingState />}
          {comparisonState === 'error' && <ComparisonErrorState />}
          {comparisonState === 'empty' && <ComparisonEmptyState onStartComparison={scrollToSearch} />}

          {comparisonState === 'ready' && (
            <>
              <section className="ComparisonPage__summary" aria-labelledby="product-summary-title">
                <div className="ComparisonPage__productVisual">
                  <PackageSearch aria-hidden="true" />
                </div>
                <div className="ComparisonPage__summaryInfo">
                  <p>{productContext.productName ? 'Demo ürün analizi' : comparisonProduct.brand}</p>
                  <h2 id="product-summary-title">{productName}</h2>
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
                  <p>Toplam maliyet ve mağaza güvenine göre en avantajlı seçenek. Ücretsiz kargo ve stok bilgisi değerlendirmeye dahildir.</p>
                  <Button icon={<PackagePlus aria-hidden="true" />} onClick={startTracking} variant="secondary">Fiyatı Takip Et</Button>
                </div>
                <strong className="ComparisonPage__bestOfferPrice">{bestOffer.total}</strong>
              </section>

              <section className="ComparisonPage__history" id="price-history" aria-labelledby="price-history-title">
                <div>
                  <h2 id="price-history-title">Fiyat geçmişi</h2>
                  <p>{productPriceHistory.trend}</p>
                </div>
                <div className="ComparisonPage__chart" role="img" aria-label={`${productName} için demo fiyat geçmişi gösteriliyor.`}>
                  <div className="ComparisonPage__chartValues">
                    <span>En düşük fiyat</span>
                    <strong>{productPriceHistory.lowest}</strong>
                  </div>
                  <svg viewBox="0 0 100 40" aria-hidden="true" focusable="false" preserveAspectRatio="none">
                    <polyline points="0,7 20,10 40,13 60,24 80,22 100,34" />
                  </svg>
                  <div className="ComparisonPage__chartMeta">
                    <span>4 hafta önce</span>
                    <strong>Bugün · {productPriceHistory.current}</strong>
                  </div>
                </div>
              </section>

              <section className="ComparisonPage__offers" aria-labelledby="offers-title">
                <div className="ComparisonPage__sectionHeading">
                  <div>
                    <h2 id="offers-title">Teklifler</h2>
                    <p>Fiyat, teslimat ve satıcı bilgilerini birlikte değerlendir.</p>
                  </div>
                  <ShieldCheck aria-hidden="true" />
                </div>
                <div className="ComparisonPage__controls">
                  <div className="ComparisonPage__filters" role="group" aria-label="Teklifleri filtrele">
                    {comparisonFilters.map(({ id, label }) => (
                      <button key={id} type="button" aria-pressed={activeFilter === id} onClick={() => setActiveFilter(id)}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <label className="ComparisonPage__sort">
                    <span>Sırala</span>
                    <select aria-label="Teklifleri sırala" value={activeSort} onChange={(event) => setActiveSort(event.target.value)}>
                      {comparisonSortOptions.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
                    </select>
                  </label>
                </div>

                {visibleOffers.length === 0 ? (
                  <ComparisonEmptyState onStartComparison={scrollToSearch} />
                ) : (
                  <div className="ComparisonPage__offersGrid">
                    {visibleOffers.map((offer) => (
                      <article className="ComparisonPage__offer" key={offer.merchant}>
                        <div className="ComparisonPage__offerHeader">
                          <div className="ComparisonPage__merchantAvatar" aria-hidden="true">{getMerchantInitial(offer.merchant)}</div>
                          <div>
                            <h3>{offer.merchant}</h3>
                            <p className="ComparisonPage__offerMeta">Satıcı: {offer.seller}</p>
                          </div>
                        </div>
                        <span className="ComparisonPage__badge">{offer.label}</span>
                        <div className="ComparisonPage__costBreakdown" aria-label={`Ürün fiyatı ${offer.price}, kargo ${offer.delivery}, toplam maliyet ${offer.total}`}>
                          <div><span>Ürün fiyatı</span><strong>{offer.price}</strong></div>
                          <span aria-hidden="true">+</span>
                          <div><span>Kargo</span><strong>{offer.delivery}</strong></div>
                          <span aria-hidden="true">=</span>
                        </div>
                        <div className="ComparisonPage__total">
                          <div><p>Toplam maliyet</p><strong className="ComparisonPage__price">{offer.total}</strong></div>
                          <span className="ComparisonPage__offerMeta">Stokta</span>
                        </div>
                        <footer className="ComparisonPage__offerFooter">
                          <span className="ComparisonPage__trust"><ShieldCheck aria-hidden="true" />{offer.trust} · {offer.updatedAt}</span>
                          <Button
                            icon={<ExternalLink aria-hidden="true" />}
                            onClick={() => setIsStoreNoticeVisible(true)}
                            variant="secondary"
                          >
                            Mağaza Bağlantısı
                          </Button>
                        </footer>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
