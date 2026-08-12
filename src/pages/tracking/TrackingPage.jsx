import {
  BellRing,
  CircleCheck,
  PackagePlus,
  TrendingDown,
} from 'lucide-react'
import { useMemo, useNavigate, useSearchParams, useState } from 'react'
import { APP_ROUTES } from '../../shared/config/index.js'
import { buildProductContextUrl, readProductContext } from '../../shared/lib/productContext.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import { Button, PageContainer, Skeleton, StatusMessage } from '../../shared/ui/index.js'
import './TrackingPage.css'

const trackingState = 'ready'

const stats = [
  ['Takip edilen ürünler', '12'],
  ['Fiyatı düşenler', '3'],
  ['Aktif fiyat alarmları', '8'],
  ['Bugünkü fırsatlar', '2'],
]

const filters = [
  ['all', 'Tümü'],
  ['price-drop', 'Fiyatı Düşenler'],
  ['alarm-active', 'Alarm Aktif'],
  ['price-rise', 'Fiyatı Artanlar'],
]

const sortOptions = [
  ['updated', 'Son Güncellenen'],
  ['price', 'Fiyat'],
  ['change', 'İndirim Oranı'],
]

const products = [
  {
    alarmActive: true,
    change: '↓ %15',
    changeValue: -15,
    name: 'Dyson Airwrap Complete',
    previousPrice: '₺24.199',
    price: '₺20.499',
    priceValue: 20499,
    store: 'Teknosa',
    updatedRank: 1,
  },
  {
    alarmActive: true,
    change: '↓ %10',
    changeValue: -10,
    name: 'Apple AirPods Pro',
    previousPrice: '₺9.199',
    price: '₺8.299',
    priceValue: 8299,
    store: 'MediaMarkt',
    updatedRank: 2,
  },
  {
    alarmActive: false,
    change: '↑ %6',
    changeValue: 6,
    name: 'Nike Air Max',
    previousPrice: '₺3.999',
    price: '₺4.249',
    priceValue: 4249,
    store: 'Boyner',
    updatedRank: 3,
  },
]

const notifications = [
  ['price-drop', 'Dyson fiyatı %15 düştü.'],
  ['target-reached', 'JBL hedef fiyatına ulaştı.'],
  ['campaign', 'Yeni kampanya tespit edildi.'],
]

function TrackingLoadingState() {
  return (
    <section className="TrackingPage__state" aria-label="Yükleniyor">
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </section>
  )
}

function TrackingErrorState() {
  return (
    <StatusMessage type="error">
      Takip verileri şu anda alınamadı. Lütfen kısa süre sonra tekrar dene.
    </StatusMessage>
  )
}

function TrackingEmptyState({ onStartTracking }) {
  return (
    <section className="TrackingPage__empty" aria-labelledby="tracking-empty-title">
      <PackagePlus aria-hidden="true" />
      <div>
        <h2 id="tracking-empty-title">Henüz takip ettiğin bir ürün yok.</h2>
        <p>Bir ürün linki ekleyerek fiyat değişimlerini izlemeye başla.</p>
      </div>
      <Button icon={<PackagePlus aria-hidden="true" />} onClick={onStartTracking}>İlk Ürününü Takip Et</Button>
    </section>
  )
}

export function TrackingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('updated')
  const productContext = readProductContext(searchParams)
  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter((product) => {
      if (activeFilter === 'price-drop') return product.changeValue < 0
      if (activeFilter === 'alarm-active') return product.alarmActive
      if (activeFilter === 'price-rise') return product.changeValue > 0

      return true
    })

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
      if (activeSort === 'price') return firstProduct.priceValue - secondProduct.priceValue
      if (activeSort === 'change') return firstProduct.changeValue - secondProduct.changeValue

      return firstProduct.updatedRank - secondProduct.updatedRank
    })
  }, [activeFilter, activeSort])

  function askAssistant(product) {
    navigate(buildProductContextUrl(APP_ROUTES.ASSISTANT, {
      previousPrice: product.previousPrice,
      price: product.price,
      priceChange: product.change,
      productName: product.name,
      productUrl: productContext.productUrl,
      store: product.store,
    }))
  }

  function startProductTracking() {
    navigate(APP_ROUTES.COMPARISON)
  }

  return (
    <DashboardLayout>
      <main className="TrackingPage">
        <PageContainer width="wide">
          <header className="TrackingPage__header">
            <div>
              <h1>Ürün Takibi</h1>
              <p>Takip ettiğin ürünlerin fiyat değişimlerini tek yerden izle.</p>
            </div>
            <Button icon={<PackagePlus aria-hidden="true" />} onClick={startProductTracking}>Yeni Ürün Takibi</Button>
          </header>

          {trackingState === 'loading' && <TrackingLoadingState />}
          {trackingState === 'error' && <TrackingErrorState />}
          {trackingState === 'empty' && <TrackingEmptyState onStartTracking={startProductTracking} />}

          {trackingState === 'ready' && (
            <>
              <section className="TrackingPage__stats" aria-label="Takip özeti">
                {stats.map(([label, value]) => (
                  <article key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
              </section>

              <section aria-labelledby="tracked-products-title">
                <div className="TrackingPage__sectionHeading">
                  <div>
                    <h2 id="tracked-products-title">Takip edilen ürünler</h2>
                    <p>En önemli fiyat değişimlerini hızlıca incele.</p>
                  </div>
                  <BellRing aria-hidden="true" />
                </div>

                <div className="TrackingPage__controls" aria-label="Ürün takibi filtreleri">
                  <div className="TrackingPage__filters" role="group" aria-label="Filtrele">
                    {filters.map(([filterId, label]) => (
                      <button key={filterId} type="button" aria-pressed={activeFilter === filterId} onClick={() => setActiveFilter(filterId)}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <label className="TrackingPage__sort">
                    <span>Sırala</span>
                    <select aria-label="Ürünleri sırala" value={activeSort} onChange={(event) => setActiveSort(event.target.value)}>
                      {sortOptions.map(([sortId, label]) => <option key={sortId} value={sortId}>{label}</option>)}
                    </select>
                  </label>
                </div>

                <div className="TrackingPage__products">
                  {visibleProducts.map((product) => (
                    <article key={product.name}>
                      <div className="TrackingPage__visual">
                        <TrendingDown aria-hidden="true" />
                      </div>
                      <div className="TrackingPage__product">
                        <span>{product.store}</span>
                        <h3>{product.name}</h3>
                        <p>Son güncelleme: bugün</p>
                      </div>
                      <div className="TrackingPage__price">
                        <strong>{product.price}</strong>
                        <span>{product.previousPrice}</span>
                        <b>{product.change}</b>
                      </div>
                      <div className="TrackingPage__status">
                        <span>{product.alarmActive ? 'Takip aktif · Alarm açık' : 'Takip aktif · Alarm kapalı'}</span>
                        <Button onClick={() => askAssistant(product)} variant="ghost">AI’a Sor</Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="TrackingPage__details" aria-label="Fiyat geçmişi ve bildirimler">
                <article className="TrackingPage__history">
                  <div>
                    <h2>Fiyat geçmişi</h2>
                    <p>Dyson Airwrap · En düşük fiyat ₺20.499</p>
                  </div>
                  <div className="TrackingPage__chart" role="img" aria-label="Dyson Airwrap fiyatı son dönemde 24 bin 199 liradan 20 bin 499 liraya düştü.">
                    <div className="TrackingPage__chartValue">₺24.199</div>
                    <svg viewBox="0 0 100 40" aria-hidden="true" focusable="false" preserveAspectRatio="none">
                      <polyline points="0,7 20,11 40,10 60,26 80,24 100,34" />
                    </svg>
                    <div className="TrackingPage__chartMeta">
                      <span>4 hafta önce</span>
                      <strong>Bugün · ₺20.499</strong>
                    </div>
                  </div>
                </article>

                <article className="TrackingPage__notificationCard">
                  <div>
                    <h2>Son Bildirimler</h2>
                    <p>Takip listendeki son gelişmeler.</p>
                  </div>
                  <ul className="TrackingPage__notifications">
                    {notifications.map(([type, message]) => (
                      <li key={type}>
                        {type === 'price-drop' ? <TrendingDown aria-hidden="true" /> : null}
                        {type === 'target-reached' ? <CircleCheck aria-hidden="true" /> : null}
                        {type === 'campaign' ? <BellRing aria-hidden="true" /> : null}
                        <span>{message}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </section>
            </>
          )}
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
