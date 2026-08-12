import { BellRing, ChartNoAxesCombined, Sparkles, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import { Button, PageContainer } from '../../../../shared/ui/index.js'
import './DashboardPreview.css'

const previewItems = [
  ['Takip edilen ürün', '12', BellRing],
  ['Fiyat değişimi', '↓ %15', TrendingDown],
  ['En iyi teklif', '₺20.499', ChartNoAxesCombined],
  ['AI önerisi', 'Şimdi incele', Sparkles],
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
            <p>Takip ettiğin ürünleri, fiyat hareketlerini, karşılaştırmaları ve karar desteğini aynı uygulama deneyiminde bir araya getir.</p>
            <Button onClick={() => navigate(APP_ROUTES.ONBOARDING)}>Dashboard’u Keşfet</Button>
          </div>
          <div className="DashboardPreview__panel" aria-label="Dashboard demo önizlemesi">
            <div className="DashboardPreview__panelHeader">
              <strong>Bugünkü özet</strong>
              <span>Demo görünüm</span>
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
