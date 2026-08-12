import { Bell, Bot, ChartNoAxesCombined, Heart, Plus, Sparkles, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/config/index.js'
import { Button, PageContainer } from '../../shared/ui/index.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import './DashboardPage.css'

const stats = [
  ['Takip edilen ürün', '12', Heart],
  ['Aktif fiyat alarmı', '8', Bell],
  ['Toplam karşılaştırma', '24', ChartNoAxesCombined],
  ['Bugünkü fırsatlar', '3', TrendingDown],
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
              <span>2 ürün indirime girdi, 3 fiyat değişikliği tespit edildi.</span>
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
              <ul><li>iPhone fiyatı düştü</li><li>Nike ürününde fiyat değişti</li><li>Yeni kampanya tespit edildi</li></ul>
            </article>
            <article className="DashboardHome__panel DashboardHome__panel--insight">
              <Sparkles aria-hidden="true" />
              <h2>Akıllı içgörü</h2>
              <p>Takip ettiğin teklifler arasında bugün öne çıkan fırsatlar var.</p>
            </article>
            <article className="DashboardHome__panel">
              <h2>Takip listesi</h2>
              <p>Son güncellenen ürünlerin fiyat ve mağaza değişimlerini incele.</p>
            </article>
          </section>
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
