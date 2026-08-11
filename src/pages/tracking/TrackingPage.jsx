import {
  BellRing,
  ChevronDown,
  CircleCheck,
  PackagePlus,
  TrendingDown,
} from 'lucide-react'
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

const filters = ['Tümü', 'Fiyatı Düşenler', 'Alarm Aktif', 'Fiyatı Artanlar']

const products = [
  ['Dyson Airwrap Complete', 'Teknosa', '₺20.499', '₺24.199', '↓ %15'],
  ['Apple AirPods Pro', 'MediaMarkt', '₺8.299', '₺9.199', '↓ %10'],
  ['Nike Air Max', 'Boyner', '₺4.249', '₺4.999', '↓ %15'],
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

function TrackingEmptyState() {
  return (
    <section className="TrackingPage__empty" aria-labelledby="tracking-empty-title">
      <PackagePlus aria-hidden="true" />
      <div>
        <h2 id="tracking-empty-title">Henüz takip ettiğin bir ürün yok.</h2>
        <p>Bir ürün linki ekleyerek fiyat değişimlerini izlemeye başla.</p>
      </div>
      <Button icon={<PackagePlus aria-hidden="true" />}>İlk Ürününü Takip Et</Button>
    </section>
  )
}

export function TrackingPage() {
  return (
    <DashboardLayout>
      <main className="TrackingPage">
        <PageContainer width="wide">
          <header className="TrackingPage__header">
            <div>
              <h1>Ürün Takibi</h1>
              <p>Takip ettiğin ürünlerin fiyat değişimlerini tek yerden izle.</p>
            </div>
            <Button icon={<PackagePlus aria-hidden="true" />}>Yeni Ürün Takibi</Button>
          </header>

          {trackingState === 'loading' && <TrackingLoadingState />}
          {trackingState === 'error' && <TrackingErrorState />}
          {trackingState === 'empty' && <TrackingEmptyState />}

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
                    {filters.map((filter, index) => (
                      <button key={filter} type="button" aria-pressed={index === 0}>
                        {filter}
                      </button>
                    ))}
                  </div>
                  <button className="TrackingPage__sort" type="button" aria-label="Sıralama: Son Güncellenen">
                    Son Güncellenen
                    <ChevronDown aria-hidden="true" />
                  </button>
                </div>

                <div className="TrackingPage__products">
                  {products.map(([name, store, price, previousPrice, change]) => (
                    <article key={name}>
                      <div className="TrackingPage__visual">
                        <TrendingDown aria-hidden="true" />
                      </div>
                      <div className="TrackingPage__product">
                        <span>{store}</span>
                        <h3>{name}</h3>
                        <p>Son güncelleme: bugün</p>
                      </div>
                      <div className="TrackingPage__price">
                        <strong>{price}</strong>
                        <span>{previousPrice}</span>
                        <b>{change}</b>
                      </div>
                      <div className="TrackingPage__status">Takip aktif · Alarm açık</div>
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
