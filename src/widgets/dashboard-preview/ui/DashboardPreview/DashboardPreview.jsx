import { BellRing, ChartNoAxesCombined, Sparkles, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import { Button, PageContainer } from '../../../../shared/ui/index.js'
import './DashboardPreview.css'

const previewItems = [
  ['Takip edilen ürünler', '12', BellRing],
  ['Fiyatı düşenler', '↓ %15', TrendingDown],
  ['Aktif fırsatlar', '3 yeni fırsat', ChartNoAxesCombined],
  ['AI içgörüsü', 'Kararı incele', Sparkles],
]

export function DashboardPreview() {
  const navigate = useNavigate()

  return (
    <section aria-labelledby="dashboard-preview-title" className="DashboardPreview">
      <PageContainer>
        <div className="DashboardPreview__content">
          <div className="DashboardPreview__copy">
            <span>ShopIQ Dashboard</span>
            <h2 id="dashboard-preview-title">Alışveriş kararını tek yerden yönet.</h2>
            <p>Takip ettiğin ürünleri, fiyatı düşenleri, aktif fırsatları, son hareketleri ve karar desteğini tek bir Dashboard üzerinden gör.</p>
            <Button onClick={() => navigate(APP_ROUTES.DASHBOARD)}>Dashboard’u Keşfet</Button>
          </div>
          <div className="DashboardPreview__panel" aria-label="Dashboard demo önizlemesi">
            <div className="DashboardPreview__panelHeader">
              <strong>Bugünkü Dashboard özeti</strong>
              <span>Canlı ürün deneyimi önizlemesi</span>
            </div>
            <div className="DashboardPreview__grid">
              {previewItems.map(([label, value, Icon]) => (
                <article key={label}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
