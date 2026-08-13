import { Bell, Bot, ChartNoAxesCombined, Heart, Plus, Sparkles, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/config/index.js'
import { Button, PageContainer } from '../../shared/ui/index.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import './DashboardPage.css'

const stats = [
  ['Takip edilen ürünler', '12', Heart],
  ['Fiyatı düşenler', '3', TrendingDown],
  ['Aktif fırsatlar', '8', Bell],
  ['Karşılaştırmalar', '24', ChartNoAxesCombined],
]

const quickActions = [
  [Plus, 'Yeni Ürün Takibi', APP_ROUTES.COMPARISON],
  [ChartNoAxesCombined, 'Karşılaştırmayı Aç', APP_ROUTES.COMPARISON],
  [Bot, 'AI’a Sor', APP_ROUTES.ASSISTANT],
]

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <main className="DashboardHome">
        <PageContainer width="wide">
          <section className="DashboardHome__welcome">
            <div>
              <p>Bugünkü özet</p>
              <h1>Takiplerinde yeni fırsatlar var.</h1>
              <span>Dyson Airwrap ve Nike Air Max için fiyat hareketleri tespit edildi.</span>
            </div>
            <Button icon={<Plus aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.COMPARISON)}>Yeni Ürün Takibi</Button>
          </section>
          <section className="DashboardHome__actions" aria-label="Hızlı işlemler">
            {quickActions.map(([Icon, label, route]) => (
              <button key={label} type="button" onClick={route ? () => navigate(route) : undefined}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </section>
          <section className="DashboardHome__stats">
            {stats.map(([label, value, Icon]) => (
              <article key={label}>
                <Icon aria-hidden="true" />
                <p>{label}</p>
                <strong>{value}</strong>
              </article>
            ))}
          </section>
          <section className="DashboardHome__grid">
            <article className="DashboardHome__panel">
              <h2>Son aktiviteler</h2>
              <ul><li>Dyson Airwrap fiyatı düştü</li><li>Nike Air Max için yeni fiyat hareketi var</li><li>Takip listende yeni fırsat tespit edildi</li></ul>
            </article>
            <article className="DashboardHome__panel DashboardHome__panel--insight">
              <Sparkles aria-hidden="true" />
              <h2>Akıllı içgörü</h2>
              <p>Dyson Airwrap için toplam maliyeti ve mağaza güvenini birlikte değerlendirmek faydalı görünüyor.</p>
            </article>
            <article className="DashboardHome__panel">
              <h2>Takip listesi</h2>
              <p>Dyson Airwrap, Apple AirPods Pro ve Nike Air Max için son fiyat hareketlerini incele.</p>
            </article>
          </section>
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
